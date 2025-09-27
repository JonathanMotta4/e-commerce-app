import fs from 'node:fs';
import csv from 'csv-parser';
import Stripe from 'stripe';
import 'dotenv/config';
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
});
const CSV_FILE_PATH = './products.csv';
const CONCURRENCY = 5; // Number of products processed in parallel

interface ProductRow {
    name: string;
    description: string;
    price: string; // CSV values are strings
    currency?: string;
    sku?: string;
    image?: string;
}

function parseCSV(filePath: string): Promise<ProductRow[]> {
    return new Promise((resolve, reject) => {
        const products: ProductRow[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => products.push(row))
            .on('end', () => resolve(products))
            .on('error', (err) => reject(err));
    });
}

async function processProduct(product: ProductRow) {
    const name = product.name?.trim() || 'Unnamed Product';
    const description = product.description?.trim() || '';
    const image = product.image?.trim();
    const sku = product.sku?.trim();
    const currency = (product.currency?.trim() || 'brl').toLowerCase();

    const priceValue = parseFloat(product.price);
    if (isNaN(priceValue)) {
        console.error(`❌ Invalid price for "${name}": "${product.price}"`);
        return;
    }

    try {
        const stripeProduct = await stripeClient.products.create({
            name,
            description,
            images: image ? [image] : [],
            metadata: sku ? { sku } : {},
        });

        await stripeClient.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(priceValue * 100),
            currency,
        });

        console.log(`✅ Imported: ${name}`);
    } catch (error: unknown) {
        console.error(`❌ Failed to import "${name}":`, (error as Error).message);
    }
}

async function importProducts() {
    try {
        const products = await parseCSV(CSV_FILE_PATH);
        console.log(`Found ${products.length} products in CSV.`);

        // Process in batches to avoid overloading Stripe
        for (let i = 0; i < products.length; i += CONCURRENCY) {
            const batch = products.slice(i, i + CONCURRENCY);
            await Promise.all(batch.map(processProduct));
        }

        console.log('All products processed.');
    } catch (err) {
        console.error('Error reading CSV:', err);
    }
}

importProducts();


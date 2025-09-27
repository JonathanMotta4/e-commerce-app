
import fs from 'node:fs';
import path from 'node:path';

const CSV_FILE_PATH = path.resolve(process.cwd(), 'products.csv');
const TOTAL_PRODUCTS = 300;

// Utility functions
function getRandomPrice(min = 20, max = 300) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function getSKU(index: number) {
    return `SKU${index.toString().padStart(4, '0')}`;
}

function getImageURL(index: number) {
    return `https://picsum.photos/seed/${index}/400/400`;
}

// Generate products
const products = Array.from({ length: TOTAL_PRODUCTS }, (_, i) => {
    const index = i + 1;
    return {
        name: `Clothing Item ${index}`,
        description: `High-quality clothing item number ${index}`,
        price: getRandomPrice(),
        currency: 'BRL',
        sku: getSKU(index),
        image: getImageURL(index),
    };
});

// Convert to CSV
const headers = ['name', 'description', 'price', 'currency', 'sku', 'image'];
const csvData = [
    headers.join(','),
    ...products.map(p => headers.map(h => `"${p[h as keyof typeof p]}"`).join(',')),
].join('\n');

// Write CSV file
fs.writeFileSync(CSV_FILE_PATH, csvData);
console.log(`✅ Generated ${TOTAL_PRODUCTS} products at: ${CSV_FILE_PATH}`);

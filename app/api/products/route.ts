import { stripeClient } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const [products, prices] = await Promise.all([
			stripeClient.products.list({ limit: 100 }),
			stripeClient.prices.list({ limit: 100 })
		])
		const productsWithPrices = products.data.map((product) => ({
			id: product.id,
			name: product.name,
			image: product.images?.[0] ?? null,
			description: product.description ?? '',
			prices: prices.data
				.filter((price) => price.product === product.id)
				.map((price) => ({
					id: price.id,
					unit_amount: price.unit_amount,
					currency: price.currency,
					recurring: price.recurring
				}))
		}))

		return NextResponse.json(productsWithPrices)
	} catch (error) {
		console.error(`Stripe error: ${error}`)
		return NextResponse.json(
			{
				error: 'Failed to fetch products'
			},
			{ status: 500 }
		)
	}
}

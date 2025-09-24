import { stripeClient } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { priceId } = await req.json()
		if (!priceId) {
			return NextResponse.json({ error: 'Missing price ID' }, { status: 400 })
		}
		const session = await stripeClient.checkout.sessions.create({
			mode: 'payment',
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}/products`
		})
		return NextResponse.json({ url: session.url })
	} catch (error) {
		console.error(`Checkout session error:${error}`)
		return NextResponse.json(
			{ error: 'Failed to create session' },
			{ status: 500 }
		)
	}
}

import { type NextRequest, NextResponse } from 'next/server'
import { stripeClient } from '@/lib/stripe'

type CartItem = {
	priceId: string
	quantity: number
}
export async function POST(req: NextRequest) {
	try {
		const { cart } = await req.json()
		if (!cart || cart.length === 0)
			return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

		const line_items = (cart as CartItem[]).map((item) => ({
			price: item.priceId,
			quantity: item.quantity
		}))

		const session = await stripeClient.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items,
			mode: 'payment',
			success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}/`
		})
		return NextResponse.json({ url: session.url })
	} catch (error: any) {
		console.error('Stripe checkout error:', error)
		return NextResponse.json(
			{ error: 'Failed to create checkout session' },
			{ status: 500 }
		)
	}
}

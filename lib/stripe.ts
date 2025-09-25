import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}
export const stripeClient = new Stripe(
	process.env.STRIPE_SECRET_KEY as string,
	{
		apiVersion: '2025-08-27.basil',
    typescript:true
	}
)

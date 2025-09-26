'use client'

import { Clock, DollarSign, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { AspectRatio } from './ui/aspect-ratio'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Price {
	id: string
	unit_amount: number | null
	currency: string
	recurring: { interval: string } | null
}

interface Product {
	id: string
	name: string
	image: string | null
	description: string
	prices: Price[]
}

export function ProductCard({ product }: { product: Product }) {
	const [loading, setLoading] = useState(false)
	const price = product.prices[0]
	const { addToCart } = useCart()

	const formattedPrice = price?.unit_amount
		? new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: price.currency
			}).format(price.unit_amount / 100)
		: 'Grátis'

	const handleAddToCart = () => {
		if (!price || price.unit_amount === null) return

		const cartItem = {
			priceId: price.id,
			name: product.name,
			unitAmount: price.unit_amount,
			currency: price.currency,
			quantity: 1
		}

		setLoading(true)
		addToCart(cartItem)
		setTimeout(() => setLoading(false), 500) // demo delay
	}

	return (
		<Card className='transition-transform hover:scale-[1.02] hover:shadow-lg'>
			<CardHeader className='pb-2'>
				<CardTitle className='text-lg'>{product.name}</CardTitle>
			</CardHeader>

			<CardContent className='flex flex-col gap-3'>
				<AspectRatio ratio={4 / 3}>
					{product.image ? (
						<Image
							src={product.image}
							alt={product.name}
							fill
							className='bg-cover rounded-md'
						/>
					) : (
						<div className='bg-gray-100 rounded-md flex items-center justify-center text-gray-400'>
							Sem imagem
						</div>
					)}
				</AspectRatio>

				<p className='text-sm text-muted-foreground line-clamp-3'>
					{product.description}
				</p>

				<div className='flex items-center justify-between mt-2'>
					<div className='flex items-center gap-1 text-primary font-semibold'>
						{formattedPrice}
					</div>
					{price?.recurring && (
						<Badge variant='outline' className='flex items-center gap-1'>
							<Clock className='size-3.5' />
							{price.recurring.interval}
						</Badge>
					)}
				</div>

				<Button
					onClick={handleAddToCart}
					disabled={loading || !price}
					className='w-full mt-3 flex items-center justify-center gap-2'
				>
					<ShoppingCart className='size-4' />
					{loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
				</Button>
			</CardContent>
		</Card>
	)
}

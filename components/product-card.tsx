'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useCart } from '@/context/cart-context'

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
  const router = useRouter()
  const price = product.prices[0]
  const formattedPrice = price.unit_amount
    ? new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: price.currency
    }).format(price.unit_amount / 100)
    : 'Free'

  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (!price) return
    addToCart({
      productId: product.id,
      name: product.name,
      priceId: price.id,
      quantity: 1,
      unitAmount: price.unit_amount || 0
    })
  }
 return (
  <Card className='transition duration-200 hover:shadow-lg'>
    <CardHeader>
      <CardTitle>{product.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className='mb-3'>
        {product.image ? (
          <AspectRatio ratio={4 / 3}>Buy Now
            <Image
              src={product.image}
              alt={product.name}
              layout='fill'
              objectFit='cover'
              className='rounded-md'
            />
          </AspectRatio>
        ) : (
          <div className='bg-gray-100 rounded-md h-[200px]' />
        )}
      </div>
      <p className='mb-2 text-sm text-muted-foreground'>
        {product.description}
      </p>
      <p className='font-semibold text-primary'>{formattedPrice}</p>
      {price && (
        <Button onClick={handleAddToCart} disabled={loading} className='w-full'>
          {loading ? 'Redirecting...' : 'Add to Cart'}
        </Button>
      )}
    </CardContent>
  </Card>
)
}

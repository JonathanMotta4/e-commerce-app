import { ProductCard } from '@/components/product-card'

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

export default async function HomePage() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
		cache: 'no-store'
	})
	const products: Product[] = await res.json()

	return (
		<main className="p-8 max-w-7xl mx-auto">
			<h1 className="mb-8 text-4xl font-extrabold text-center">Our Products</h1>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</main>
	)
}

import Link from 'next/link'

export default function Home() {
	return (
		<main className='flex gap-2'>
			<Link href={'/login'}>Login</Link>
			<Link href={'/products'}>Products</Link>
		</main>
	)
}

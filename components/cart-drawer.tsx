'use client'

import { CreditCard, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { useCart } from '@/context/cart-context'

export function CartDrawer() {
	const { cart, removeFromCart, clearCart } = useCart()

	const total = cart.reduce(
		(sum, item) => sum + item.unitAmount * item.quantity,
		0
	)

	const handleCheckout = async () => {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ cart })
		})
		const data = await res.json()
		if (data.url) {
			clearCart()
			window.location.href = data.url
		}
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' size='icon'>
					<ShoppingCart className='h-5 w-5' />
				</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Seu Carrinho</SheetTitle>
				</SheetHeader>

				<div className='mt-6 space-y-4'>
					{cart.length === 0 ? (
						<p className='px-4 text-muted-foreground'>Carrinho vazio.</p>
					) : (
						cart.map((item) => (
							<div
								key={item.priceId}
								className='flex justify-between items-center border-b px-4 pb-2'
							>
								<div>
									<p className='font-medium'>{item.name}</p>
									<p className='text-sm text-muted-foreground'>
										Qty: {item.quantity}
									</p>
								</div>
								<div className='text-right flex items-center gap-2'>
									<p className='text-sm'>
										{new Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: item.currency || 'BRL'
										}).format((item.unitAmount * item.quantity) / 100)}
									</p>
									<Button
										size='icon'
										variant='ghost'
										onClick={() => removeFromCart(item.priceId)}
									>
										<Trash2 className='h-4 w-4 text-destructive' />
									</Button>
								</div>
							</div>
						))
					)}
				</div>

				{cart.length > 0 && (
					<SheetFooter className='mt-6 flex flex-col gap-3'>
						<div className='flex justify-between font-semibold'>
							<span>Total</span>
							<span>
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: cart[0]?.currency || 'BRL'
								}).format(total / 100)}
							</span>
						</div>
						<Button
							onClick={handleCheckout} variant={'outline'}
							className='flex items-center justify-center gap-2'
						>
							<CreditCard size={16} />
							Checkout
						</Button>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	)
}

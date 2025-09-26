'use client'

import { createContext, useContext, useState } from 'react'
import { toast } from 'sonner'

type CartItem = {
	priceId: string
	name: string
	unitAmount: number
	currency: string
	quantity: number
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (item: CartItem) => void
	removeFromCart: (priceId: string) => void
	clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([])

	const addToCart = (item: CartItem) => {
		setCart((prev) => {
			const existing = prev.find((i) => i.priceId === item.priceId)
			if (existing) {
				toast.info(
					`${item.name} atualizado no carrinho (qtd: ${existing.quantity + item.quantity})`
				)
				return prev.map((i) =>
					i.priceId === item.priceId
						? { ...i, quantity: i.quantity + item.quantity }
						: i
				)
			}
			toast.success(`${item.name} adicionado ao carrinho!`)
			return [...prev, item]
		})
	}

	const removeFromCart = (priceId: string) => {
		setCart((prev) => prev.filter((item) => item.priceId !== priceId))
		toast.error('Produto removido do carrinho')
	}

	const clearCart = () => {
		setCart([])
		toast.warning('Carrinho limpo')
	}

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}
	return context
}

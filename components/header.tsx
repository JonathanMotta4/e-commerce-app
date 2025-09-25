import Link from 'next/link'
import { ModeSwitcher } from './mode-switcher'
import { CartDrawer } from './cart-drawer'

export function Header() {
	return (
		<header className='flex justify-end items-center p-2 w-full h-10 gap-4'>
			<Link href={'/login'}>Login</Link>
			<Link href={'/register'}>Sign Up</Link>
			<ModeSwitcher />
      <CartDrawer/>
		</header>
	)
}

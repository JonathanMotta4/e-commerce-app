import Link from 'next/link'
import { ModeSwitcher } from './mode-switcher'
import { CartDrawer } from './cart-drawer'
import { SignOutButton } from './signout-button'

export function Header() {
	return (
		<header className='flex justify-end items-center mb-4 p-2 w-full h-10 gap-4'>
			<Link href={'/'}>Home</Link>
      <Link href='/login'>Login</Link>
			<Link href='/register'>Register</Link>
			<Link href='/products'>Products</Link>
			<SignOutButton/>
      <ModeSwitcher />
			<CartDrawer />
		</header>
	)
}

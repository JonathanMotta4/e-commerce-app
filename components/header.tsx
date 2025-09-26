import Link from 'next/link'
import { CartDrawer } from './cart-drawer'
import { ModeSwitcher } from './mode-switcher'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList
} from './ui/navigation-menu'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { SignOutButton } from './signout-button'

export async function Header() {
	const session = await auth.api.getSession({ headers: await headers() })
	const isAuthenticated = !!session?.user

	return (
		<header className='flex justify-between items-center px-6 py-4 border-b bg-background shadow-sm'>
			{/* Left: Logo or site title */}
			<div className='text-xl font-bold tracking-tight'>
				<Link href='/' className='hover:opacity-80 transition-colors'>
					MyStore
				</Link>
			</div>

			{/* Center: Navigation Menu */}
			<NavigationMenu>
				<NavigationMenuList className='gap-4'>
					{isAuthenticated ? (
						<NavigationMenuItem>
							<Link
								href='/dashboard'
								className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
							>
								Dashboard
							</Link>
						</NavigationMenuItem>
					):null}
					<NavigationMenuItem>
						<Link
							href='/products'
							className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
						>
							Products
						</Link>
					</NavigationMenuItem>

					{!isAuthenticated && (
						<>
							<NavigationMenuItem>
								<Link
									href='/login'
									className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
								>
									Login
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									href='/register'
									className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
								>
									Register
								</Link>
							</NavigationMenuItem>
						</>
					)}
				</NavigationMenuList>
			</NavigationMenu>

			{/* Right: Actions */}
			<div className='flex items-center gap-4'>
				<ModeSwitcher />
				<CartDrawer />

				{isAuthenticated ? <SignOutButton /> : null}
			</div>
		</header>
	)
}

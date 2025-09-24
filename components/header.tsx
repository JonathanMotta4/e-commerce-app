import { ModeSwitcher } from './mode-switcher'

export function Header() {
	return (
		<header className='flex justify-end items-center p-2 w-full h-10'>
			<ModeSwitcher />
		</header>
	)
}

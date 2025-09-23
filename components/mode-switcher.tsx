'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Button } from './ui/button'

export function ModeSwitcher() {
	const { setTheme } = useTheme()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon'>
					<Sun className='transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 h-[1.2rem] w-[1.2rem]' />
					<Moon className='absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 h-[1.2rem] w-[1.2rem]' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

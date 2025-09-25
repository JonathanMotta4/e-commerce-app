import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/header'
import { CartProvider } from '@/context/cart-context'

export const metadata: Metadata = {
	title: 'E Commerce App'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<CartProvider>
					<ThemeProvider
						attribute={'class'}
						defaultTheme={'dark'}
						enableSystem
						disableTransitionOnChange
					>
						<Header />
						{children}
						<Toaster richColors position='top-right' />
					</ThemeProvider>
				</CartProvider>
			</body>
		</html>
	)
}

import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/header'

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
				<ThemeProvider
					attribute={'class'}
					defaultTheme={'dark'}
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}

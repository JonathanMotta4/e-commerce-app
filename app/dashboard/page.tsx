import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@/components/signout-button'
import { auth } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, ShoppingBag, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function Dashboard() {
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session) {
		redirect('/')
	}
	const initials = session.user.name
		? session.user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
		: 'U'
	return (
		<div className='container mx-auto min-h-screen flex flex-col justify-center items-center px-4'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader className='text-center flex flex-col items-center'>
					<Avatar className='w-20 h-20'>
						<AvatarImage
							src={session.user.image ?? undefined}
							alt={session.user.name}
						/>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<CardTitle className='text-2xl font-bold'>
						Bem-vindo, {session.user.name} 👋
					</CardTitle>
				</CardHeader>

				<CardContent className='space-y-6'>
					{/* User Info */}
					<div className='flex flex-col items-center gap-2'>
						<div className='flex items-center gap-2 text-muted-foreground'>
							<User className='w-4 h-4' />
							<span>{session.user.name}</span>
						</div>
						<div className='flex items-center gap-2 text-muted-foreground'>
							<Settings className='w-4 h-4' />
							<span>{session.user.email}</span>
						</div>
					</div>

					{/* Actions */}
					<div className='flex flex-col gap-3'>
						<Button asChild className='w-full'>
							<a href='/products'>
								<ShoppingBag className='w-4 h-4 mr-2' /> Ver Produtos
							</a>
						</Button>

						<Button asChild variant='secondary' className='w-full'>
							<a href='/dashboard/settings'>
								<Settings className='w-4 h-4 mr-2' /> Configurações
							</a>
						</Button>

						<SignOutButton />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

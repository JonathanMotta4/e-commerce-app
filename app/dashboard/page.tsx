import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@/components/signout-button'
import { auth } from '@/lib/auth'

export default async function Dashboard() {
	const session = await auth.api.getSession({ headers: await headers() })
	if (!session) {
		redirect('/')
	}
	return (
		<div className='container flex flex-col justify-center items-center mx-auto min-h-screen'>
			<h1 className='mb-2 text-2xl font-bold'>Página Dashboard</h1>
			<h3>Usuario logado: {session.user.name}</h3>
			<h3 className='mb-4'>Email: {session.user.email}</h3>
			<SignOutButton />
		</div>
	)
}

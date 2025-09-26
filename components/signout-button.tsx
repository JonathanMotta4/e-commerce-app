'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export function SignOutButton() {
const router=useRouter()
	async function signOut() {
		try {
			await authClient.signOut()
			toast.success('Logout successful')
			router.replace('/')
		} catch (error) {
			console.error('Sign out failed:', error)
			toast.error('Failed to log out. Please try again.')
		}
	}


	return (
		<Button variant='secondary' onClick={signOut}>
			Sair da conta
		</Button>
	)
}

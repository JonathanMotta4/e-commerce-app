'use client'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'

export function GithubSignIn() {
	const handleSignin = async () => {
		const data = await authClient.signIn.social({
			provider: 'github',
			callbackURL: '/dashboard'
		})
		if (data.error) {
			console.log(data.error)
			toast.error('Error at signin with Github')
		}
		console.log(data) 
    // Redirect to BetterAuth social login endpoint
    window.location.href = '/api/auth/sign-in/github?callbackURL=/dashboard'
	}
	return (
		<Button onClick={handleSignin} variant={'outline'}>
			Sign In with Github
		</Button>
	)
}

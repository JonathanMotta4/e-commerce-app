import Link from 'next/link'
import { CredentialsSignIn } from './credentials-signin'
import { GithubSignIn } from './github-signin'
import { Button } from './ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from './ui/card'
import { Separator } from './ui/separator'

export function LoginForm() {
	return (
		<Card className='mx-auto w-md'>
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Don't have an account?{' '}
					<Button variant={'link'}>
						<Link href='/register'>Register</Link>
					</Button>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CredentialsSignIn />
				<Separator className='my-2' />
				<GithubSignIn />
			</CardContent>
		</Card>
	)
}

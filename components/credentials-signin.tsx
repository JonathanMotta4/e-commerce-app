'use client'

import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export function CredentialsSignIn() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const formSchema = z.object({
		email: z.email(),
		password: z.string().min(8)
	})
	type SignInProps = z.infer<typeof formSchema>
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	async function onSubmit(values: SignInProps) {
		const { data, error } = await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
				callbackURL: '/dashboard'
			},
			{
				onRequest: () => {
					setIsLoading(true)
				},
				onSuccess: (ctx) => {
					setIsLoading(false)
					toast.success('User signed in sucessfully')
					router.push('/dashboard')
				},
				onError(ctx) {
					toast.error(`An error was ocurred: ${ctx.error.message}`)
					setIsLoading(false)
					console.error(ctx.error)
				}
			}
		)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email:</FormLabel>
							<FormControl>
								<Input type='email' placeholder='shadcn' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>{' '}
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password:</FormLabel>
							<FormControl>
								<Input type='password' placeholder='shadcn' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? (
						<span>
							<Loader2 />
							Processing...
						</span>
					) : (
						'SignIn'
					)}
				</Button>
			</form>
		</Form>
	)
}

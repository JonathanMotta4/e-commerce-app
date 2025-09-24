'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/auth-client'
import { GithubSignIn } from './github-signin'

export function RegisterForm() {
	const signupSchema = z
		.object({
			name: z
				.string()
				.min(3, { error: 'The name must be at least 3 characters long' }),
			email: z.email({ error: 'Invalid email' }),
			password: z
				.string()
				.min(8, { error: 'The password must be at least 8 characters long' }),
			confirmPassword: z.string().min(8, {
				error: 'Password confirmation must be at least 8 characters long'
			})
		})
		.refine((data) => data.password === data.confirmPassword, {
			error: 'Passwords dont match',
			path: ['confirmPassword']
		})

	type SignupFormValues = z.infer<typeof signupSchema>
	function RegisterWithCredentials() {
		const [showPassword, setShowPassword] = useState(false)
		const [showConfirmPassword, setShowConfirmPassword] = useState(false)
		const [isLoading, setIsLoading] = useState(false)
		const router = useRouter()
		const form = useForm<SignupFormValues>({
			resolver: zodResolver(signupSchema),
			defaultValues: {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
		})
		async function onSubmit(formData: SignupFormValues) {
			if (formData) {
				const { data, error } = await authClient.signUp.email(
					{
						name: formData.name,
						email: formData.email,
						password: formData.password,
						callbackURL: '/dashboard'
					},
					{
						onRequest: () => {
							setIsLoading(true)
						},
						onSuccess: (ctx) => {
							setIsLoading(false)
							toast.success('User created')
							console.log(ctx)

							router.replace('/dashboard')
						},
						onError: (ctx) => {
							setIsLoading(false)
							toast.error('Error creating account')
							console.log(ctx)
						}
					}
				)
			}
		}

		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Your name here'
										{...field}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='your@email.com'
										type='email'
										{...field}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='••••••••'
											type={showPassword ? 'text' : 'password'}
											{...field}
											disabled={isLoading}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='absolute top-0 right-0 py-2 px-3 h-full hover:bg-transparent'
											onClick={() => setShowPassword(!showPassword)}
											disabled={isLoading}
										>
											{showPassword ? (
												<EyeOff className='w-4 h-4 text-muted-foreground' />
											) : (
												<Eye className='w-4 h-4 text-muted-foreground' />
											)}
											<span className='sr-only'>
												{showPassword ? 'Hide password' : 'Show password'}
											</span>
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='••••••••'
											type={showConfirmPassword ? 'text' : 'password'}
											{...field}
											disabled={isLoading}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='absolute top-0 right-0 py-2 px-3 h-full hover:bg-transparent'
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											disabled={isLoading}
										>
											{showConfirmPassword ? (
												<EyeOff className='w-4 h-4 text-muted-foreground' />
											) : (
												<Eye className='w-4 h-4 text-muted-foreground' />
											)}
											<span className='sr-only'>
												{showConfirmPassword
													? 'Hide password'
													: 'Show password'}
											</span>
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full' disabled={isLoading}>
						{form.formState.isSubmitting ? (
							<>
								<Loader2 className='mr-2 w-4 h-4 animate-spin' />
								Registering user...
							</>
						) : (
							'Sign up'
						)}
					</Button>
				</form>
			</Form>
		)
	}
	return (
		<Card className='mx-auto w-md'>
			<CardHeader>
				<CardTitle>Register account</CardTitle>
				<CardDescription>
					Have an account?{' '}
					<Button variant={'link'}>
						<Link href='/login'>Sign in</Link>
					</Button>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<RegisterWithCredentials />
				<Separator className='my-2' />
				<GithubSignIn />
			</CardContent>
		</Card>
	)
}

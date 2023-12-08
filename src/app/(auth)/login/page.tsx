'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { cn } from '@/libs/utils';
import useAuth from '@/utils/useAuth';
import Button from '@/components/button/button';

interface LoginPageProps {
	//
}

type LoginForm = {
	username: string;
	password: string;
};

const LoginPage: React.FC<LoginPageProps> = () => {
	const { login } = useAuth();
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		setLoading(true);
		setError(null);

		try {
			await login(data.username, data.password);
		} catch (error: any) {
			setError(JSON.parse(error.message).detail);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full max-w-lg'>
			<h1 className='mb-5 text-center text-5xl font-bold m-3'>Log In</h1>
			<Image src='/vcclogo.png' width={250} height={250} alt='logo' className='mx-auto mb-10 m-10' />
			<form onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-5'>
				<div className={cn('grid grid-cols-1 md:grid-cols-5 gap-4 items-center', errors.username && 'mb-2')}>
					<label htmlFor='username' className='font-bold md:col-span-1'>
					Username
					</label>
					<input
					type='text'
					placeholder='Username'
					{...register('username', {
						required: 'Username is required',
						minLength: { value: 3, message: 'Username must be at least 3 characters' },
						maxLength: { value: 20, message: 'Username must be at most 20 characters' },
					})}
					className='w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coffee-600 focus:border-transparent form-shadow md:col-span-4'
					/>
				</div>
				{<span className='text-red-500 text-sm'>{errors?.username?.message}</span>}
				</div>

				<div className='mb-5'>
				<div className={cn('grid grid-cols-1 md:grid-cols-5 gap-4 items-center', errors.password && 'mb-2')}>
					<label htmlFor='password' className='font-bold md:col-span-1'>
					Password
					</label>
					<input
					type='password'
					placeholder='Password'
					{...register('password', {
						required: 'Password is required',
						minLength: { value: 6, message: 'Password must be at least 6 characters' },
						maxLength: { value: 20, message: 'Password must be at most 20 characters' },
					})}
					className='w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coffee-600 focus:border-transparent form-shadow md:col-span-4'
					/>
				</div>
				{<span className='text-red-500 text-sm'>{errors?.password?.message}</span>}
				</div>

				<p className='text-red-500 text-center text-sm mb-5'>{error}</p>

				<Button type='submit' disabled={loading} className='px-10 mx-auto my-5 flex items-center'>
					{loading && <Loader2 className='mr-2 animate-spin' size={20} />}
					Log In
				</Button>

				<span className='block text-center font-bold'>
					Dont have an account?{' '}
					<Link
						href='/register'
						className='hover:underline decoration-2 decoration-dotted decoration-color-coffee-600 underline-offset-4'>
						Register
					</Link>
				</span>
			</form>
		</div>
	);
};

export default LoginPage;

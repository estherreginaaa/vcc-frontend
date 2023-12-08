'use client';

import * as React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { cn } from '@/libs/utils';
import useAuth from '@/utils/useAuth';
import Button from '@/components/button/button';
interface RegisterPageProps {

}

type RegisterForm = {
	username: string;
	password: string;
	email: string;
	name: string;
};

const RegisterPage: React.FC<RegisterPageProps> = () => {
	const { register } = useAuth();
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	const {
		register: registerForm,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>();

	const onSubmit = async (data: RegisterForm) => {
		setLoading(true);
		setError(null);

		try {
			await register(data.username, data.password, data.email, data.name);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full max-w-lg'>
			<h1 className='mb-5 text-center text-2xl font-bold'>Register</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-5'>
					<div className={cn('grid grid-cols-5 gap-4 items-center', errors.username && 'mb-2')}>
						<label htmlFor='username' className='font-bold'>
							Username
						</label>
						<input
							type='text'
							placeholder='Username'
							{...registerForm('username', {
								required: 'Username is required',
								minLength: { value: 3, message: 'Username must be at least 3 characters' },
							})}
							className='w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coffee-600 focus:border-transparent form-shadow col-span-4'
						/>
					</div>
					<span className='text-red-500 text-sm'>{errors.username?.message}</span>
				</div>

				<div className='mb-5'>
					<div className={cn('grid grid-cols-5 gap-4 items-center', errors.password && 'mb-2')}>
						<label htmlFor='password' className='font-bold'>
							Password
						</label>
						<input
							type='password'
							placeholder='Password'
							{...registerForm('password', {
								required: 'Password is required',
								minLength: { value: 6, message: 'Password must be at least 6 characters' },
							})}
							className='w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coffee-600 focus:border-transparent form-shadow col-span-4'
						/>
					</div>
					<span className='text-red-500 text-sm'>{errors.password?.message}</span>
				</div>

				<div className='mb-5'>
					<div className={cn('grid grid-cols-5 gap-4 items-center', errors.email && 'mb-2')}>
						<label htmlFor='email' className='font-bold'>
							Email
						</label>
						<input
							type='email'
							placeholder='Email'
							{...registerForm('email', {
								required: 'Email is required',
								pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' },
							})}
							className='w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coffee-600 focus:border-transparent form-shadow col-span-4'
						/>
					</div>
					<span className='text-red-500 text-sm'>{errors.email?.message}</span>
				</div>

				<div className='mb-5'>
					<div className={cn('grid grid-cols-5 gap-4 items-center', errors.name && 'mb-2')}>
						<label htmlFor='name' className='font-bold'>
							Name
						</label>
						<input
							type='text'
							placeholder='Name'
							{...registerForm('name', {
								required: 'Name is required',
								minLength: { value: 3, message: 'Name must be at least 3 characters' },
							})}
							className='w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-coffee-600 focus:border-transparent form-shadow col-span-4'
						/>
					</div>
					<span className='text-red-500 text-sm'>{errors.name?.message}</span>
				</div>

				<p className='text-red-500 text-center text-sm mb-5'>{error}</p>

				<Button type='submit' disabled={loading} className='px-10 mx-auto my-5 flex items-center'>
					{loading && <Loader2 className='mr-2 animate-spin' size={20} />}
					Register
				</Button>

				<span className='block text-center font-bold'>
					Aleady have an account?{' '}
					<Link
						href='/login'
						className='hover:underline decoration-2 decoration-dotted decoration-color-coffee-600 underline-offset-4'>
						Log In
					</Link>
				</span>
			</form>
		</div>
	);
};

export default RegisterPage;

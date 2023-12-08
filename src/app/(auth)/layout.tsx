'use client';

import * as React from 'react';
import useAuth from '@/utils/useAuth';
import { redirect } from 'next/navigation';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { session } = useAuth();

	React.useEffect(() => {
		if (session) redirect('/');
	}, [session]);

	return (
		<main className='bg-coffee-100 text-coffee-900'>
			<div className='container mx-auto px-2'>
				<div className='flex justify-center items-center min-h-screen'>{children}</div>
			</div>
		</main>
	);
};

export default Layout;

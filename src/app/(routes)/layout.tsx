'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import useAuth from '@/utils/useAuth';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const [mounted, setMounted] = React.useState(false);
	const { session, logout } = useAuth();

	React.useEffect(() => {
		setMounted(true);
	}, []);

	React.useEffect(() => {
		if (!session && mounted) redirect('/login');
	}, [session, mounted]);

	if (!mounted) return null;

	return (
		<main className='bg-coffee-100 text-coffee-900 min-h-screen'>
			<div className='container mx-auto px-2'>
				{session && <Navbar user={session.user} logout={logout} />}
				{children}
			</div>
		</main>
	);
};

export default MainLayout;

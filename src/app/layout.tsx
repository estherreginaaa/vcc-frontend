import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/utils/useAuth';

import './globals.css';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin-ext'],
});

export const metadata: Metadata = {
	title: 'Virtual Coffee Conference',
	description: 'An online solution to the coffee enthusiasts.',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang='en'>
			<AuthProvider>
				<body className={poppins.className}>{children}</body>
			</AuthProvider>
		</html>
	);
};

export default RootLayout;

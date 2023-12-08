import * as React from 'react';
import { cn } from '@/libs/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variants?: 'primary' | 'secondary';
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, variants = 'primary', children, ...props }) => {
	return (
		<button
			className={cn(
				'p-3 font-bold transition duration-300 ease-in-out rounded-xl disabled:opacity-50 disabled:pointer-events-none',
				variants === 'primary' && 'bg-coffee-800 hover:bg-coffee-900 text-white',
				variants === 'secondary' && 'bg-coffee-200 hover:bg-coffee-300 text-black',
				className
			)}
			{...props}>
			{children}
		</button>
	);
};

export default Button;

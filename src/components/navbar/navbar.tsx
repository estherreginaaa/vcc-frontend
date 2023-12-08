import * as React from 'react';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { CircleUserIcon } from 'lucide-react';
import Button from '@/components/button/button';
import type { User } from '@/libs/types';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User;
	logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, logout, ...props }) => {
	return (
		<nav className='flex justify-between items-center py-5' {...props}>
		<Link href='/'>
			<span className='font-bold text-lg'>Virtual Coffee Conference</span>
		</Link>
		<div className='flex items-center space-x-4'>
			<Popover className='relative'>
				<Popover.Button>
					<Button variants='secondary' className='text-sm px-10 flex items-center'>
						<CircleUserIcon className='w-5 h-5 mr-2' />
						{user.username}
					</Button>
				</Popover.Button>

				<Popover.Panel className='absolute z-10 right-0 w-60 mt-5'>
					<div className='flex flex-col space-y-2 bg-white rounded-xl p-2 text-sm card-shadow'>
						<div className='flex items-center p-2 space-x-2'>
							<div className='h-10 w-10 rounded-full bg-coffee-100 relative overflow-hidden'>
								<CircleUserIcon className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6' />
							</div>
							<div className='flex flex-col space-y-1 p-2'>
								<p>{user.name}</p>
								<p className='text-muted text-xs'>{user.email}</p>
							</div>
						</div>
						<hr />
						<button
							className='text-start p-2 rounded-lg hover:bg-zinc-100 cursor-pointer'
							onClick={logout}>
							Logout
						</button>
					</div>
				</Popover.Panel>
			</Popover>
		</div>
		</nav>
	);
};

export default Navbar;

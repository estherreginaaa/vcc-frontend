import * as React from 'react';
import Link from 'next/link';
import Button from '@/components/button/button';

interface HomeProps {
	//
}

const items = [
	{
		title: 'Payment Processing',
		link: '/payment',
	},
	{
		title: 'Scheduling Platform',
		link: '/scheduling',
	},
	{
		title: 'Video Conference',
		link: '/conference',
	},
	{
		title: 'Interactive Chat Coffee Consultation',
		link: '/interactivechat',
	},
	{
		title: 'Location Recomendations',
		link: '/location',
	},
];

const Home: React.FC<HomeProps> = ({}) => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='font-bold text-3xl mb-5'>What do you want to do</h1>
			<div className='w-full max-w-screen-lg flex flex-wrap justify-center [&>div]:p-10'>
				{items.map((item, index) => (
					<div key={index} className='w-full md:w-1/2 lg:w-1/3'>
						<div className='p-5 w-full aspect-[4/2] md:aspect-[4/3] bg-white card-shadow rounded-xl flex flex-col items-center justify-center relative'>
							<h1 className='font-bold text-2xl text-coffee-500 text-center mb-10'>{item.title}</h1>
							<Link href={item.link} className='absolute bottom-5'>
								<Button variants='secondary' className='text-sm px-10'>
									Lihat
								</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;

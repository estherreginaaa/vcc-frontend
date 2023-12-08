'use client';

import * as React from 'react';
import useAuth from '@/utils/useAuth';
import type { InteractiveChat } from '@/libs/types';
import Button from '@/components/button/button';

interface InteractiveChatPageProps {
	//
}

const InteractiveChatPage: React.FC<InteractiveChatPageProps> = () => {
	const { session, logout } = useAuth();
	const [page, setPage] = React.useState<number>(1);
	const [interactivechat, setinteractivechat] = React.useState<InteractiveChat[] | undefined>(undefined);
	const [error, setError] = React.useState<string | null>(null);
	const apiUrl = process.env.API_URL;


	React.useEffect(() => {
		if (!session) return;

		const getInteractiveChat = async () => {
			try {
				const res = await fetch(`http://virtualcoffeeconsultationintegration.aff4h7g5dehrdecn.southeastasia.azurecontainer.io:8000/get_interactionLog`, {
					headers: {
						Authorization: `Bearer ${session?.token}`,
					},
				});
				const data = await res.json();
				setinteractivechat(data.interactionLogs);
			} catch (error: any) {
				setError(error.message);
			}
		};

		getInteractiveChat();
	}, [session, logout]);


	const paginated = React.useMemo(() => {
		if (!interactivechat || Array == null) return;

		const start = (page - 1) * 10;
		const end = start + 10;
		return interactivechat.slice(start, end);
	}, [interactivechat, page]);
	console.log('Paginated Data:', paginated);

	const handleNext = () => {
		if (!interactivechat) return;
		setPage((page) => Math.min(page + 1, Math.ceil(interactivechat.length / 10)));
	};

	const handlePrev = () => {
		if (!interactivechat) return;
		setPage((page) => Math.max(page - 1, 1));
	};

	return (
		<div className='py-20'>
			<h1 className='font-bold text-2xl text-center mb-5'>Interactive Chat</h1>
			{error && <p className='text-red-500 text-center text-sm mb-5'>{error}</p>}

			{interactivechat ? (
				<>
					<div className='w-full overflow-auto mb-5'>
						<table className='w-full border-separate border-spacing-4'>
							<thead>
								<tr className='rounded-lg bg-coffee-400 text-coffee-100 text-center'>
								<th className='min-w-[200px] border border-coffee-400 p-4'>Interaction Log ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>User ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Staff ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Interaction Type</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Message</th>
                                    <th className='min-w-[200px] border border-coffee-400 p-4'>Interaction Time</th>
								</tr>
							</thead>
							<tbody>
							{paginated?.map((chat: InteractiveChat) => (
									<tr key={chat._id} className='bg-white text-center '>
										<td className='border border-coffee-700 p-4'>{chat.interactionLog_id}</td>
										<td className='border border-coffee-700 p-4'>{chat.user_id}</td>
										<td className='border border-coffee-700 p-4'>{chat.staff_id}</td>
										<td className='border border-coffee-700 p-4'>{chat.interaction_type}</td>
										<td className='border border-coffee-700 p-4'>{chat.message}</td>
                                        <td className='border border-coffee-700 p-4'>{chat.interaction_time}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className='flex justify-center items-center space-x-4'>
						<Button variants='primary' className='text-sm px-5' onClick={handlePrev} disabled={page === 1}>
							Prev
						</Button>
						<span className='text-coffee-500 font-bold'>{page}</span>
						<Button
							variants='primary'
							className='text-sm px-5'
							onClick={handleNext}
							disabled={!interactivechat || page === Math.ceil(interactivechat.length / 10)}>
							Next
						</Button>
					</div>
				</>
			) : (
				<p className='text-center'>No interactive chat found</p>
			)}
		</div>
	);
};

export default InteractiveChatPage;

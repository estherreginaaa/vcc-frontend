'use client';

import * as React from 'react';
import useAuth from '@/utils/useAuth';
import type { Conference } from '@/libs/types';
import Button from '@/components/button/button';
import Link from 'next/link';

interface ConferencePageProps {
	//
}

const ConferencePage: React.FC<ConferencePageProps> = () => {
	const { session, logout } = useAuth();
	const [page, setPage] = React.useState<number>(1);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [conferences, setConferences] = React.useState<Conference[] | undefined>(undefined);

	React.useEffect(() => {
		if (!session) return;

		const getPayments = async () => {
			try {
				const res = await fetch(`http://virtualcoffeeconsultationintegration.aff4h7g5dehrdecn.southeastasia.azurecontainer.io:8000/videoconference`, {
					headers: {
						Authorization: `Bearer ${session?.token}`,
					},
				});
				const data = await res.json();
				setConferences(data);
			} catch (error: any) {
				setError(error.message);
			}
		};

		getPayments();
	}, [session, logout]);
	console.log('Interactive Chat State:', conferences);


	const paginated = React.useMemo(() => {
		if (!conferences) return;

		const start = (page - 1) * 10;
		const end = start + 10;
		return conferences.slice(start, end);
	}, [conferences, page]);
	console.log('Paginated Data:', paginated);


	const handleNext = () => {
		if (!conferences) return;
		setPage((page) => Math.min(page + 1, Math.ceil(conferences.length / 10)));
	};

	const handlePrev = () => {
		if (!conferences) return;
		setPage((page) => Math.max(page - 1, 1));
	};

	return (
		<div className='py-20'>
			<h1 className='font-bold text-2xl text-center mb-5'>Video Conference</h1>
			{error && <p className='text-red-500 text-center text-sm mb-5'>{error}</p>}
			{loading && <p className='text-center text-sm mb-5'>Loading...</p>}

			{conferences ? (
				<>
					<div className='w-full overflow-auto mb-5'>
						<table className='w-full border-separate border-spacing-4'>
							<thead>
								<tr className='rounded-lg bg-coffee-400 text-coffee-100 text-center'>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Consultation ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Participant ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Advisor ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Host ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Consultation Date</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Consultation Time</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Meeting Platform</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Meeting Link</th>
								</tr>
							</thead>
							<tbody>
								{paginated?.map((payment: Conference) => (
									<tr key={payment._id} className='bg-white text-center '>
										<td className='border border-coffee-700 p-4'>{payment.consultationID}</td>
										<td className='border border-coffee-700 p-4'>{payment.participantID}</td>
										<td className='border border-coffee-700 p-4'>{payment.advisorID}</td>
										<td className='border border-coffee-700 p-4'>{payment.participantID}</td>
										<td className='border border-coffee-700 p-4'>{payment.consultationDate}</td>
										<td className='border border-coffee-700 p-4'>{payment.consultationTime}</td>
										<td className='border border-coffee-700 p-4'>{payment.meetingPlatform}</td>
										<td className='border border-coffee-700 p-4'>
											<Link
												href={payment.meetingLink}
												target='_blank'
												className='underline decoration-2 decoration-dotted underline-offset-4'>
												open
											</Link>
										</td>
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
							disabled={!conferences || page === Math.ceil(conferences.length / 10)}>
							Next
						</Button>
					</div>
				</>
			) : (
				<p className='text-center'>No conferences found</p>
			)}
		</div>
	);
};

export default ConferencePage;

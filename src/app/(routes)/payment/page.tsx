'use client';

import * as React from 'react';
import useAuth from '@/utils/useAuth';
import type { Payment } from '@/libs/types';
import Button from '@/components/button/button';

interface PaymentPageProps {
	//
}

const PaymentPage: React.FC<PaymentPageProps> = () => {
	const { session, logout } = useAuth();
	const [page, setPage] = React.useState<number>(1);
	const [payments, setPayments] = React.useState<Payment[] | undefined>(undefined);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!session) return;

		const getPayments = async () => {
			try {
				const res = await fetch(`http://vcchoteltour.evaqbngfeabyhpdr.southeastasia.azurecontainer.io:8000/paymentprocessing`, {
					headers: {
						Authorization: `Bearer ${session?.token}`,
					},
				});
				const data = await res.json();
				setPayments(data);
			} catch (error: any) {
				setError(error.message);
			}
		};

		getPayments();
	}, [session, logout]);

	const paginated = React.useMemo(() => {
		if (!payments) return;

		const start = (page - 1) * 10;
		const end = start + 10;
		return payments.slice(start, end);
	}, [payments, page]);

	const handleNext = () => {
		if (!payments) return;
		setPage((page) => Math.min(page + 1, Math.ceil(payments.length / 10)));
	};

	const handlePrev = () => {
		if (!payments) return;
		setPage((page) => Math.max(page - 1, 1));
	};

	return (
		<div className='py-20'>
			<h1 className='font-bold text-2xl text-center mb-5'>Payment Processing</h1>
			{error && <p className='text-red-500 text-center text-sm mb-5'>{error}</p>}

			{payments ? (
				<>
					<div className='w-full overflow-auto mb-5'>
						<table className='w-full border-separate border-spacing-4'>
							<thead>
								<tr className='rounded-lg bg-coffee-400 text-coffee-100 text-center'>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Consultation ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Participant ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Payment ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Amount</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Status</th>
								</tr>
							</thead>
							<tbody>
								{paginated?.map((payment: Payment) => (
									<tr key={payment._id} className='bg-white text-center '>
										<td className='border border-coffee-700 p-4'>{payment.consultationID}</td>
										<td className='border border-coffee-700 p-4'>{payment.participantID}</td>
										<td className='border border-coffee-700 p-4'>{payment.paymentID}</td>
										<td className='border border-coffee-700 p-4'>{payment.amount}</td>
										<td className='border border-coffee-700 p-4'>{payment.status}</td>
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
							disabled={!payments || page === Math.ceil(payments.length / 10)}>
							Next
						</Button>
					</div>
				</>
			) : (
				<p className='text-center'>No payments found</p>
			)}
		</div>
	);
};

export default PaymentPage;

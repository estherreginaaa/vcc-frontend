'use client';

import * as React from 'react';
import useAuth from '@/utils/useAuth';
import type { Location } from '@/libs/types';
import Button from '@/components/button/button';

interface LocationPageProps {
	//
}

const LocationPage: React.FC<LocationPageProps> = () => {
	const { session, logout } = useAuth();
	const [page, setPage] = React.useState<number>(1);
	const [location, setlocation] = React.useState<Location[] | undefined>(undefined);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!session) return;

		const getLocations = async () => {
			try {
				const res = await fetch(`http://localhost:8000/get_virtual_coffee_recommendationlocation`, {
					headers: {
						Authorization: `Bearer ${session?.token}`,
					},
				});
				const data = await res.json();
				setlocation(data);
			} catch (error: any) {
				setError(error.message);
			}
		};

		getLocations();
	}, [session, logout]);

	const paginated = React.useMemo(() => {
        if (!location) return [];
      
        const start = (page - 1) * 10;
        const pageSize = 10;
        const paginatedData = [];
      
        for (let i = start; i < start + pageSize && i < location.length; i++) {
          paginatedData.push(location[i]);
        }
      
        return paginatedData;
      }, [location, page]);
      

	const handleNext = () => {
		if (!location) return;
		setPage((page) => Math.min(page + 1, Math.ceil(location.length / 10)));
	};

	const handlePrev = () => {
		if (!location) return;
		setPage((page) => Math.max(page - 1, 1));
	};

	return (
		<div className='py-20'>
			<h1 className='font-bold text-2xl text-center mb-5'>Location Recommendation for Virtual Coffee Consultation</h1>
			{error && <p className='text-red-500 text-center text-sm mb-5'>{error}</p>}

			{location ? (
				<>
					<div className='w-full overflow-auto mb-5'>
						<table className='w-full border-separate border-spacing-4'>
							<thead>
								<tr className='rounded-lg bg-coffee-400 text-coffee-100 text-center'>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Location ID</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Area Name</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Description</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Cardinal</th>
									<th className='min-w-[200px] border border-coffee-400 p-4'>Status</th>
								</tr>
							</thead>
							<tbody>
								{paginated?.map((location: Location) => (
									<tr key={location._id} className='bg-white text-center '>
										<td className='border border-coffee-700 p-4'>{location.location_id}</td>
										<td className='border border-coffee-700 p-4'>{location.area_name}</td>
										<td className='border border-coffee-700 p-4'>{location.description}</td>
										<td className='border border-coffee-700 p-4'>{location.cardinal_direction}</td>
										<td className='border border-coffee-700 p-4'>{location.floor}</td>
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
							disabled={!location || page === Math.ceil(location.length / 10)}>
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

export default LocationPage;

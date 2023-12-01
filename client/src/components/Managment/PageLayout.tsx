"use client"
import useResponsive from '@/hooks/useResponsive';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const list = [
	{
		icon: '/assets/user/profile.svg',
		page: 'Listings',
		pageUrl: '/managment',
	},
	{
		icon: '/assets/user/listings.svg',
		page: 'Residents',
		pageUrl: '/managment/residents',
	},
	{
		icon: '/assets/user/orders.svg',
		page: 'Appointments',
		pageUrl: '/managment/appointments',
	}
];

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const router = usePathname();
	const isLg = useResponsive('lg');

	return (
		<div
			className={`container mb-16 mt-6 flex w-full rounded-2xl ${
				isLg && 'border'
			} `}
		>
			{isLg && (
				<div className="px-5 py-24 lg:w-3/12 xl:w-2/12">
					{list.map((item, index) => (
						<Link
							key={`${Date.now() + Math.random()}${index}`}
							href={item.pageUrl}
							className={`${
								router?.includes(item.pageUrl) && ' bg-muted'
							} my-2 flex gap-2 rounded-md px-2 py-4 text-[14px] font-semibold hover:bg-muted`}
						>
							<Image
								src={item.icon}
								width={20}
								height={20}
								alt={`${item.page}-icon`}
							/>
							{item.page}
						</Link>
					))}
				</div>
			)}

			<div
				className={`my-10  ${
					isLg ? 'w-10/12 border-l' : 'w-full'
				} px-4 lg:px-10`}
			>
				{children}
			</div>
		</div>
	);
};

export default Layout;

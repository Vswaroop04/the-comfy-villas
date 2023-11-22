import prisma from '@/database/prismaClient';

export default async function listingDetails(listingId: string) {
	const listing = await prisma.listing.findUnique({
		where: { id: listingId },
	});

	return listing;
}

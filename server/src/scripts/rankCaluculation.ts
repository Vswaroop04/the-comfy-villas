import prisma from '@/database/prismaClient';

export default async function updateListingRanks() {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        ratings: true,
      },
    });

    const listingsWithAvgRating = listings.map(listing => {
      const averageRating = listing.ratings.reduce((acc, curr) => acc + curr.totalRating, 0) / listing.ratings.length;
      return { ...listing, averageRating };
    });

    listingsWithAvgRating.sort((a, b) => b.averageRating - a.averageRating);

    for (let i = 0; i < listingsWithAvgRating.length; i++) {
      await prisma.listing.update({
        where: { id: listingsWithAvgRating[i].id },
        data: { rank: i + 1 },
      });
    }

    console.log('Listing ranks updated successfully.');
  } catch (error) {
    console.error('Error updating listing ranks:', error);
  }
}

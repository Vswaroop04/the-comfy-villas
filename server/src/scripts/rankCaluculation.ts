import prisma from '@/database/prismaClient';

async function updateListingRanks() {
  try {
    // Fetch all listings with their ratings
    const listings = await prisma.listing.findMany({
      include: {
        ratings: true,
      },
    });

    // Calculate average rating for each listing
    const listingAverages = listings.map((listing) => {
      const totalRating = listing.ratings.reduce(
        (sum, rating) => sum + rating.totalRating,
        0
      );
      const averageRating = listing.ratings.length > 0 ? totalRating / listing.ratings.length : 0;
      return { id: listing.id, averageRating };
    });

    // Sort listings based on average rating in descending order
    const sortedListings = listingAverages.sort(
      (a, b) => b.averageRating - a.averageRating
    );

    // Update the rank field in the database sequentially
    for (let i = 0; i < sortedListings.length; i++) {
      const listing = sortedListings[i];
      await prisma.listing.update({
        where: { id: listing.id },
        data: { rank: i + 1 }, // Adding 1 because ranks start from 1
      });
    }

    console.log('Listing ranks updated successfully.');
  } catch (error) {
    console.error('Error updating listing ranks:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default updateListingRanks;
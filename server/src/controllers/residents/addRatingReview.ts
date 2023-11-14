import { Request, Response, NextFunction } from 'express';
import prisma from '@/database/prismaClient';
import { validateReviewRatingData } from './_validator';

export async function addReviewRating(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        //You would validate the input here, for example:
        const data = validateReviewRatingData.parse(req.body);

        const userId = req.session.user?.id || ''
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Add review based on the provided data
        const { listingId, amenitiesRatings, managementRatings, serviceRatings, review } = data;

        // Check if the listing exists
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Add review or ratings based on the provided data
        if (review) {
            await prisma.reviews.create({
                data: {
                    userId,
                    listingId,
                    review,
                },
            });
        }

        if (amenitiesRatings || managementRatings || serviceRatings) {
            const totalRating = (amenitiesRatings + managementRatings + serviceRatings)/3
            await prisma.ratings.create({
                data: {
                    userId,
                    listingId,
                    amenitiesRatings,
                    managementRatings,
                    serviceRatings,
                    totalRating
                },
            });
        }

        return res.status(201).json({ message: "Review and/or ratings added successfully" });
    } catch (error) {
        next(error);
    }
}

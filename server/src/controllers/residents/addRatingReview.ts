import { Request, Response, NextFunction } from 'express';
import prisma from '@/database/prismaClient';
import { validateReviewRatingData } from './_validator';
import listingDetails from '@/utils/listingValidCheck';
export async function addReviewRating(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const data = validateReviewRatingData.parse(req.body);

		const userId = req.session.user?.id || '';
		const user = await prisma.resident.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const {
			listingId,
			amenitiesRatings,
			managementRatings,
			serviceRatings,
			review,
		} = data;

		let listing = listingDetails(listingId);
		if (!listing) {
			return res.status(404).json({ error: 'Lisitng Not Found.' });
		}

		// Check if a review already exists
		const existingReview = await prisma.reviews.findFirst({
			where: {
				userId,
				listingId,
			},
		});

		if (existingReview && review) {
			// Update the existing review
			await prisma.reviews.update({
				where: { id: existingReview.id },
				data: { review },
			});
		} else if (review) {
			// Create a new review
			await prisma.reviews.create({
				data: {
					userId,
					listingId,
					review,
				},
			});
		}

		// Check if a rating already exists
		const existingRating = await prisma.ratings.findFirst({
			where: {
				userId,
				listingId,
			},
		});

		if (
			existingRating &&
			(amenitiesRatings || managementRatings || serviceRatings)
		) {
			// Update the existing rating
			const totalRating =
				(amenitiesRatings + managementRatings + serviceRatings) / 3;
			await prisma.ratings.update({
				where: { id: existingRating.id },
				data: {
					amenitiesRatings,
					managementRatings,
					serviceRatings,
					totalRating,
				},
			});
		} else if (amenitiesRatings || managementRatings || serviceRatings) {
			// Create a new rating
			const totalRating =
				(amenitiesRatings + managementRatings + serviceRatings) / 3;
			await prisma.ratings.create({
				data: {
					userId,
					listingId,
					amenitiesRatings,
					managementRatings,
					serviceRatings,
					totalRating,
				},
			});
		}

		return res
			.status(201)
			.json({ message: 'Review and/or ratings updated successfully' });
	} catch (error) {
		next(error);
	}
}

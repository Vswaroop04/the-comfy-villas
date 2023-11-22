import prisma from '@/database/prismaClient';
import { addListingValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function addListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const validatedData = addListingValidator.parse(req.body);
		const { images, ...newInputData } = validatedData;
		const listingCount = await prisma.listing.count();
		const rank = listingCount + 1;
		const newListing = await prisma.listing.create({
			data: {
				...newInputData,
				rank,
			},
		});
		images.forEach(async (image) => {
			await prisma.image.create({
				data: {
					fullImageUrl: image.fullImageUrl,
					listingId: newListing.id,
					thumbnailImageUrl: image.thumbnailImageUrl,
				},
			});
		});
		res.status(201).json({
			message: 'Listing Added Successfully',
			listing: newListing,
		});
	} catch (err) {
		next(err);
	}
}

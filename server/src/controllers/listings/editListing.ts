import prisma from '@/database/prismaClient';
import { editListingValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import listingDetails from '@/utils/listingValidCheck';

export async function editListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id, ...validatedData } = editListingValidator.parse(req.body);
		let listing = listingDetails(id);
		if (!listing) {
			return res.status(404).json({ error: 'Lisitng Not Found.' });
		}
		const { images, ...newInputData } = validatedData;
		const listingCount = await prisma.listing.count();
		const rank = listingCount + 1;
		const updatedListing = await prisma.listing.update({
			where: { id },
			data: newInputData,
		});
		for (const image of images) {
			if (image.id) {
				await prisma.image.update({
					where: {
						id: image.id,
					},
					data: {
						fullImageUrl: image.fullImageUrl,
						thumbnailImageUrl: image.thumbnailImageUrl,
						listingId: updatedListing.id,
					},
				});
			} else {

			
				await prisma.image.create({
					data: {
						fullImageUrl: image.fullImageUrl,
						listingId: updatedListing.id,
						thumbnailImageUrl: image.thumbnailImageUrl,
					},
				});
			}
		}

		// Clearing the session after deletion
		res
			.status(200)
			.json({ message: 'Listing Edited successfully', updatedListing });
	} catch (err) {
		next(err);
	}
}

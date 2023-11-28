import prisma from '@/database/prismaClient';
import { editListingValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import listingDetails from '@/utils/listingValidCheck';

export async function getAllListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const listings = await prisma.listing.findMany({
			include: {
				images: true,
			},
		});
		res
			.status(200)
			.json({ message: 'All Listings Fetched successfully', listings });
	} catch (err) {
		next(err);
	}
}

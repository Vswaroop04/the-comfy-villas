import prisma from '@/database/prismaClient';
import { deleteListingValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import listingDetails from '@/utils/listingValidCheck';

export async function deleteListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { id } = deleteListingValidator.parse(req.body);
		let listing = listingDetails(id)
		if (!listing) {
			return res.status(404).json({ error: "Lisitng Not Found." });
		}
		await prisma.listing.delete({
			where: { id },
		});

		res
			.status(200)
			.json({ message: 'Listing deleted successfully' });
	} catch (err) {
		next(err);
	}
}
import prisma from '@/database/prismaClient';
import { deleteListingValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';


export async function deleteListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const {id } = deleteListingValidator.parse(req.body);

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
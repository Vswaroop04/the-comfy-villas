import prisma from '@/database/prismaClient';
import { NextFunction, Request, Response } from 'express';
import listingDetails from '@/utils/listingValidCheck';

export async function getAllResidents(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const residents = await prisma.resident.findMany({
			include: {
                ratings: true,
                reviews: true,
                listing : true
			},
		});
		res
			.status(200)
			.json({ message: 'All Residents  Fetched successfully', residents });
	} catch (err) {
		next(err);
	}
}

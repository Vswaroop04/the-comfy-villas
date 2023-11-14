import prisma from '@/database/prismaClient';
import { addListingValidator} from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function addListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
        const validatedData = addListingValidator.parse(req.body);

        const newListing = await prisma.listing.create({
          data: validatedData,
        })    
	
		res.status(201).json({
			message: 'Listing Added Successfully',
            lisitng : newListing
		});
	} catch (err) {
		next(err);
	}
}


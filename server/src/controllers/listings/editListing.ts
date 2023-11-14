import prisma from '@/database/prismaClient';
import {editListingValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';


export async function editListingController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const {id, ...validatedData} = editListingValidator.parse(req.body);
        const updatedListing = await prisma.listing.update({
        where: { id },
        data: validatedData,
        });

	
		// Clearing the session after deletion
		res
			.status(200)
			.json({ message: 'Listing Edited successfully' , updatedListing });
	} catch (err) {
		next(err);
	}
}
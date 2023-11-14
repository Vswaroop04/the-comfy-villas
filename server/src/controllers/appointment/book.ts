import prisma from '@/database/prismaClient';
import { createAppointmentValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';

export async function createAppointment(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validate input
		const validatedData = createAppointmentValidator.parse(req.body);
		const listingExists = await prisma.listing.findUnique({
            where: { id: validatedData.listingId },
        });

        if (!listingExists) {
            return res.status(404).json({ message: "Listing not found" });
        }
		// Create a new appointment in the database
		const newAppointment = await prisma.appointments.create({
			data: validatedData,
		});

		// Send the created appointment as response
		res.status(201).json({message : "Appointment Booked Succesfully",newAppointment});
	} catch (error) {
		// Handle errors (e.g., validation error, database errors)
		next(error);
	}
}

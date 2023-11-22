import prisma from '@/database/prismaClient';
import { createAppointmentValidator } from './_validator';
import { NextFunction, Request, Response } from 'express';
import sendMailUtil from '@/utils/mailUtil';

export async function createAppointment(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validate input
		const validatedData = createAppointmentValidator.parse(req.body);
		const existingUser = await prisma.appointments.findFirst({
			where: {
				AND: [
					{
						email: validatedData.email,
					},
					{
						listingId: validatedData.listingId,
					},
				],
			},
		});

		if (existingUser) {
			return res.status(409).json({ message: 'An Appointment Already Exists' });
		}
		const listingExists = await prisma.listing.findUnique({
			where: { id: validatedData.listingId },
		});

		if (!listingExists) {
			return res.status(404).json({ message: 'Listing not found' });
		}
		// Create a new appointment in the database
		const newAppointment = await prisma.appointments.create({
			data: validatedData,
		});

		let mailBody = `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            background-color: #f44336;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Appointment Received</h1>
        </div>
        <div class="content">
            <p>Hello Admin,</p>
            <p>You have a new appointment request. Here are the details:</p>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong> <ul>Listing Interested In:</strong></ul></p>
            <p><strong>Listing Name:</strong> ${listingExists.name}</p>
			<p><strong>Listing Id:</strong> ${listingExists.id}</p>
			<p><strong>Listing Price:</strong> ${listingExists.price}</p>
            <p>Please follow up on this appointment at your earliest convenience.</p>
            <p>Best Regards,</p>
            <p>Your Automated Notification System</p>
        </div>
    </div>
</body>
</html>

`;
		await sendMailUtil(
			`New Appointment - ${validatedData.name}`,
			mailBody,
			true
		);

		// Send the created appointment as response
		res
			.status(201)
			.json({ message: 'Appointment Booked Succesfully', newAppointment });
	} catch (error) {
		// Handle errors (e.g., validation error, database errors)
		next(error);
	}
}

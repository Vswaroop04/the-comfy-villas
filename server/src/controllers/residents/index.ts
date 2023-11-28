import prisma from '@/database/prismaClient';
import { residentSchema, deleteResidentSchema } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import sendMailUtil from '@/utils/mailUtil';
import listingDetails from '@/utils/listingValidCheck';
export async function addResident(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const result = residentSchema.parse(req.body);
		//hashing password
		const hashedPassword = await bcrypt.hash(result.password, 10);
		//checking if user already exists
		const existingUser = await prisma.resident.findFirst({
			where: {
				OR: [
					{
						email: result.email,
					},
					{
						phone: result.phone,
					},
				],
			},
		});

		if (existingUser) {
			return res.status(409).json({ message: 'Resident already exists' });
		}
		// inserting into user table
		const listing = await listingDetails(result.listingId);

		if (!listing) {
			return res.status(404).json({ message: 'Listing not found' });
		}

		const user = await prisma.resident.create({
			data: {
				name: result.name,
				email: result.email,
				password: hashedPassword,
				phone: result.phone,
				listingId: result.listingId,
			},
			select: {
				id: true,
				email: true,
				name: true,
				phone: true,
			},
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
            background-color: #4CAF50;
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
            <h1>Welcome to Comfy Villas!</h1>
        </div>
        <div class="content">
            <p>Hello ${result.name},</p>
            <p>We are thrilled to welcome you to your new villa ${listing.name}! We hope you find everything to your satisfaction and comfort.</p>
            <p>Here are your account credentials for our online portal:</p>
            <p><strong>Username:</strong> ${result.email}</p>
            <p><strong>Password:</strong>  ${result.password}</p>
            <p>After settling in, we'd love to hear your thoughts about your new home. Your feedback is invaluable to us. Please feel free to give ratings and reviews for the villa on our portal. It helps us improve and ensures a great experience for you and future residents.</p>
            <p>Remember to change your password after your first login for security reasons. If you need any assistance or have any questions, feel free to reach out to us.</p>
            <p>Welcome aboard, and we wish you a pleasant stay at your new villa!</p>
            <p>Best Regards,</p>
            <p>Comfy Villas :)</p>
        </div>
    </div>
</body>
</html>

`;
		await sendMailUtil(
			`Comfy Villas Welcomes You`,
			mailBody,
			false,
			result.email
		);
		// intializing session
		req.session.user = {
			id: user.id || '',
			email: user.email || '',
			name: user.name || '',
			phone: user.phone || '',
		};

		res.status(201).json({
			message: 'Resident User Created Successfully',
			user,
		});
	} catch (err) {
		next(err);
	}
}

export async function deleteUserController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const result = deleteResidentSchema.parse(req.body);

		await prisma.resident.delete({
			where: { email: result.email },
		});

		// Clearing the session after deletion
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (err) {
		next(err);
	}
}

export async function getResidents(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const users = await prisma.resident.findMany({});
		res.status(200).json({ users });
	} catch (err) {
		next(err);
	}
}

export async function getResident(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const user = await prisma.resident.findFirst({
			where: { id: req.session.user?.id },
			select: {
				email: true,
				ratings: true,
				reviews: true,
				name: true,
				phone: true,
				id: true,
				listing: true,
			},
		});

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
}

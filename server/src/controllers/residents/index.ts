import prisma from '@/database/prismaClient';
import { residentSchema, deleteResidentSchema } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

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
		const existingUser = await prisma.user.findFirst({
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
			return res.status(409).json({ message: 'User already exists' });
		}
		// inserting into user table
		const user = await prisma.user.create({
			data: {
				name: result.name,
				email: result.email,
				password: hashedPassword,
				phone: result.phone,
			},
			select: {
				id: true,
				email: true,
				name: true,
				phone: true,
				role: true,
			},
		});
		// intializing session
		req.session.user = {
			id: user.id || '',
			email: user.email || '',
			name: user.name || '',
			phone: user.phone || '',
			role: user.role || '',
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

		await prisma.user.delete({
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
		const users = await prisma.user.findMany({});
		res.status(200).json({ users });
	} catch (err) {
		next(err);
	}
}

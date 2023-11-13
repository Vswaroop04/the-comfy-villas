import prisma from '@/database/prismaClient';
import { signupSchema, loginSchema } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function signUpController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const result = signupSchema.parse(req.body);
		//hashing password
		const hashedPassword = await bcrypt.hash(result.password, 10);
		//checking if user already exists
		const existingUser = await prisma.user.findUnique({
			where: {
				email: result.email,
			},
		});

		if (existingUser) {
			return res
				.status(409)
				.json({ message: 'User already exists, please login.' });
		}
		// inserting into user table
		const user = await prisma.user.create({
			data: {
				name: result.name,
				email: result.email,
				password: hashedPassword,
				phone: result.phone,
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
			message: 'Signup successful',
			user: {
				id: user.id || '',
				email: user.email || '',
				name: user.name || '',
				phone: user.phone || '',
				role: user.role || '',
			},
		});
	} catch (err) {
		next(err);
	}
}
export async function loginController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const result = loginSchema.parse(req.body);

		// Check user
		const user = await prisma.user.findUnique({
			where: {
				email: result.email,
			},
		});

		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		// Verify password
		const validPassword = await bcrypt.compare(
			result.password,
			user?.password as string
		);
		if (!validPassword) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		// Store user info in session
		req.session.user = {
			id: user.id || '',
			email: user.email || '',
			name: user.name || '',
			phone: user.phone || '',
			role: user.role || '',
		};

		res.status(200).json({
			message: 'Login successful',
			user: {
				id: user.id || '',
				email: user.email || '',
				name: user.name || '',
				phone: user.phone || '',
				role: user.role || '',
			},
		});
	} catch (err) {
		next(err);
	}
}

export async function logoutController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (req.session.user) {
			req.session.user = undefined; // Clear user session data
			// or we can destroy the session completely
			// req.session.destroy(err => {
			//   if (err) {
			//     return next(err);
			//   }
			// });
		}

		res
			.header('Cache-Control', 'no-cache, no-store, must-revalidate')
			.status(200)
			.json({ isLoggedIn: false });
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
		const userId = req.session.user?.id; // assuming the user's ID is stored in the session
		if (!userId) {
			return res.status(401).json({ message: 'User not authenticated' });
		}

		await prisma.user.delete({
			where: { id: userId },
		});

		// Clearing the session after deletion
		req.session.user = undefined;

		res
			.status(200)
			.header('Cache-Control', 'no-cache, no-store, must-revalidate')
			.json({ message: 'User deleted successfully' });
	} catch (err) {
		next(err);
	}
}

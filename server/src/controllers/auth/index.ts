import prisma from '@/database/prismaClient';
import {loginSchema } from './_validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

export async function loginController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		console.log(req.body)
		const result = loginSchema.parse(req.body);


		if(result.email == process.env.ADMIN_MAIL){
			if(result.password !== process.env.ADMIN_PASSWORD){
				return res.status(401).json({ message: 'Invalid email or password' });
			}
			req.session.user = {
				id: "cloynsd9qadmi9qsewupqe1p",
				email:  process.env.ADMIN_MAIL,
				name: "Admin",
				phone: '9494563120',
				role: 'Admin',
			};
	
			return res.status(200).json({
				message: 'Login successful',
				user: {
					id: "pjndn3yonxyelac-c3",
					email:  process.env.ADMIN_MAIL,
					name: "Admin",
					phone: '9494563120',
					role: 'Admin',
				},
			});
		}

		// Check user
		const user = await prisma.resident.findUnique({
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
		};

		res.status(200).json({
			message: 'Login successful',
			user: {
				id: user.id || '',
				email: user.email || '',
				name: user.name || '',
				phone: user.phone || '',
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



import { z } from 'zod';

export const signupSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	phone: z.string(),
	// Regex for international phone numbers
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

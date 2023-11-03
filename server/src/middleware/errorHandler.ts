import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export default function errorHandler(
	error: Error | z.ZodError | string,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('Error Handled: ', error);
	if (error instanceof z.ZodError) {
		res.status(400).json({ error: error.issues });
	} else if (error instanceof Error) {
		res.status(400).json({ error: error.message });
	} else {
		res.status(400).json({ error: error });
	}
}

import { NextFunction, Request, Response } from 'express';

const enableCSRFProtection = true;

export default function isAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.session.user) {
		if (enableCSRFProtection) {
			if (req.headers['x-csrf-token'] === req.session.csrfToken) {
				next();
			} else {
				res.status(401).json({ message: 'Unauthorized' });
			}
		} else {
			next();
		}
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}

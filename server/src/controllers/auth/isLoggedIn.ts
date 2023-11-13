import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
export default async function isLoggedIn(req: Request, res: Response) {
    if (!req.session.csrfToken) {
        req.session.csrfToken = randomUUID();
    }
	res.status(200).json({
		isLoggedIn: req.session.user ? true : false,
		...(req.session.user && {
			user: { ...req.session.user, userUniqueId: undefined },
		}),
		csrfToken: req.session.csrfToken,
	});
}

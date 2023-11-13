import { Request, Response } from 'express';

export const index = (req: Request, res: Response) => {
	res.status(200).json({
		message: 'Comfy Villas Backend Server Running Successfully',
	});
};

export default index;

import { Request, Response } from 'express';

export const index = (req: Request, res: Response) => {
	res.status(200).json({
		message: 'Backend Testing Server v2 Running Successfully',
	});
};

export default index;

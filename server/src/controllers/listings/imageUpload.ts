import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { Readable } from 'stream';
// Cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// Controller
export async function uploadPhotos(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		console.log('Request File:', req.file); // Debugging

		if (!req.file) {
			throw new Error('No file provided');
		}

		// ...
		// Upload the full image to Cloudinary
		const fullImageResult : any = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: 'images',
					format: 'jpg',
				},
				(error, result) => {
					if (error) {
						console.error('Error uploading full image:', error); // Debugging
						reject(error);
					} else {
						resolve(result);
					}
				}
			);

			if (req.file && req.file.buffer) {
				// Use the buffer to create a readable stream and pipe it to Cloudinary
				const bufferStream = new Readable();
				bufferStream.push(req.file.buffer);
				bufferStream.push(null); // End the stream

				bufferStream.pipe(stream);
			} else {
				reject(new Error('File buffer not available'));
			}
		});

		// Upload the thumbnail image to Cloudinary with cropping
		const thumbnailResult : any = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: 'thumbnails',
					format: 'jpg',
					transformation: [
						{ width: 360, height: 280, crop: 'fill' }, // Crop to 360x280
					],
				},
				(error, result) => {
					if (error) {
						console.error('Error uploading thumbnail image:', error); // Debugging
						reject(error);
					} else {
						resolve(result);
					}
				}
			);

			if (req.file && req.file.buffer) {
				// Use the buffer to create a readable stream and pipe it to Cloudinary
				const bufferStream = new Readable();
				bufferStream.push(req.file.buffer);
				bufferStream.push(null); // End the stream

				bufferStream.pipe(stream);
			} else {
				reject(new Error('File buffer not available'));
			}
		});
		// ...

		res.json({
			fullImage: fullImageResult?.url,
			thumbnail: thumbnailResult?.url,
		});
	} catch (err) {
		next(err);
	}
}

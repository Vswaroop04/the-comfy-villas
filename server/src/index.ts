import app from '@/setup';
import session from '@/utils/sessionStore';
import router from '@/routes/router';
import errorHandler from './middleware/errorHandler';
import prisma from './database/prismaClient';


// import {v2 as cloudinary} from 'cloudinary';
	// const result = await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", {
	// 	folder: "your_folder_name", // Optional: specify a folder name
	// 	// Optionally add other upload options (e.g., transformations)
	//   });
	//   console.log(result);

const port = process.env.PORT || 5000;

app.use(session);
app.use(router);
app.use(errorHandler);

async function main() {
	await prisma.$connect();
	console.log('Prisma Client successfully initialized and connected to the database.');
	app.listen(port, async () => {
		console.log(`The app listening on port ${port}`);
	});
}
main().catch((err) => console.log(err));

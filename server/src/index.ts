import app from '@/setup';
import session from '@/utils/sessionStore';
import router from '@/routes/router';
import errorHandler from './middleware/errorHandler';
import prisma from './database/prismaClient';

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

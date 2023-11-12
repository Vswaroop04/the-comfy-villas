import app from '@/setup';
import session from '@/utils/sessionStore';
import router from '@/routes/router';
import errorHandler from './middleware/errorHandler';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(session);
app.use(router);
app.use(errorHandler);

async function main() {
	const user = await prisma.user.create({
		data: { name: 'Vishnu', phone: 1245, email: 'vswaroop04f@gmail.com', type : 'user', password : 'vishnu2003' },
	});
	console.log(user);
	app.listen(port, async () => {
		console.log(`The app listening on port ${port}`);
	});
}
main().catch((err) => console.log(err));

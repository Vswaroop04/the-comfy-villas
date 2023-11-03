import redisClient from '@/database/redis';
import RedisStore from 'connect-redis';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const secretKey = process.env.SESSION_SECRET || 'secret';

export default session({
	store: new RedisStore({ client: redisClient, prefix: 'sess-' }),
	resave: false,
	saveUninitialized: false,
	secret: secretKey,
	proxy: true,
	name: 'session',
	rolling: true,
	cookie: {
		sameSite: 'none', // must be 'none' to enable cross-site delivery
		// sameSite: 'lax',
		secure: false,
		// secure: true,
		maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
		httpOnly: true,
	},
});

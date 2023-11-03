import { createClient } from 'redis';

const redisClient = createClient({
	url: process.env.REDIS_URL,
	socket: {
		reconnectStrategy(retries) {
			console.log('retries: ', retries);
			return Math.min(retries * 100, 3000);
		},
	},
})
	.on('connect', () => console.log('REDIS:connect', new Date().toJSON()))
	.on('ready', () => console.log('REDIS:ready', new Date().toJSON()))
	.on('error', (err) => console.error('REDIS:error', err, new Date().toJSON()));

redisClient
	.connect()
	.then(() => console.log('Redis Connected Successfully.'))
	.catch((err) => console.log('Redis Connection Failed: ', err));

redisClient.on('error', (err) => {
	console.log('Redis Error: ', err);
});

export default redisClient;

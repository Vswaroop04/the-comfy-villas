import { IncomingMessage } from 'http';

type SSRreq = IncomingMessage & {
	cookies: Partial<{
		[key: string]: string;
	}>;
};

export default SSRreq;

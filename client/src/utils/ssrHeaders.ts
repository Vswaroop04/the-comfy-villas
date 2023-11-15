import SSRreq from '@/types/SSRreq';

export default function SSRHeaders(req?: SSRreq, csrfToken?: string) {
	return typeof window === 'undefined'
		? {
				headers: {
					'X-SSR': '1',
					'Content-Type': 'application/json',
					...(req?.headers?.cookie && {
						cookie: req?.headers?.cookie,
					}),
					...(csrfToken && {
						'X-CSRF-Token': csrfToken,
					}),
				},
		  }
		: {
				headers: {
					'Content-Type': 'application/json',
				},
		  };
}

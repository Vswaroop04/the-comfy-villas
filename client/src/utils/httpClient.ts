interface RequestConfig extends RequestInit {
	url: string;
	method?: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';
	isCustomUrl?: boolean;
}

type SendRequestFunction = <T = any>(
	requestConfig: RequestConfig,
) => Promise<T>;

const httpClient: SendRequestFunction = async (requestConfig) => {
	const { url, isCustomUrl, ...reqConfig } = requestConfig;
	const response = await fetch(
		isCustomUrl ? url : `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
		{
			...reqConfig,
			credentials: isCustomUrl ? reqConfig.credentials : 'include',
			cache: reqConfig.cache || 'no-cache',
		},
	);
	const responseData = await response.json();

	if (!response.ok) {
		throw new Error(responseData?.error || responseData?.message);
	}

	return responseData;
};

export default httpClient;

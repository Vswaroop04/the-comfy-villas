import httpClient from '../../../utils/httpClient';
import SSRHeaders from '@/utils/ssrHeaders';
import TListingFilter, { TListingFilterWithID, TListingReturnFilter,TListingFilterWithSearchText } from '@/types/ListingFilter';
import SSRreq from '@/types/SSRreq';


export default async function 	getFilteredListings(
	filter: TListingFilter,
	req?: SSRreq,
	returnFilter?: TListingReturnFilter<'req'>,
): Promise<{
	data: TListingReturnFilter<'res'>[];
}> {
	const allFilters = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const responseData = await httpClient({
		url: `/listing/filter`,
		method: 'POST',
		...SSRHeaders(req),
		body: JSON.stringify(allFilters),
	});
	if (filter.page === 1) {
		return {
			data: responseData.data.listings,
		};
	} else {
		return {
			data: responseData.data.listings,
		};
	}
}

export async function getListingByID(
	filter: TListingFilterWithID,
	req?: SSRreq,
	returnFilter?: TListingReturnFilter<'req'>,
): Promise<
	TListingReturnFilter<'res'> & {
		bookingAmount: number;
	}
> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const responseData = await httpClient({
		url: `/listing/filter`,
		method: 'POST',
		...SSRHeaders(req),
		body: JSON.stringify(content),
	});
	return responseData.data;
}



export async function getSearchResults(
	filter: TListingFilterWithSearchText,
	returnFilter?: TListingReturnFilter<'req'>,
): Promise<{ data: TListingReturnFilter<'res'>[]; totalCount: number }> {
	const content = {
		filter,
		...(returnFilter && { returnFilter }),
	};
	const responseData = await httpClient({
		url: `/listing/filter`,
		method: 'POST',
		body: JSON.stringify(content),
	});
	return responseData.data;
}
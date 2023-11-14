import { RETURN_FILTER } from './_constants';
import validator from './_validator';
import prisma from '@/database/prismaClient';
import { NextFunction, Request, Response } from 'express';

async function filter(req: Request, res: Response, next: NextFunction) {
	try {
		let { filter, returnFilter } = validator.parse(req.body);
		if (!returnFilter) {
			returnFilter = RETURN_FILTER;
		}

		let { id, page, limit, searchText, sort } = filter;

		if (id) {
			// Fetch a single listing by ID
			const listing = await prisma.listing.findUnique({
				where: { id },
				select: returnFilter,
			});
			return res.json(listing);
		}

		// Build the where condition for searchText
		if (searchText) {
			const where = searchText ? { name: { contains: searchText } } : {};
			const listings = await prisma.listing.findMany({
				where,
				select: returnFilter,
			});
			return res.json(listings);
		}
		// Set default values for page and limit
		page = page || 1;
		limit = limit || 10;
		const skip = (page - 1) * limit;

		// Build the orderBy condition based on sort
		let orderBy = {};
		if (sort) {
			orderBy = {
				...(sort.price && { Price: sort.price === 1 ? 'asc' : 'desc' }),
				...(sort.date && { createdAt: sort.date === 1 ? 'asc' : 'desc' }),
			};
		}

		// Fetch listings with pagination, search, and sorting
		const listings = await prisma.listing.findMany({
			skip,
			take: limit,
			orderBy,
			select: returnFilter,
		});

		// Count the total number of listings matching the criteria
		const totalListingsCount = await prisma.listing.count({});

		const data = {
			...(page === 1 ? { listings, totalListingsCount } : listings),
		};
		// Return the listings along with the total count
		res.json({ data });
	} catch (err) {
		next(err);
	}
}

export default filter

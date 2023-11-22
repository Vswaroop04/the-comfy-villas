import { z } from 'zod';

const imageSchema = z.object({
	fullImageUrl: z.string(),
	thumbnailImageUrl: z.string(),
});
const imageEditSchema = z.object({
	id: z.string().optional(),
	fullImageUrl: z.string(),
	thumbnailImageUrl: z.string(),
});
export const addListingValidator = z.object({
	name: z.string(),
	images: z.array(imageSchema).min(0).max(3),
	beds: z.number(),
	bathrooms: z.number(),
	price: z.number(),
	amenities: z.array(z.string()),
	location: z.string(),
	// Assuming Ratings and Reviews are not directly added when creating a new listing
});

export const editListingValidator = z.object({
	id: z.string(),
	name: z.string().optional(),
	images: z.array(imageEditSchema).min(0).max(3),
	beds: z.number().optional(),
	bathrooms: z.number().optional(),
	price: z.number().optional(),
	amenities: z.array(z.string()).optional(),
	location: z.string().optional(),
	// Ratings and Reviews are likely handled separately and not directly editable
});

export const deleteListingValidator = z.object({
	id: z.string(),
});

export default z.object({
	filter: z.object({
		id: z.string().optional(),
		page: z.number().min(1).max(100).optional(),
		limit: z.number().min(1).max(100).optional(),
		searchText: z.string().optional(),
		sort: z
			.object({
				price: z.number().min(-1).max(1).optional(),
				date: z.number().min(-1).max(1).optional(),
			})
			.optional(),
	}),
	returnFilter: z
		.object({
			id: z.boolean().optional(),
			name: z.boolean().optional(),
			fullImageUrl: z.boolean().optional(),
			thumbnailImageUrl: z.boolean().optional(),
			beds: z.boolean().optional(),
			bathrooms: z.boolean().optional(),
			price: z.boolean().optional(),
			amenities: z.boolean().optional(),
			location: z.boolean().optional(),
			ratings: z.boolean().optional(),
			reviews: z.boolean().optional(),
			appointments: z.boolean().optional(),
		})
		.optional(),
});

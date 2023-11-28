import z from 'zod';

export const residentSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	phone: z.string(),
	listingId: z.string(),
});

export const deleteResidentSchema = z.object({
	email: z.string().email(),
});

export const validateReviewRatingData = z.object({
	listingId: z.string(),
	amenitiesRatings: z.number().optional(),
	managementRatings: z.number().optional(),
	serviceRatings: z.number().optional(),
	review: z.string().optional(),
});

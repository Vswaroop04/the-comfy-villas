import z from 'zod';

export const residentSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	phone: z.string(),
});

export const deleteResidentSchema = z.object({
	email: z.string().email(),
});

export const validateReviewRatingData = z.object({
	listingId: z.string(),
	amenitiesRatings: z.number(),
	managementRatings:  z.number(),
	serviceRatings:  z.number(),
	review: z.string().optional(),
});

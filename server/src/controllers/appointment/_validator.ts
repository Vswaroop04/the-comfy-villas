import { z } from 'zod';

export const createAppointmentValidator = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    listingId: z.string(),
  });
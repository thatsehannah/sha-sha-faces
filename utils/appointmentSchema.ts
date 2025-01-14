import { z } from 'zod';

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'name is too short, should be at least 4 characters.' })
    .max(50, {
      message: 'name is too long, should be less than 50 characters.',
    }),
  email: z.string().email({ message: 'invalid email address' }),
  phoneNumber: z.string().length(10, { message: 'invalid phone number' }),
  date: z.string().date(),
  time: z.string().time(),
  location: z.string(),
  service: z.string(),
  addtlDetails: z.string(),
});

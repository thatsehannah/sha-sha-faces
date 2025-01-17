import { z } from 'zod';

export const appointmentSchema = z.object({
  name: z
    .string({ required_error: 'Your name is required' })
    .min(4, { message: 'Name is too short, should be at least 4 characters.' })
    .max(50, {
      message: 'Name is too long, should be less than 50 characters.',
    }),
  email: z
    .string({ required_error: 'Your email is required' })
    .email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string({ required_error: 'Your phone number is required' })
    .length(10, { message: 'Invalid phone number' }),
  date: z.string({ required_error: 'Date not selected' }).date(),
  time: z.string({ required_error: 'Time not selected' }),
  location: z.string({ required_error: 'Your desired location is required' }),
  service: z.string({ required_error: 'Service not selected' }),
  discovery: z.string(),
  addtlDetails: z.string().optional(),
});

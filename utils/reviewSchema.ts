import { z } from 'zod';
import { Review } from './types';

export const reviewSchema = z.object({
  reviewer: z
    .string()
    .max(50, {
      message: 'Name is too long, should be less than 50 characters.',
    })
    .nonempty('Your name is required.'),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty('Your email is required'),
  service: z.string().nonempty('Service is not selected.'),
  rating: z.string().nonempty('Please select a rating.'),
  comment: z
    .string()
    .nonempty('Your review is required.')
    .min(10, { message: 'Your review is too short.' })
    .max(400, { message: 'Your review is too long.' }),
  wouldRecommend: z.boolean(),
});

export const validateAppointmentSchema = (data: Review) => {
  const result = reviewSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      'Please fix the above errors before submitting your review.'
    );
  }

  return result.data;
};

import { z } from 'zod';
import { Appointment } from './types';

export const appointmentSchema = z.object({
  name: z
    .string()
    .max(50, {
      message: 'Name is too long, should be less than 50 characters.',
    })
    .nonempty('Your name is required'),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty('Your email is required'),
  phoneNumber: z
    .string()
    .length(10, { message: 'Invalid phone number' })
    .nonempty('Your phone number is required'),
  date: z.string().date().nonempty('Please choose a time'),
  time: z.string().nonempty('Please select a time'),
  location: z.string().nonempty('Your desired location is required'),
  service: z.string().nonempty('Service is not selected'),
  discovery: z.string({ required_error: 'Please select a source' }),
  addtlDetails: z.string().optional(),
  isInstructionsAcknowledged: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please acknowledge that you've read the booking instructions",
    }),
});

export const validateAppointmentSchema = (data: Appointment) => {
  const result = appointmentSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      'Please fix the above errors before submitting your appointment request.'
    );
  }

  return result.data;
};

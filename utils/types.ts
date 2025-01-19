import { z } from 'zod';
import { appointmentSchema } from './appointmentSchema';

export type Appointment = {
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  service: string;
  addtlDetails?: string;
  location: string;
  discovery: string;
  isInstructionsAcknowledged: boolean;
};

export type AppointmentFormFields = keyof z.infer<typeof appointmentSchema>;

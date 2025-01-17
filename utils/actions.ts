import { validateAppointmentSchema } from './appointmentSchema';
import { logToServer } from './serverLog';
import { Appointment } from './types';

export const createAppointmentAction = (
  formData: Appointment
): { message: string; title: string; type: 'success' | 'error' } => {
  try {
    const result = validateAppointmentSchema(formData);
    //TODO: save to database once set up is complete
    logToServer(result);
    return {
      type: 'success',
      title: 'Success! ✅',
      message:
        'Appointment request sent! I will get back with you to confirm the details shortly.',
    };
  } catch (error) {
    return {
      type: 'error',
      title: 'Uh oh! ☹️',
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};

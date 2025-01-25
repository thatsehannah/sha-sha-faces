'use server';

import { validateAppointmentSchema } from './appointmentSchema';
import { Appointment } from './types';
import db from './db';
import { redirect } from 'next/navigation';

export const createAppointmentAction = async (
  formData: Appointment
): Promise<{
  message: string;
  title: string;
  type: 'success' | 'destructive';
}> => {
  try {
    const result = validateAppointmentSchema(formData);

    await db.appointment.create({
      data: {
        ...result,
        date: result.date.split('T')[0],
        addtlDetails: result.addtlDetails ? result.addtlDetails : '',
      },
    });

    return {
      type: 'success',
      title: 'Success! ✅',
      message:
        'Appointment request sent! I will get back with you to confirm the details shortly.',
    };
  } catch (error) {
    return {
      type: 'destructive',
      title: 'Uh oh! ☹️',
      message: error instanceof Error ? error.message : 'An error occurred.',
    };
  }
};

export const fetchAppointmentsByDate = async (date?: string) => {
  if (!date) {
    date = new Date().toISOString().split('T')[0];
  }

  const appointments = await db.appointment.findMany({
    where: {
      date: date,
      //TODO: add a switch in AdminAppointmentsPage to change from pending-confirmed-completed-canceled
      // status: 'Confirmed'
    },
  });

  return appointments;
};

export const fetchAllAppointments = async () => {
  return await db.appointment.findMany();
};

export const fetchAppointmentById = async (apptId: string) => {
  const appointment = await db.appointment.findFirst({
    where: {
      id: apptId,
    },
  });

  if (!appointment) {
    redirect('/admin/appointments');
  }

  return appointment;
};

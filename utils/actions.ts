'use server';

import { validateAppointmentSchema } from './appointmentSchema';
import { Appointment as NewAppointment } from './types';
import { Appointment } from '@prisma/client';
import db from './db';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';

export const createAppointmentAction = async (
  formData: NewAppointment
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

    revalidateTag('appointments');

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

export const fetchAllAppointments = async () => {
  const appointments = await db.appointment.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  revalidateTag('appointments');

  return appointments;
};

export const fetchAppointmentById = async (id: string) => {
  const appointment = await db.appointment.findFirst({
    where: {
      id,
    },
  });

  if (!appointment) {
    redirect('/admin/appointments');
  }

  return appointment;
};

export const updateAppointment = async (
  id: string,
  updates: Partial<Appointment>
): Promise<{
  message: string;
  title: string;
  type: 'success' | 'destructive';
}> => {
  try {
    await db.appointment.update({
      where: {
        id,
      },
      data: { ...updates },
    });

    revalidateTag('appointments');
    return {
      type: 'success',
      title: 'Success! ✅',
      message: 'Appointment updated 💋.',
    };
  } catch (error) {
    return {
      type: 'destructive',
      title: 'Uh oh! ☹️',
      message: error instanceof Error ? error.message : 'An error occurred.',
    };
  }
};

export const fetchAllServices = async () => {
  return db.service.findMany();
};

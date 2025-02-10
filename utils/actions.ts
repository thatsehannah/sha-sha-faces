'use server';

import { validateAppointmentSchema } from './appointmentSchema';
import {
  AppointmentWithService,
  EditAppointment,
  Appointment as NewAppointment,
  Review,
} from './types';
import { Prisma } from '@prisma/client';
import db from './db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { validateReviewSchema } from './reviewSchema';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

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
        service: {
          connect: { name: result.service },
        },
        addtlDetails: result.addtlDetails ? result.addtlDetails : '',
      },
    });

    // const adminMessage = {
    //   to: 'echannah631@gmail.com',
    //   from: 'echannah631@gmail.com',
    //   subject: 'New Appointment Request',
    //   text: `New appointment request from ${result.name}:\n\nService: ${
    //     result.service
    //   }\nDate: ${result.date}\nDetails: ${
    //     result.addtlDetails || 'No additional details provided.'
    //   }`,
    //   html: `<p>New appointment request from <strong>${
    //     result.name
    //   }</strong>:</p><ul><li><strong>Service:</strong> ${
    //     result.service
    //   }</li><li><strong>Date:</strong> ${
    //     result.date
    //   }</li><li><strong>Details:</strong> ${
    //     result.addtlDetails || 'No additional details provided.'
    //   }</li></ul>`,
    // };

    // await Promise.all([sgMail.send(adminMessage)]);

    revalidatePath('/admin');
    revalidatePath('/admin/appointments');

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

export const fetchAllAppointments = async (): Promise<
  AppointmentWithService[]
> => {
  return await db.appointment.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      service: true,
    },
  });
};

export const fetchAppointmentById = async (
  id: string
): Promise<AppointmentWithService> => {
  const appointment = await db.appointment.findFirst({
    where: {
      id,
    },
    include: {
      service: true,
    },
  });

  if (!appointment) {
    redirect('/admin/appointments');
  }

  return appointment;
};

export const fetchServiceInfo = async () => {
  const serviceNames = await db.service.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return serviceNames;
};

export const updateAppointment = async (
  id: string,
  updates: EditAppointment
): Promise<{
  message: string;
  title: string;
  type: 'success' | 'destructive';
}> => {
  try {
    const { service, ...otherUpdates } = updates;

    await db.appointment.update({
      where: {
        id,
      },
      data: {
        ...otherUpdates,
        ...(service && {
          service: {
            connect: {
              name: updates.service,
            },
          },
        }),
      },
    });

    revalidatePath('/admin');
    revalidatePath('/admin/appointments');
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

export const updateService = async (
  id: number,
  updates: Partial<Prisma.ServiceUpdateInput>
): Promise<{
  message: string;
  title: string;
  type: 'success' | 'destructive';
}> => {
  try {
    await db.service.update({
      where: {
        id,
      },
      data: updates,
    });

    revalidatePath('/');
    revalidatePath('/admin/services');
    revalidatePath('/services');

    return {
      type: 'success',
      title: 'Success! ✅',
      message: 'Service updated 💋.',
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

export const fetchServiceWithAppointments = async () => {
  const serviceWithAppointments = await db.service.findMany({
    include: { Appointment: true },
  });

  return serviceWithAppointments;
};

export const createReviewAction = async (
  formData: Review
): Promise<{
  message: string;
  title: string;
  type: 'success' | 'destructive';
}> => {
  try {
    const result = validateReviewSchema(formData);

    await db.review.create({
      data: {
        ...result,
        service: {
          connect: { name: result.service },
        },
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/info');

    return {
      type: 'success',
      title: 'Success! ✅',
      message: `Thank you for your review ${formData.reviewer}. Hope to see you again soon!`,
    };
  } catch (error) {
    return {
      type: 'destructive',
      title: 'Uh oh! ☹️',
      message: error instanceof Error ? error.message : 'An error occurred.',
    };
  }
};

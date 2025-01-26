import { Appointment as EditAppointment } from '@prisma/client';

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

export type AppointmentFormFields = keyof Appointment;
export type EditAppointmentFormFields = keyof EditAppointment;

export type Service = {
  name: string;
  price: number;
  duration: number;
  description: string;
  popular: boolean;
  svg: {
    // svgs from uxwing.com
    pathData: string;
    properties: {
      [key: string]: string | undefined;
    };
  };
};

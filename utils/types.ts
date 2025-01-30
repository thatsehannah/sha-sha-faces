import { Appointment as EditAppointment } from '@prisma/client';

//TODO: Add instagram property
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
  instagram: string;
};

export type AppointmentFormFields = keyof Appointment;
export type EditAppointmentFormFields = keyof EditAppointment;
export type ReviewFormFields = keyof Review;

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

export type Review = {
  reviewer: string;
  service: string;
  email: string;
  starCount: number;
  comment: string;
  wouldRecommend: boolean;
};

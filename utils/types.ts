import { Prisma } from '@prisma/client';

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

export type EditAppointment = {
  name: string;
  email: string;
  phoneNumber: string;
  service: string;
  location: string;
  time: string;
  status: string;
};

export type AppointmentFormFields = keyof Appointment;

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

export type ServiceSvg = {
  pathData: string;
  properties: {
    [key: string]: string | undefined;
  };
};

export type Review = {
  reviewer: string;
  service: string;
  email: string;
  rating: string;
  comment: string;
  wouldRecommend: boolean;
};

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: { service: true };
}>;

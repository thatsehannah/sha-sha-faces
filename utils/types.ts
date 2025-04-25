import { Prisma } from "@prisma/client";

export type Appointment = {
  id?: string;
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
  requiresTravel: boolean;
};

export type EditAppointment = {
  name: string;
  email: string;
  phoneNumber: string;
  service: string;
  location: string;
  time: string;
  status: string;
  completedOn: string;
  date: string;
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

export type ServiceWithAppointments = Prisma.ServiceGetPayload<{
  include: { Appointment: true };
}>[];

export type ReviewWithService = Prisma.ReviewGetPayload<{
  include: { service: true };
}>;

export type NewPhoto = {
  isFeatured: boolean;
  isShown: boolean;
  category: string;
  url: string;
  alt: string;
  file: File;
};

export type Availability = {
  day: string;
  isAvailable: boolean;
  from: string;
  to: string;
};

export type NewService = {
  name: string;
  price: string;
  duration: string;
  description: string;
  svgData: {
    // svgs from uxwing.com
    pathData: string;
    properties: {
      [key: string]: string | undefined;
    };
  };
};

export type FormNewService = {
  name: string;
  price: string;
  durationHours: string;
  durationMinutes: string;
  description: string;
  svgData?: JSON;
};

export type Faq = {
  question: string;
  answer: string;
};

export type BookingConfirmationEmailDetails = {
  name: string;
  serviceName: string;
  apptDate: string;
  apptTime: string;
  apptLocation: string;
};

export type NewTestimonialScreenshot = {
  url: string;
  alt: string;
  file: File;
};

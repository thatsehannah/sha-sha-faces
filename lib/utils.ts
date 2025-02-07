import { ServiceWithAppointments } from '@/utils/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { Service } from '@prisma/client';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isDateWithinTwoDays = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date();
  const appoinmentCreationDate = new Date(date);
  twoDaysAgo.setDate(today.getDate() - 2);

  return (
    appoinmentCreationDate >= twoDaysAgo && appoinmentCreationDate <= today
  );
};

export const calculatePopularService = () => {
  //TODO: get the number of appointments created for each service [{service: Service, appointmentCount: number}]
  //sort by appointmentCount descending, then take the first two from the array, then you have you popular services
};

const blah = (date: string) => {
  const dateMonth = date.split('-')[1];
  const result = parseInt(dateMonth);

  return result;
};

export const getServicesRequestedForCurrentMonth = (
  services: ServiceWithAppointments
) => {
  const currentMonth = new Date().getMonth() + 1;

  const servicesForMonth: any[] = [];

  services.forEach((service) => {
    service.Appointment.forEach((appt) => {
      if (blah(appt.date) === currentMonth) {
        servicesForMonth.push(service);
      }
    });
  });

  return servicesForMonth;
};

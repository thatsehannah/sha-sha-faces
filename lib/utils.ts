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

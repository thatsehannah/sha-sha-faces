import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import services from '@/utils/services.json';

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

export const getStatusClasses = () => {
  return "data-[status='Pending']:text-orange-400 data-[status='Confirmed']:text-blue-400 data-[status='Completed']:text-green-400 data-[status='Canceled']:text-red-400";
};

export const getServiceNames = () => {
  return services.map((service) => service.name);
};

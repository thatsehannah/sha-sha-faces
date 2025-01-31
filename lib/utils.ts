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

export const getStatusClasses = (status: string) => {
  const statusClasses: Record<string, string> = {
    Pending: 'text-orange-400',
    Confirmed: 'text-blue-400',
    Completed: 'text-green-400',
    Canceled: 'text-red-400',
  };

  return statusClasses[status];
};

export const getServiceNames = () => {
  return services.map((service) => service.name);
};

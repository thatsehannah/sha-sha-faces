import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

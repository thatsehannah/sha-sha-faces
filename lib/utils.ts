import { Availability } from "@/utils/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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

export const defaultAvailibility: Availability[] = [
  { day: "sunday", isAvailable: false, from: "", to: "" },
  { day: "monday", isAvailable: true, from: "9:00 AM", to: "5:00 PM" },
  { day: "tuesday", isAvailable: true, from: "9:00 AM", to: "5:00 PM" },
  { day: "wednesday", isAvailable: true, from: "9:00 AM", to: "5:00 PM" },
  { day: "thursday", isAvailable: true, from: "9:00 AM", to: "5:00 PM" },
  { day: "friday", isAvailable: true, from: "9:00 AM", to: "5:00 PM" },
  { day: "saturday", isAvailable: false, from: "", to: "" },
];

export const getAvailabilityTimeOptions = () => {
  const times: string[] = [];

  //morning times
  for (let i = 12; i <= 23; i++) {
    if (i === 12) {
      times.push(`${i}:00 AM`);
      for (let j = 15; j < 60; j += 15) {
        times.push(`${i}:${j} AM`);
      }
    } else {
      times.push(`${i - 12}:00 AM`);
      for (let j = 15; j < 60; j += 15) {
        times.push(`${i - 12}:${j} AM`);
      }
    }
  }

  // evening times
  for (let i = 12; i <= 23; i++) {
    if (i === 12) {
      times.push(`${i}:00 PM`);
      for (let j = 15; j < 60; j += 15) {
        times.push(`${i}:${j} PM`);
      }
    } else {
      times.push(`${i - 12}:00 PM`);
      for (let j = 15; j < 60; j += 15) {
        times.push(`${i - 12}:${j} PM`);
      }
    }
  }

  return times;
};

export const calculatePopularService = () => {
  //TODO: get the number of appointments created for each service [{service: Service, appointmentCount: number}]
  //sort by appointmentCount descending, then take the first two from the array, then you have you popular services
};

// const blah = (date: string) => {
//   const dateMonth = date.split('-')[1];
//   const result = parseInt(dateMonth);

//   return result;
// };

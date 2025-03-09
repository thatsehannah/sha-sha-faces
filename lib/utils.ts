import { fetchAppointmentsByDate } from "@/utils/actions";
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

// adds a unique identifier to subsequent times based on already reserved appointment time for selected date (e.g. if client selects a day where a full glam appointment (2 hrs) is already made for 12:00pm, times from 12:00pm to 3:00pm will be appended with a 'd' so it can be easily identified & disabled in the appointment form time dropdown)
export const blockOffAvailbilityTimeOptions = async (
  selectedDate: string,
  availableTimes: string[]
) => {
  const modifiedAvailableTimes = availableTimes;
  console.log(modifiedAvailableTimes);

  const appointments = await fetchAppointmentsByDate(selectedDate);

  appointments.forEach((appointment) => {
    const appointmentTime = appointment.time;
    const indexOfAppointmentTime =
      modifiedAvailableTimes.indexOf(appointmentTime);
    console.log(indexOfAppointmentTime);

    const appointmentExpectedDuration = parseInt(
      appointment.service.duration.split("")[0]
    );

    //multiplying by 4 since availableTimes are in 15 minute increments + adding 4 to give extra hour between completed appointment
    let indexOfLastBlockedOffTime =
      indexOfAppointmentTime + appointmentExpectedDuration * 4 + 4;

    if (indexOfLastBlockedOffTime > availableTimes.length - 1) {
      indexOfLastBlockedOffTime = availableTimes.length - 1;
    }

    for (let i = indexOfAppointmentTime; i <= indexOfLastBlockedOffTime; i++) {
      modifiedAvailableTimes[i] += "d";
    }
  });

  return modifiedAvailableTimes;
};

export const calculateReviewScore = (rating: string) => {
  switch (rating) {
    case "very-satisfied":
      return 5;
    case "satisfied":
      return 4;
    case "neutral":
      return 3;
    case "unsatisfied":
      return 2;
    default:
      return 1;
  }
};

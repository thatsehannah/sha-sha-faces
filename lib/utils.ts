import BookingConfirmationEmail from "@/components/emails/BookingConfirmationEmail";
import NewAppointmentEmail from "@/components/emails/NewAppointmentEmail";
import { fetchAppointmentsByDate } from "@/utils/actions";
import {
  AppointmentWithService,
  Availability,
  Appointment as NewAppointment,
} from "@/utils/types";
import { clsx, type ClassValue } from "clsx";
import { CreateEmailOptions, Resend } from "resend";
import { twMerge } from "tailwind-merge";
import { captureException } from "@sentry/nextjs";

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

  const appointments = await fetchAppointmentsByDate(selectedDate);

  appointments.forEach((appointment) => {
    const appointmentTime = appointment.time;
    const indexOfAppointmentTime =
      modifiedAvailableTimes.indexOf(appointmentTime);

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

export const sendBookingConfirmationEmail = async (
  appt: AppointmentWithService
) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  const senderEmail = process.env.SENDER_EMAIL as string;

  const message: CreateEmailOptions = {
    to: appt.email,
    from: senderEmail,
    subject: "Thank You For Booking With Sha Sha Faces",
    react: BookingConfirmationEmail({ appointmentDetails: appt }),
  };

  try {
    const { data } = await resend.emails.send(message);

    console.log(data?.id);
  } catch (error) {
    captureException(error);

    throw new Error(
      "An error occurred sending your confirmation email. No worries! We're going to figure this out and get back with you soon."
    );
  }
};

export const sendNewAppointmentEmail = async (newAppt: NewAppointment) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  const senderEmail = process.env.SENDER_EMAIL as string;
  const businessEmail = process.env.BUSINESS_EMAIL as string;

  const message: CreateEmailOptions = {
    to: businessEmail,
    from: senderEmail,
    subject: "New Appointment Booking",
    react: NewAppointmentEmail({ newAppointment: newAppt }),
  };

  try {
    const { data } = await resend.emails.send(message);

    console.log(data?.id);
  } catch (error) {
    captureException(error);

    throw new Error(
      "An error occurred. No worries! We're going to figure this out and get back with you soon."
    );
  }
};

export const chunkArray = <T>(array: T[], chunkSize: number) => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
};

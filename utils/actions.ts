"use server";

import {
  AppointmentWithService,
  Availability,
  EditAppointment,
  Appointment as NewAppointment,
  NewPhoto,
  NewService,
  Review,
} from "./types";
import { PortfolioPhoto, Prisma } from "@prisma/client";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { validateReviewSchema } from "./reviewSchema";
import { deletePhotoFromBucket } from "@/lib/supabase";
import {
  calculateReviewScore,
  defaultAvailibility,
  sendBookingConfirmationEmail,
  sendNewAppointmentEmail,
} from "@/lib/utils";

const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

export const createAppointmentAction = async (formData: NewAppointment) => {
  try {
    const newAppt = await db.appointment.create({
      data: {
        ...formData,
        service: {
          connect: { name: formData.service },
        },
        addtlDetails: formData.addtlDetails ? formData.addtlDetails : "",
      },
    });

    await sendNewAppointmentEmail({ id: newAppt.id, ...formData });
    await sendBookingConfirmationEmail(formData);

    revalidatePaths(["/admin", "/admin/appointments"]);

    return "Appointment request sent! I will get back with you to confirm the details shortly.";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred creating your appointment."
    );
  }
};

export const fetchAllAppointments = async (): Promise<
  AppointmentWithService[]
> => {
  return await db.appointment.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      service: true,
    },
  });
};

export const fetchAppointmentById = async (
  id: string
): Promise<AppointmentWithService> => {
  const appointment = await db.appointment.findFirst({
    where: {
      id,
    },
    include: {
      service: true,
    },
  });

  if (!appointment) {
    redirect("/admin/appointments");
  }

  return appointment;
};

export const fetchAppointmentsByDate = async (date: string) => {
  const appointments = await db.appointment.findMany({
    where: {
      date,
      OR: [
        {
          status: "Confirmed",
        },
        {
          status: "Pending",
        },
      ],
    },
    include: {
      service: true,
    },
  });

  return appointments;
};

export const fetchServiceInfo = async () => {
  const serviceNames = await db.service.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return serviceNames;
};

export const updateAppointment = async (
  id: string,
  updates: EditAppointment
) => {
  try {
    const { service, ...otherUpdates } = updates;

    await db.appointment.update({
      where: {
        id,
      },
      data: {
        ...otherUpdates,
        ...(service && {
          service: {
            connect: {
              name: updates.service,
            },
          },
        }),
      },
    });

    revalidatePaths(["/admin", "/admin/appointments"]);

    return "Appointment updated 💋.";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred updating this appointment."
    );
  }
};

export const createNewService = async (newService: NewService) => {
  try {
    await db.service.create({
      data: newService,
    });

    revalidatePaths(["/", "/services", "/admin/services"]);

    return "New service created 💋.";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred saving your service."
    );
  }
};

export const updateService = async (
  id: number,
  updates: Partial<Prisma.ServiceUpdateInput>
) => {
  try {
    await db.service.update({
      where: {
        id,
      },
      data: updates,
    });

    revalidatePaths(["/", "/admin/services", "/services"]);

    return "Service updated 💋.";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred updating your service."
    );
  }
};

export const fetchAllServices = async () => {
  return db.service.findMany();
};

export const fetchServiceWithAppointments = async () => {
  const serviceWithAppointments = await db.service.findMany({
    include: { Appointment: true },
  });

  return serviceWithAppointments;
};

export const fetchPopularServices = async () => {
  const serviceWithAppointments = await db.service.findMany({
    include: { Appointment: true },
  });

  const popularServices = serviceWithAppointments
    .filter((service) => service.Appointment.length > 0)
    .sort((a, b) => {
      return b.Appointment.length - a.Appointment.length;
    });

  if (popularServices.length < 3) {
    return serviceWithAppointments.slice(0, 3);
  }

  return popularServices.slice(0, 3);
};

export const createReviewAction = async (formData: Review) => {
  try {
    const result = validateReviewSchema(formData);
    const score = calculateReviewScore(result.rating);
    const isShown = score >= 3;

    await db.review.create({
      data: {
        ...result,
        score,
        isShown,
        service: {
          connect: { name: result.service },
        },
      },
    });

    revalidatePaths(["/", "/admin/info"]);

    return `Thank you for your review ${formData.reviewer}. Hope to see you again soon!`;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while saving your review."
    );
  }
};

export const fetchAllReviews = async () => {
  const reviews = await db.review.findMany({
    include: { service: true },
    orderBy: { createdAt: "desc" },
  });

  return reviews;
};

export const fetchViewableReviews = async () => {
  const reviews = await db.review.findMany({
    include: { service: true },
    where: {
      isShown: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const updateReviewVisibility = async (id: string, value: boolean) => {
  try {
    await db.review.update({
      where: {
        id,
      },
      data: {
        isShown: value,
      },
    });

    revalidatePaths(["/admin", "/reviews"]);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPhotos = async () => {
  return await db.portfolioPhoto.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchFeaturedPhotos = async () => {
  const featuredPhotos = await db.portfolioPhoto.findMany({
    where: {
      isFeatured: true,
    },
  });

  return featuredPhotos;
};

export const fetchBridalPhotos = async () => {
  const bridalPhotos = await db.portfolioPhoto.findMany({
    where: {
      category: "bridal",
      isShown: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bridalPhotos;
};

export const fetchGlamPhotos = async () => {
  const glamPhotos = await db.portfolioPhoto.findMany({
    where: {
      category: "glam",
      isShown: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return glamPhotos;
};

export const fetchPortfolioCategoryLength = async (category: string) => {
  const categoryPhotos = await db.portfolioPhoto.findMany({
    where: {
      category,
    },
  });

  return categoryPhotos.length;
};

export const updatePortfolioPhotoVisibility = async (
  id: string,
  key: string,
  value: boolean
) => {
  try {
    const update = { [key]: value };

    await db.portfolioPhoto.update({
      where: {
        id,
      },
      data: update,
    });

    revalidatePaths(["/portfolio", "/", "/admin/info"]);
  } catch (error) {
    console.log(error);
  }
};

export const updatePortfolioPhotoCategory = async (
  id: string,
  category: string
) => {
  try {
    await db.portfolioPhoto.update({
      where: {
        id,
      },
      data: {
        category,
      },
    });

    revalidatePaths(["/portfolio", "/", "/admin/info"]);
  } catch (error) {
    console.log(error);
  }
};

export const createNewPortfolioPhoto = async (photo: NewPhoto) => {
  try {
    await db.portfolioPhoto.create({
      data: {
        url: photo.url,
        isFeatured: photo.isFeatured,
        isShown: photo.isShown,
        category: photo.category,
        alt: photo.alt,
      },
    });
    revalidatePaths(["/", "/portfolio", "/admin/info"]);

    return "Photo uploaded";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while uploading your photo."
    );
  }
};

export const deletePortfolioPhoto = async (photo: PortfolioPhoto) => {
  try {
    const deletedPhoto = await db.portfolioPhoto.delete({
      where: {
        id: photo.id,
      },
    });

    deletePhotoFromBucket(deletedPhoto.url);

    revalidatePaths(["/", "/portfolio", "/admin/info"]);

    return "Photo deleted from portfolio";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while deleting your photo."
    );
  }
};

export const fetchWeeklyAvailability = async () => {
  const availability = await db.weeklyAvailability.findMany();

  if (availability.length === 0) {
    return defaultAvailibility;
  }

  return availability;
};

export const fetchAvailabilityForDay = async (day: string) => {
  const availability = await db.weeklyAvailability.findUnique({
    where: {
      day,
    },
  });

  return availability;
};

export const submitWeeklyAvailability = async (
  submittedAvailability: Availability[]
) => {
  try {
    submittedAvailability.forEach(async (submittedDay) => {
      const existingDayAvailability = await db.weeklyAvailability.findFirst({
        where: {
          day: submittedDay.day,
        },
      });

      // had a hard time understanding this, but !! converts the var into a boolean
      // (!!var means "if true")
      if (!!existingDayAvailability) {
        await db.weeklyAvailability.update({
          where: {
            day: submittedDay.day,
          },
          data: {
            isAvailable: submittedDay.isAvailable,
            from: submittedDay.from,
            to: submittedDay.to,
          },
        });
      } else {
        await db.weeklyAvailability.create({
          data: {
            day: submittedDay.day,
            from: submittedDay.from,
            to: submittedDay.to,
            isAvailable: submittedDay.isAvailable,
          },
        });
      }
    });

    revalidatePaths(["/contact", "/admin/info"]);

    return "Your availability has been updated!";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while updating your availability."
    );
  }
};

export const fetchBookingInstructions = async () => {
  try {
    const instructions = await db.bookingInstructions.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (instructions) return instructions;

    return [];
  } catch (error) {
    console.log(
      error instanceof Error
        ? error.message
        : "An error occurred fetching booking instructions"
    );
  }
};

export const createBookingInstruction = async (rule: string) => {
  try {
    await db.bookingInstructions.create({
      data: {
        rule,
      },
    });

    revalidatePaths(["/admin/manage-booking-inst", "/contact"]);

    return "Created rule for booking instructions.";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while updating your availability."
    );
  }
};

export const saveBookingInstruction = async (
  id: string,
  updatedRule: string
) => {
  try {
    await db.bookingInstructions.update({
      where: {
        id,
      },
      data: {
        rule: updatedRule,
      },
    });

    revalidatePaths(["/admin/manage-booking-inst", "/contact"]);

    return "Updated rule for booking instructions.";
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookingInstruction = async (id: string) => {
  try {
    await db.bookingInstructions.delete({
      where: {
        id,
      },
    });

    revalidatePaths(["/admin/manage-booking-inst", "/contact"]);

    return "Deleted rule from booking instructions.";
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while updating your availability."
    );
  }
};

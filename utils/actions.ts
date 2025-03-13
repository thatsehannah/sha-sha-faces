"use server";

import { validateAppointmentSchema } from "./appointmentSchema";
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
import sgMail from "@sendgrid/mail";
import { deletePhotoFromBucket } from "@/lib/supabase";
import { calculateReviewScore, defaultAvailibility } from "@/lib/utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

//TODO: Create a type for return object:{message: string;title: string;type: "success" | "destructive";}

//TODO: Move validateAppointmentSchema to AppointmentForm page
export const createAppointmentAction = async (
  formData: NewAppointment
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
  try {
    const result = validateAppointmentSchema(formData);

    await db.appointment.create({
      data: {
        ...result,
        service: {
          connect: { name: result.service },
        },
        addtlDetails: result.addtlDetails ? result.addtlDetails : "",
      },
    });

    // const adminMessage = {
    //   to: 'echannah631@gmail.com',
    //   from: 'echannah631@gmail.com',
    //   subject: 'New Appointment Request',
    //   text: `New appointment request from ${result.name}:\n\nService: ${
    //     result.service
    //   }\nDate: ${result.date}\nDetails: ${
    //     result.addtlDetails || 'No additional details provided.'
    //   }`,
    //   html: `<p>New appointment request from <strong>${
    //     result.name
    //   }</strong>:</p><ul><li><strong>Service:</strong> ${
    //     result.service
    //   }</li><li><strong>Date:</strong> ${
    //     result.date
    //   }</li><li><strong>Details:</strong> ${
    //     result.addtlDetails || 'No additional details provided.'
    //   }</li></ul>`,
    // };

    // await Promise.all([sgMail.send(adminMessage)]);

    revalidatePaths(["/admin", "/admin/appointments"]);

    return {
      type: "success",
      title: "Success! ✅",
      message:
        "Appointment request sent! I will get back with you to confirm the details shortly.",
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
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
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
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

    revalidatePath("/admin");
    revalidatePath("/admin/appointments");
    return {
      type: "success",
      title: "Success! ✅",
      message: "Appointment updated 💋.",
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
};

export const createNewService = async (
  newService: NewService
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
  try {
    await db.service.create({
      data: newService,
    });

    revalidatePaths(["/", "/services", "/admin/services"]);

    return {
      type: "success",
      title: "Success! ✅",
      message: "New service created 💋.",
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
};

export const updateService = async (
  id: number,
  updates: Partial<Prisma.ServiceUpdateInput>
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
  try {
    await db.service.update({
      where: {
        id,
      },
      data: updates,
    });

    revalidatePaths(["/", "/admin/services", "/services"]);

    return {
      type: "success",
      title: "Success! ✅",
      message: "Service updated 💋.",
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
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

export const createReviewAction = async (
  formData: Review
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
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

    revalidatePath("/");
    revalidatePath("/admin/info");

    return {
      type: "success",
      title: "Success! ✅",
      message: `Thank you for your review ${formData.reviewer}. Hope to see you again soon!`,
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
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

export const createNewPortfolioPhoto = async (
  photo: NewPhoto
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
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

    return {
      type: "success",
      title: "Success! ✅",
      message: "Photo uploaded",
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
};

export const deletePortfolioPhoto = async (
  photo: PortfolioPhoto
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
  try {
    const deletedPhoto = await db.portfolioPhoto.delete({
      where: {
        id: photo.id,
      },
    });

    deletePhotoFromBucket(deletedPhoto);

    revalidatePaths(["/", "/portfolio", "/admin/info"]);

    return { type: "success", title: "Success ✅", message: "Photo removed" };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh ☹️",
      message:
        error instanceof Error
          ? error.message
          : "An error occurred when deleting the photo",
    };
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
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
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

    return {
      type: "success",
      title: "Success! ✅",
      message: "Your availability has been updated!",
    };
  } catch (error) {
    return {
      type: "destructive",
      title: "Uh oh! ☹️",
      message: error instanceof Error ? error.message : "An error occurred.",
    };
  }
};

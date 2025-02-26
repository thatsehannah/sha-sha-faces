"use server";

import { validateAppointmentSchema } from "./appointmentSchema";
import {
  AppointmentWithService,
  Availability,
  EditAppointment,
  Appointment as NewAppointment,
  NewPhoto,
  Review,
} from "./types";
import { GalleryPhoto, Prisma } from "@prisma/client";
import db from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { validateReviewSchema } from "./reviewSchema";
import sgMail from "@sendgrid/mail";
import { deletePhotoFromBucket } from "@/lib/supabase";
import { defaultAvailibility } from "@/lib/utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

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

  const popularServices = serviceWithAppointments.filter(
    (service) => service.Appointment.length > 0
  );

  if (popularServices.length > 3) {
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

    await db.review.create({
      data: {
        ...result,
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

export const fetchAllPhotos = async () => {
  return await db.galleryPhoto.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchFeaturedPhotos = async () => {
  const featuredPhotos = await db.galleryPhoto.findMany({
    where: {
      isFeatured: true,
    },
  });

  return featuredPhotos;
};

export const fetchBridalPhotos = async () => {
  const bridalPhotos = await db.galleryPhoto.findMany({
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
  const glamPhotos = await db.galleryPhoto.findMany({
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

export const fetchGalleryCategoryLength = async (category: string) => {
  const categoryPhotos = await db.galleryPhoto.findMany({
    where: {
      category,
    },
  });

  return categoryPhotos.length;
};

export const updateGalleryPhotoVisibility = async (
  id: string,
  key: string,
  value: boolean
) => {
  try {
    const update = { [key]: value };

    await db.galleryPhoto.update({
      where: {
        id,
      },
      data: update,
    });

    revalidatePaths(["/gallery", "/", "/admin/info"]);
  } catch (error) {
    console.log(error);
  }
};

export const updateGalleryPhotoCategory = async (
  id: string,
  category: string
) => {
  try {
    await db.galleryPhoto.update({
      where: {
        id,
      },
      data: {
        category,
      },
    });

    revalidatePaths(["/gallery", "/", "/admin/info"]);
  } catch (error) {
    console.log(error);
  }
};

export const createNewGalleryPhoto = async (
  photo: NewPhoto
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
  try {
    await db.galleryPhoto.create({
      data: {
        url: photo.url,
        isFeatured: photo.isFeatured,
        isShown: photo.isShown,
        category: photo.category,
        alt: photo.alt,
      },
    });
    revalidatePaths(["/", "/gallery", "/admin/info"]);

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

export const deleteGalleryPhoto = async (
  photo: GalleryPhoto
): Promise<{
  message: string;
  title: string;
  type: "success" | "destructive";
}> => {
  try {
    const deletedPhoto = await db.galleryPhoto.delete({
      where: {
        id: photo.id,
      },
    });

    deletePhotoFromBucket(deletedPhoto);

    revalidatePaths(["/", "/gallery", "/admin/info"]);

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

      console.log(!!existingDayAvailability);

      // had a hard time understanding this, but !! converts the var into a boolean
      // (!!var means "if true")
      if (!!existingDayAvailability) {
        console.log("Updating", submittedDay.day);
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
        console.log("Creating", submittedDay.day);
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

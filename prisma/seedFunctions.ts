import { PrismaClient } from "@prisma/client";
import { allBookingInstructions } from "./allBookingInstructions";
import { allPhotos } from "./allPhotos";
import { allServices } from "./allServices";

const prisma = new PrismaClient();

export const seedBookingInstructions = async () => {
  for (const instruction of allBookingInstructions) {
    await prisma.bookingInstructions.create({
      data: instruction,
    });
  }
};

export const seedPhotos = async () => {
  for (const photo of allPhotos) {
    await prisma.portfolioPhoto.create({
      data: photo,
    });
  }
};

export const seedServices = async () => {
  for (const service of allServices) {
    await prisma.service.create({
      data: service,
    });
  }
};

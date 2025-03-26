import { PrismaClient } from "@prisma/client";
import { bookingInstructionsSeed } from "./bookingInstructionsSeed";
import { photoSeed } from "./photoSeed";
import { serviceSeed } from "./serviceSeed";
import { reviewSeed } from "./reviewSeed";

const prisma = new PrismaClient();

export const seedBookingInstructions = async () => {
  for (const instruction of bookingInstructionsSeed) {
    await prisma.bookingInstructions.create({
      data: instruction,
    });
  }
};

export const seedPhotos = async () => {
  for (const photo of photoSeed) {
    await prisma.portfolioPhoto.create({
      data: photo,
    });
  }
};

export const seedServices = async () => {
  for (const service of serviceSeed) {
    await prisma.service.create({
      data: service,
    });
  }
};

export const seedReviews = async () => {
  for (const review of reviewSeed) {
    await prisma.review.create({
      data: {
        ...review,
        score: 5,
        isShown: true,
        service: { connect: { name: review.service } },
      },
    });
  }
};

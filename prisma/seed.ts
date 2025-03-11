import { PrismaClient } from "@prisma/client";
import {
  seedBookingInstructions,
  // seedPhotos,
  seedServices,
} from "./seedFunctions";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Looks like you need to seed your database AGAIN...");

  // await seedPhotos();
  // console.log("Photos seeded.");

  await seedServices();
  console.log("Services seeded.");

  await seedBookingInstructions();
  console.log("Booking instructions seeded.");

  console.log("Seeding complete!");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

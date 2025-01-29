import { PrismaClient } from '@prisma/client';
import services from './services.json';

const prisma = new PrismaClient();

const main = async () => {
  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
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

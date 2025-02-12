import { PrismaClient } from '@prisma/client';
import { allPhotos } from './allPhotos';

const prisma = new PrismaClient();

const main = async () => {
  for (const photo of allPhotos) {
    await prisma.galleryPhoto.create({
      data: photo,
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

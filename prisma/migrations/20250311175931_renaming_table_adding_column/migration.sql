/*
  Warnings:

  - You are about to drop the `GalleryPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GalleryPhoto";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "requiresTravel" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PortfolioPhoto" (
    "id" TEXT NOT NULL,
    "isShown" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioPhoto_pkey" PRIMARY KEY ("id")
);

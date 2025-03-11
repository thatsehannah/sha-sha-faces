/*
  Warnings:

  - You are about to drop the `GalleryPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GalleryPhoto";

-- CreateTable
CREATE TABLE "BookingInstructions" (
    "id" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingInstructions_pkey" PRIMARY KEY ("id")
);

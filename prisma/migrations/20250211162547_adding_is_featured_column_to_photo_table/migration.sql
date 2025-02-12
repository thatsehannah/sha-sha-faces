/*
  Warnings:

  - Added the required column `isFeatured` to the `GalleryPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GalleryPhoto" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL,
ALTER COLUMN "category" SET DATA TYPE TEXT;

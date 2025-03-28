/*
  Warnings:

  - You are about to drop the column `newPrice` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "newPrice",
ALTER COLUMN "price" SET DATA TYPE TEXT;

/*
  Warnings:

  - You are about to drop the column `service` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `popular` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "service",
ADD COLUMN     "serviceId" INTEGER NOT NULL,
ALTER COLUMN "instagram" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "popular",
ALTER COLUMN "svgData" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

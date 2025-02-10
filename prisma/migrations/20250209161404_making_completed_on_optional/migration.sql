-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "completedOn" DROP NOT NULL,
ALTER COLUMN "completedOn" DROP DEFAULT;

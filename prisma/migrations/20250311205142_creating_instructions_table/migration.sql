-- CreateTable
CREATE TABLE "BookingInstructions" (
    "id" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingInstructions_pkey" PRIMARY KEY ("id")
);

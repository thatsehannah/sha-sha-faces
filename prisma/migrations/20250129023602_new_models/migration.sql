-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "addtlDetails" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "discovery" TEXT NOT NULL,
    "isInstructionsAcknowledged" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isSale" BOOLEAN NOT NULL DEFAULT false,
    "salePrice" INTEGER NOT NULL DEFAULT 0,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "popular" BOOLEAN NOT NULL,
    "svgUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "starCount" INTEGER NOT NULL,
    "reviewer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "wouldRecommend" BOOLEAN NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

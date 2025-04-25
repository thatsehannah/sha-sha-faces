-- CreateTable
CREATE TABLE "TestimonialScreenshot" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestimonialScreenshot_pkey" PRIMARY KEY ("id")
);

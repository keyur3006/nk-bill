-- CreateTable
CREATE TABLE "Bottle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bottle_pkey" PRIMARY KEY ("id")
);

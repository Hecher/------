-- CreateEnum
CREATE TYPE "ComplexType" AS ENUM ('MOBILE', 'STATIC');

-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT[],
    "secondName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Dtp" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateAndTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addr" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Dtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complex" (
    "id" SERIAL NOT NULL,
    "complexType" "ComplexType" NOT NULL DEFAULT 'STATIC',
    "startingTime" TIMESTAMP(3) NOT NULL,
    "endingTime" TIMESTAMP(3) NOT NULL,
    "addr" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Complex_pkey" PRIMARY KEY ("id")
);

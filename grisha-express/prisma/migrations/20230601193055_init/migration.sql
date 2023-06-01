/*
  Warnings:

  - You are about to drop the column `class` on the `Dtp` table. All the data in the column will be lost.
  - Added the required column `class1` to the `Dtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dtp" DROP COLUMN "class",
ADD COLUMN     "class1" TEXT NOT NULL;

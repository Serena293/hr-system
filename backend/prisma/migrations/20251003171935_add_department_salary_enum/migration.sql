/*
  Warnings:

  - You are about to drop the column `salry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "salry",
ADD COLUMN     "salary" INTEGER;

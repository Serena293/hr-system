-- CreateEnum
CREATE TYPE "Department" AS ENUM ('HR', 'FINANCE', 'ENGINEERING', 'MARKETING');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" "Department",
ADD COLUMN     "salry" INTEGER;

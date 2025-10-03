/*
  Warnings:

  - The values [FRONTEND,BACKEND] on the enum `JobTitle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobTitle_new" AS ENUM ('FRONTEND_DEVELOPER', 'BACKEND_DEVELOPER', 'FULLSTACK_DEVELOPER');
ALTER TABLE "User" ALTER COLUMN "jobTitle" TYPE "JobTitle_new" USING ("jobTitle"::text::"JobTitle_new");
ALTER TYPE "JobTitle" RENAME TO "JobTitle_old";
ALTER TYPE "JobTitle_new" RENAME TO "JobTitle";
DROP TYPE "public"."JobTitle_old";
COMMIT;

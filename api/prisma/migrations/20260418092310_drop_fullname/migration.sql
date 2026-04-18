/*
  Warnings:

  - You are about to drop the column `fullname` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "fullname",
ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "about" DROP DEFAULT,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "avatar" DROP DEFAULT;

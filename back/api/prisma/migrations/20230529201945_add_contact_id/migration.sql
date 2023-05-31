/*
  Warnings:

  - Added the required column `id` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");

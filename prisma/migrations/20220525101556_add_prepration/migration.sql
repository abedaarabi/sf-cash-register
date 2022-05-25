/*
  Warnings:

  - Added the required column `preparation` to the `Drinks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Drinks` ADD COLUMN `preparation` VARCHAR(191) NOT NULL;

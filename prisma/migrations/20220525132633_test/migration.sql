/*
  Warnings:

  - You are about to drop the column `testing` on the `Drinks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Drinks` DROP COLUMN `testing`,
    ADD COLUMN `preparation` VARCHAR(191) NOT NULL DEFAULT '';

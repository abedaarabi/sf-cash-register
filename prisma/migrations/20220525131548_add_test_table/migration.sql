/*
  Warnings:

  - You are about to drop the column `preparation` on the `Drinks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Drinks` DROP COLUMN `preparation`,
    ADD COLUMN `testing` VARCHAR(191) NOT NULL DEFAULT '';

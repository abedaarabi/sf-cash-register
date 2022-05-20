/*
  Warnings:

  - The primary key for the `Drinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Drinks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Drinks` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Drinks_id_key` ON `Drinks`(`id`);

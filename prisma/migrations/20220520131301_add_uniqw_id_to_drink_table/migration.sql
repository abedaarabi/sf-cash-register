/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Drinks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Drinks_id_key` ON `Drinks`(`id`);

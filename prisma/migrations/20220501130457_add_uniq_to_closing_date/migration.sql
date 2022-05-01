/*
  Warnings:

  - A unique constraint covering the columns `[closingDate]` on the table `DailyReport` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `DailyReport` MODIFY `mobile_pay` DECIMAL(15, 2) NULL,
    MODIFY `invoices` DECIMAL(15, 2) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `DailyReport_closingDate_key` ON `DailyReport`(`closingDate`);

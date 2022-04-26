/*
  Warnings:

  - You are about to alter the column `card_28` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `card_43` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `mobile_pay` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `invoices` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `one_thousand_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `five_hundred_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `two_hundred_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `one_hundred_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `fifty_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `twenty_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `ten_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `five_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `two_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `one_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `half_kr` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `productSales` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `other` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `cashOut` on the `DailyReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `DailyReport` MODIFY `card_28` DECIMAL(15, 2) NOT NULL,
    MODIFY `card_43` DECIMAL(15, 2) NOT NULL,
    MODIFY `mobile_pay` DECIMAL(15, 2) NOT NULL,
    MODIFY `invoices` DECIMAL(15, 2) NOT NULL,
    MODIFY `one_thousand_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `five_hundred_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `two_hundred_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `one_hundred_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `fifty_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `twenty_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `ten_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `five_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `two_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `one_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `half_kr` DECIMAL(15, 2) NOT NULL,
    MODIFY `productSales` DECIMAL(15, 2) NOT NULL,
    MODIFY `other` DECIMAL(15, 2) NOT NULL,
    MODIFY `cashOut` DECIMAL(15, 2) NOT NULL;

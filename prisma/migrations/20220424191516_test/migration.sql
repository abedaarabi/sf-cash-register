-- CreateTable
CREATE TABLE `Employe` (
    `id` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employe_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DailyReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeId` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `update_by` VARCHAR(191) NOT NULL,
    `close_by` VARCHAR(191) NOT NULL,
    `card_28` DECIMAL(65, 30) NOT NULL,
    `card_43` DECIMAL(65, 30) NOT NULL,
    `mobile_pay` DECIMAL(65, 30) NOT NULL,
    `invoices` DECIMAL(65, 30) NOT NULL,
    `one_thousand_kr` DECIMAL(65, 30) NOT NULL,
    `five_hundred_kr` DECIMAL(65, 30) NOT NULL,
    `two_hundred_kr` DECIMAL(65, 30) NOT NULL,
    `one_hundred_kr` DECIMAL(65, 30) NOT NULL,
    `fifty_kr` DECIMAL(65, 30) NOT NULL,
    `twenty_kr` DECIMAL(65, 30) NOT NULL,
    `ten_kr` DECIMAL(65, 30) NOT NULL,
    `five_kr` DECIMAL(65, 30) NOT NULL,
    `two_kr` DECIMAL(65, 30) NOT NULL,
    `one_kr` DECIMAL(65, 30) NOT NULL,
    `half_kr` DECIMAL(65, 30) NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `productSales` DECIMAL(65, 30) NOT NULL,
    `other` DECIMAL(65, 30) NOT NULL,
    `closingDate` VARCHAR(191) NOT NULL,
    `Date` VARCHAR(191) NOT NULL,
    `Time` VARCHAR(191) NOT NULL,
    `cashOut` DECIMAL(65, 30) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DailyReport_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DailyReport` ADD CONSTRAINT `DailyReport_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

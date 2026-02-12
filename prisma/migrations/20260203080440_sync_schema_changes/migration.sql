/*
  Warnings:

  - The primary key for the `bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `dateSlotId` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `date_slots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `date_slots` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `timeSlotId` on the `date_slots` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `serviceId` on the `date_slots` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `service_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `service_categories` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `service_feature_maps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `service_feature_maps` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `serviceId` on the `service_feature_maps` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `featureId` on the `service_feature_maps` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `service_features` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `service_features` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `services` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `serviceCategoryId` on the `services` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `time_slots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `time_slots` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_dateSlotId_fkey`;

-- DropForeignKey
ALTER TABLE `date_slots` DROP FOREIGN KEY `date_slots_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `date_slots` DROP FOREIGN KEY `date_slots_timeSlotId_fkey`;

-- DropForeignKey
ALTER TABLE `service_feature_maps` DROP FOREIGN KEY `service_feature_maps_featureId_fkey`;

-- DropForeignKey
ALTER TABLE `service_feature_maps` DROP FOREIGN KEY `service_feature_maps_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `services_serviceCategoryId_fkey`;

-- DropIndex
DROP INDEX `date_slots_serviceId_fkey` ON `date_slots`;

-- DropIndex
DROP INDEX `date_slots_timeSlotId_fkey` ON `date_slots`;

-- AlterTable
ALTER TABLE `bookings` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `dateSlotId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `date_slots` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `timeSlotId` INTEGER NOT NULL,
    MODIFY `serviceId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service_categories` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service_feature_maps` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `serviceId` INTEGER NOT NULL,
    MODIFY `featureId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service_features` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `services` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `serviceCategoryId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `time_slots` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `banned` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
-- CreateIndex
-- CREATE INDEX `account_userId_idx` ON `account`(`userId`(191));

-- CreateIndex
-- CREATE INDEX `session_userId_idx` ON `session`(`userId`(191));

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_serviceCategoryId_fkey` FOREIGN KEY (`serviceCategoryId`) REFERENCES `service_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_feature_maps` ADD CONSTRAINT `service_feature_maps_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_feature_maps` ADD CONSTRAINT `service_feature_maps_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `service_features`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `date_slots` ADD CONSTRAINT `date_slots_timeSlotId_fkey` FOREIGN KEY (`timeSlotId`) REFERENCES `time_slots`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `date_slots` ADD CONSTRAINT `date_slots_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_dateSlotId_fkey` FOREIGN KEY (`dateSlotId`) REFERENCES `date_slots`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

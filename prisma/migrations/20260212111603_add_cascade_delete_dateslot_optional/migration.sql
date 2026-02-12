-- DropForeignKey
ALTER TABLE `date_slots` DROP FOREIGN KEY `date_slots_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `date_slots` DROP FOREIGN KEY `date_slots_timeSlotId_fkey`;

-- AlterTable
ALTER TABLE `date_slots` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `date_slots` ADD CONSTRAINT `date_slots_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `date_slots` ADD CONSTRAINT `date_slots_timeSlotId_fkey` FOREIGN KEY (`timeSlotId`) REFERENCES `time_slots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

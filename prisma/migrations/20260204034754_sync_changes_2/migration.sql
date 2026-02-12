-- DropForeignKey
ALTER TABLE `service_feature_maps` DROP FOREIGN KEY `service_feature_maps_featureId_fkey`;

-- DropForeignKey
ALTER TABLE `service_feature_maps` DROP FOREIGN KEY `service_feature_maps_serviceId_fkey`;

-- AddForeignKey
ALTER TABLE `service_feature_maps` ADD CONSTRAINT `service_feature_maps_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_feature_maps` ADD CONSTRAINT `service_feature_maps_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `service_features`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

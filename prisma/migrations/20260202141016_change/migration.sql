-- AlterTable
ALTER TABLE `users` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- CreateIndex
-- CREATE INDEX `account_userId_idx` ON `account`(`userId`(191));

-- CreateIndex
-- CREATE INDEX `session_userId_idx` ON `session`(`userId`(191));

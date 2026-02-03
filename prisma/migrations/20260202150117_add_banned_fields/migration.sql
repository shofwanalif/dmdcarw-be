-- AlterTable
ALTER TABLE `users` ADD COLUMN `banned` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `account_userId_idx` ON `account`(`userId`(191));

-- CreateIndex
CREATE INDEX `session_userId_idx` ON `session`(`userId`(191));

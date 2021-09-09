/*
  Warnings:

  - You are about to drop the `UsersOnProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UsersOnProjects` DROP FOREIGN KEY `usersonprojects_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UsersOnProjects` DROP FOREIGN KEY `usersonprojects_ibfk_2`;

-- DropTable
DROP TABLE `UsersOnProjects`;

-- CreateTable
CREATE TABLE `_user_projects` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_user_projects_AB_unique`(`A`, `B`),
    INDEX `_user_projects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_user_projects` ADD FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user_projects` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

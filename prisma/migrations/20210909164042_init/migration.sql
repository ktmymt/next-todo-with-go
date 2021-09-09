/*
  Warnings:

  - Added the required column `role` to the `UsersOnProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UsersOnProjects` ADD COLUMN `role` ENUM('OWNER', 'MEMBER') NOT NULL;

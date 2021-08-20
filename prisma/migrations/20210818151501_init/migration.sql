/*
  Warnings:

  - Made the column `isDone` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Todo` MODIFY `isDone` BOOLEAN NOT NULL DEFAULT false;

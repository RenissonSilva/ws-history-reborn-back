/*
  Warnings:

  - You are about to alter the column `price` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `price` INTEGER NOT NULL;

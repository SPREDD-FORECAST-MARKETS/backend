/*
  Warnings:

  - You are about to alter the column `noVolume` on the `MarketPriceSnapshot` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `yesVolume` on the `MarketPriceSnapshot` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - Added the required column `totalVolume` to the `MarketPriceSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MarketPriceSnapshot" ADD COLUMN     "totalVolume" BIGINT NOT NULL,
ALTER COLUMN "noVolume" SET DATA TYPE BIGINT,
ALTER COLUMN "yesVolume" SET DATA TYPE BIGINT;

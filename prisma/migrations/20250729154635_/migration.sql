/*
  Warnings:

  - You are about to drop the column `noVolume` on the `MarketPriceSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `yesVolume` on the `MarketPriceSnapshot` table. All the data in the column will be lost.
  - Added the required column `noOdds` to the `MarketPriceSnapshot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yesOdds` to the `MarketPriceSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MarketPriceSnapshot" DROP COLUMN "noVolume",
DROP COLUMN "yesVolume",
ADD COLUMN     "noOdds" BIGINT NOT NULL,
ADD COLUMN     "yesOdds" BIGINT NOT NULL;

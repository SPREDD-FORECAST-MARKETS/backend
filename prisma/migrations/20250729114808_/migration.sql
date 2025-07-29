/*
  Warnings:

  - The primary key for the `MarketPriceSnapshot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "MarketPriceSnapshot_marketId_timestamp_key";

-- AlterTable
ALTER TABLE "MarketPriceSnapshot" DROP CONSTRAINT "MarketPriceSnapshot_pkey",
ADD CONSTRAINT "MarketPriceSnapshot_pkey" PRIMARY KEY ("id", "timestamp");

-- CreateIndex
CREATE INDEX "MarketPriceSnapshot_marketId_timestamp_idx" ON "MarketPriceSnapshot"("marketId", "timestamp");

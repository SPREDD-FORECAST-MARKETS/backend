/*
  Warnings:

  - A unique constraint covering the columns `[marketId,timestamp]` on the table `MarketPriceSnapshot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MarketPriceSnapshot_id_timestamp_key";

-- DropIndex
DROP INDEX "MarketPriceSnapshot_marketId_timestamp_idx";

-- CreateIndex
CREATE UNIQUE INDEX "MarketPriceSnapshot_marketId_timestamp_key" ON "MarketPriceSnapshot"("marketId", "timestamp");

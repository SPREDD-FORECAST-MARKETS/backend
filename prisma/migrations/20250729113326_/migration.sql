/*
  Warnings:

  - A unique constraint covering the columns `[id,timestamp]` on the table `MarketPriceSnapshot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MarketPriceSnapshot_id_timestamp_key" ON "MarketPriceSnapshot"("id", "timestamp");

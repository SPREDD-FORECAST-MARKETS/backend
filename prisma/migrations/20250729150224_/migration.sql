/*
  Warnings:

  - The primary key for the `MarketPriceSnapshot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MarketPriceSnapshot" DROP CONSTRAINT "MarketPriceSnapshot_pkey",
ADD CONSTRAINT "MarketPriceSnapshot_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "MarketPriceSnapshot_timestamp_idx" ON "MarketPriceSnapshot"("timestamp");

/*
  Warnings:

  - You are about to drop the column `noPrice` on the `MarketPriceSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `yesPrice` on the `MarketPriceSnapshot` table. All the data in the column will be lost.
  - Added the required column `noVolume` to the `MarketPriceSnapshot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yesVolume` to the `MarketPriceSnapshot` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `marketId` on the `MarketPriceSnapshot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MarketPriceSnapshot" DROP COLUMN "noPrice",
DROP COLUMN "yesPrice",
ADD COLUMN     "noVolume" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yesVolume" DOUBLE PRECISION NOT NULL,
DROP COLUMN "marketId",
ADD COLUMN     "marketId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "MarketPriceSnapshot_marketId_timestamp_idx" ON "MarketPriceSnapshot"("marketId", "timestamp");

-- AddForeignKey
ALTER TABLE "MarketPriceSnapshot" ADD CONSTRAINT "MarketPriceSnapshot_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

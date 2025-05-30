/*
  Warnings:

  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CLOSED');

-- CreateEnum
CREATE TYPE "EventOption" AS ENUM ('OPTION_A', 'OPTION_B');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BUY', 'SELL');

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "outcomeWon" INTEGER,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "Vote";

-- CreateTable
CREATE TABLE "Outcome" (
    "id" SERIAL NOT NULL,
    "outcome_title" TEXT NOT NULL,
    "current_supply" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_liquidity" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "marketID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenAllocation" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "outcomeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "order_type" "OrderType" NOT NULL DEFAULT 'BUY',
    "order_size" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "afterPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "marketID" INTEGER,
    "outcomeId" INTEGER,
    "userID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenAllocation_userId_outcomeId_key" ON "TokenAllocation"("userId", "outcomeId");

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_marketID_fkey" FOREIGN KEY ("marketID") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenAllocation" ADD CONSTRAINT "TokenAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenAllocation" ADD CONSTRAINT "TokenAllocation_outcomeId_fkey" FOREIGN KEY ("outcomeId") REFERENCES "Outcome"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_marketID_fkey" FOREIGN KEY ("marketID") REFERENCES "Market"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_outcomeId_fkey" FOREIGN KEY ("outcomeId") REFERENCES "Outcome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "isResolved" BOOLEAN DEFAULT false,
ADD COLUMN     "marketId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "winningOutcome" TEXT;

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "resolution_criteria" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '';

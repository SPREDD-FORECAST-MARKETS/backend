-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'VOTERS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "profile_pic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_address_key" ON "User"("wallet_address");

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

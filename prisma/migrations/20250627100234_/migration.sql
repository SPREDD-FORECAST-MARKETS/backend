-- CreateEnum
CREATE TYPE "PointType" AS ENUM ('CREATOR', 'TRADER');

-- CreateTable
CREATE TABLE "LeaderBoard" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER,
    "pointType" "PointType" NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LeaderBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

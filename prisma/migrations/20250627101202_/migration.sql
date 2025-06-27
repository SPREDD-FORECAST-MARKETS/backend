/*
  Warnings:

  - A unique constraint covering the columns `[userID,pointType]` on the table `LeaderBoard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LeaderBoard_userID_pointType_key" ON "LeaderBoard"("userID", "pointType");

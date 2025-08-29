-- CreateTable
CREATE TABLE "public"."Creator" (
    "id" SERIAL NOT NULL,
    "twitter_username" TEXT NOT NULL,
    "twitter_name" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_twitter_username_key" ON "public"."Creator"("twitter_username");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_position_key" ON "public"."Creator"("position");

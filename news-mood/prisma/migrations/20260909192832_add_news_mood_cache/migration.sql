-- CreateTable
CREATE TABLE "NewsMoodCache" (
    "id" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsMoodCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsMoodCache_newsId_mood_key" ON "NewsMoodCache"("newsId", "mood");

-- AddForeignKey
ALTER TABLE "NewsMoodCache" ADD CONSTRAINT "NewsMoodCache_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

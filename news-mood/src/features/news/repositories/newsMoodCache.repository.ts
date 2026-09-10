import { prisma } from "@/shared/lib";

export const newsMoodCacheRepository = {
  async findByNewsIdAndMood(newsId: string, mood: string) {
    return prisma.newsMoodCache.findUnique({
      where: { newsId_mood: { newsId, mood } },
    });
  },

  async upsert(newsId: string, mood: string, content: string) {
    return prisma.newsMoodCache.upsert({
      where: { newsId_mood: { newsId, mood } },
      create: { newsId, mood, content },
      update: { content },
    });
  },
};

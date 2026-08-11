import { prisma } from "@/shared/lib";
import type { News } from "../types";

export const newsRepository = {
  async createMany(news: News[]) {
    return prisma.news.createMany({
      data: news.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        sourceName: item.sourceName,
        sourceUrl: item.sourceUrl,
        articleUrl: item.articleUrl,
        imageUrl: item.imageUrl,
        publishedAt: item.publishedAt,
      })),
      skipDuplicates: true,
    });
  },

  async findAll() {
    return prisma.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.news.findUnique({
      where: { id },
    });
  },
};

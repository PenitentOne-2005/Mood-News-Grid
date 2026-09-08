import type { Mood } from "@/features/news/types";
import { newsRepository } from "@/features/news/repositories";
import { guardianService } from "../guardianService";

export const newsService = {
  async importNews() {
    const news = await guardianService.getLatestNews();

    if (!news.length) {
      return {
        imported: 0,
      };
    }

    const result = await newsRepository.createMany(news);

    return {
      imported: result.count,
    };
  },

  async getNews() {
    return newsRepository.findAll();
  },

  async getNewsById(id: string) {
    return newsRepository.findById(id);
  },

  async generateMood(newsId: string, mood: Mood) {
    const response = await fetch("/api/news/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newsId,
        mood,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Не удалось сгенерировать эмоциональную версию.",
      );
    }

    if (!result.content) {
      throw new Error("EMPTY_CONTENT");
    }

    return result.content;
  },
};

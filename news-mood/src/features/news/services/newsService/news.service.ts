import { newsRepository } from "../../repositories";
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
};

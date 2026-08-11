import type { News } from "../types";

export const newsApi = {
  async getNews(): Promise<News[]> {
    const response = await fetch("/api/news");

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    return response.json();
  },

  async getNewsById(id: string): Promise<News> {
    const response = await fetch(`/api/news/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    return response.json();
  },
};

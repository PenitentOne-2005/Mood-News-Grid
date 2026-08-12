import type { GuardianArticle } from "@/features/news/types";
import { guardianMapper } from "@/features/news/mappers";

export const guardianService = {
  async getLatestNews() {
    const params = new URLSearchParams({
      "api-key": process.env.GUARDIAN_API_KEY!,
      "show-fields": "bodyText,thumbnail",
      "page-size": "20",
      type: "article",
      "order-by": "newest",
    });

    const response = await fetch(`${process.env.GUARDIAN_API_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch news from The Guardian");
    }

    const data = await response.json();

    const articles: GuardianArticle[] = data.response.results;

    return articles
      .filter((article) => {
        const title = article.webTitle.toLowerCase();

        return (
          !title.includes("first thing") &&
          !title.includes("liveblog") &&
          !title.includes("techscape")
        );
      })
      .slice(0, 10)
      .map(guardianMapper.toNews);
  },
};

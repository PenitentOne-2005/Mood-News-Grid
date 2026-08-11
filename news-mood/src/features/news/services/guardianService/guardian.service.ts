import type { GuardianArticle } from "../../types";
import { guardianMapper } from "../../mappers";

const GUARDIAN_API_URL = "https://content.guardianapis.com/search";

export const guardianService = {
  async getLatestNews() {
    const params = new URLSearchParams({
      "api-key": process.env.GUARDIAN_API_KEY!,
      "show-fields": "bodyText,thumbnail",
      "page-size": "20",
      type: "article",
      "order-by": "newest",
    });

    const response = await fetch(`${GUARDIAN_API_URL}?${params}`);

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

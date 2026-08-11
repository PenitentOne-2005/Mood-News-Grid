import type { GuardianArticle, News } from "../types";
import { createDescription } from "../utils";

export const guardianMapper = {
  toNews(article: GuardianArticle): News {
    return {
      id: article.id,
      title: article.webTitle.trim(),
      description: createDescription(article.fields?.bodyText ?? ""),
      content: article.fields?.bodyText ?? "",

      sourceName: "The Guardian",
      sourceUrl: "https://www.theguardian.com",
      articleUrl: article.webUrl,

      imageUrl: article.fields?.thumbnail ?? null,
      publishedAt: new Date(article.webPublicationDate),
    };
  },
};

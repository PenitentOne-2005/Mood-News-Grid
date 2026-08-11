import { notFound } from "next/navigation";
import type { NewsDetailPageProps } from "./interface";
import { NewsDetails, newsService } from "@/features/news";

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
  const { id } = await params;

  const newsId = id.join("/");

  const news = await newsService.getNewsById(newsId);

  if (!news) {
    notFound();
  }

  return <NewsDetails news={news} />;
};

export default NewsDetailPage;

import { News, newsService } from "@/features/news";

const NewsPage = async () => {
  const news = await newsService.getNews();

  return <News news={news} />;
};

export default NewsPage;

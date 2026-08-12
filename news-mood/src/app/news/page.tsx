import { News, newsService } from "@/features/news";

const NewsPage = async () => {
  let news = await newsService.getNews();

  if (news.length === 0) {
    const result = await newsService.importNews();

    if (result.imported > 0) {
      news = await newsService.getNews();
    }
  }

  return <News news={news} />;
};

export default NewsPage;

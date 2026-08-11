export interface News {
  id: string;
  title: string;
  description: string | null;
  content: string;

  sourceName: string;
  sourceUrl: string;
  articleUrl: string;

  imageUrl: string | null;
  publishedAt: Date;
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionName: string;
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  fields?: {
    thumbnail?: string;
    bodyText?: string;
  };
}

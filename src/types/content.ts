export interface Content {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  category: string;
}

export interface ContentResponse {
  data: Content[];
  nextPage: number;
  hasMore: boolean;
}

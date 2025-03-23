import { ContentResponse } from "@/types/content";
import { mockContentsMap } from "./mock/content";

export const fetchContents = async (
  category: string,
  page: number = 1,
  pageSize: number = 10
): Promise<ContentResponse> => {
  return new Promise((resolve) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const categoryContents = mockContentsMap[category] || [];
    const paginatedContents = categoryContents.slice(start, end);

    setTimeout(() => {
      resolve({
        data: paginatedContents,
        nextPage: page + 1,
        hasMore: end < categoryContents.length,
      });
    }, 300);
  });
};

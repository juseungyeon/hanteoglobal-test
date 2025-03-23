import { Content } from "@/types/content";

const generateMockContents = (
  category: string,
  count: number = 20
): Content[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${category} 콘텐츠 ${i + 1}`,
    imageUrl: `/item.jpg`,
    link: "#",
    category,
  }));
};

export const mockContentsMap: Record<string, Content[]> = {
  차트: generateMockContents("차트"),
  Whook: generateMockContents("Whook"),
  이벤트: generateMockContents("이벤트"),
  뉴스: generateMockContents("뉴스"),
  스토어: generateMockContents("스토어"),
  충전소: generateMockContents("충전소"),
};

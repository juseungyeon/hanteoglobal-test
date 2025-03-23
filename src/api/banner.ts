import { Banner } from "@/types/banner";
import { mockBanners } from "./mock/banner";

export const fetchBanners = async (): Promise<Banner[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBanners), 300);
  });
};

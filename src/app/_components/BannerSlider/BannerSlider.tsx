"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchBanners } from "@/api/banner";
import { Banner } from "@/types/banner";
import styles from "./BannerSlider.module.scss";

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchBanners();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  if (loading) {
    return (
      <div className={styles.bannerWrapper}>
        <div className={styles.skeletonBanner}>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonSubtitle}></div>
          </div>
        </div>
        <div className={styles.skeletonPagination}>
          <div className={styles.skeletonBullet}></div>
          <div className={styles.skeletonBullet}></div>
          <div className={styles.skeletonBullet}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bannerWrapper}>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={16}
        centeredSlides={true}
        pagination={{
          clickable: true,
          el: ".banner-pagination",
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={styles.mySwiper}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <a
              href={banner.link}
              className={styles.bannerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={styles.bannerItem}
                style={{ backgroundImage: `url(${banner.imageUrl})` }}
              >
                <div className={styles.bannerContent}>
                  <h2 className={styles.title}>{banner.title}</h2>
                  <h3 className={styles.subtitle}>{banner.subtitle}</h3>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`banner-pagination ${styles.pagination}`}></div>
    </div>
  );
}

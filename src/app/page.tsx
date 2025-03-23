"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperType } from "swiper";
import styles from "./page.module.scss";
import TabMenu from "./_components/TabMenu/TabMenu";
import BannerSlider from "./_components/BannerSlider/BannerSlider";
import ContentList from "./_components/ContentList/ContentList";
import Footer from "./_components/Footer/Footer";

const tabs = ["차트", "Whook", "이벤트", "뉴스", "스토어", "충전소"];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperType>(null);

  // 탭 변경 핸들러
  const handleTabChange = (index: number) => {
    setActiveTab(index);

    // 스와이퍼 슬라이드 이동
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className={styles.main}>
      <main>
        {/* 상단 탭 메뉴 - 고정 */}
        <TabMenu
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* 배너 영역 - 모든 탭에서 공통 */}
        <BannerSlider />

        {/* 콘텐츠 영역만 스와이프로 전환 */}
        <Swiper
          className={styles.contentSwiper}
          initialSlide={activeTab}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
          spaceBetween={0}
          slidesPerView={1}
        >
          {tabs.map((tab, index) => (
            <SwiperSlide key={index}>
              <ContentList category={tab} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
      <Footer />
    </div>
  );
}

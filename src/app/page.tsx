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
  const mainRef = useRef<HTMLDivElement>(null);

  // 탭 변경 핸들러
  const handleTabChange = (index: number) => {
    setActiveTab(index);

    // 스와이퍼 슬라이드 이동
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }

    // 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0 });
  };

  // 슬라이드 변경 시에도 스크롤 위치 초기화
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveTab(swiper.activeIndex);

    // 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={styles.main} ref={mainRef}>
      {/* 상단 탭 메뉴 - 고정 */}
      <TabMenu
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <main>
        {/* 배너 영역 - 모든 탭에서 공통 */}
        <BannerSlider />

        {/* 콘텐츠 영역만 스와이프로 전환 */}
        <Swiper
          className={styles.contentSwiper}
          initialSlide={activeTab}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
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

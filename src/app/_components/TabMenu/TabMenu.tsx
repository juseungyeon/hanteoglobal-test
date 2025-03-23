"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./TabMenu.module.scss";

interface TabMenuProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function TabMenu({
  tabs,
  activeTab,
  onTabChange,
}: TabMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [clickedTab, setClickedTab] = useState<number | null>(null);
  const moveThreshold = 5; // 드래그 vs 클릭 구분을 위한 임계값 (픽셀)

  // 활성 탭이 변경될 때 부드럽게 스크롤
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const activeTabElement = container.children[activeTab] as HTMLElement;

    if (activeTabElement) {
      const containerWidth = container.clientWidth;
      const tabLeft = activeTabElement.offsetLeft;
      const tabWidth = activeTabElement.clientWidth;

      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(false); // 시작할 때는 드래그 아님
    setStartX(e.pageX);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !startX) return;

    const moveX = Math.abs(e.pageX - startX);

    // 일정 거리 이상 움직였을 때만 드래그로 간주
    if (moveX > moveThreshold) {
      setIsDragging(true);
      const x = e.pageX;
      const walk = startX - x;
      containerRef.current.scrollLeft = scrollLeft + walk;
    }
  };

  const handleMouseUp = () => {
    // 드래그 중이 아니었고, 탭을 클릭했다면 탭 변경
    if (!isDragging && clickedTab !== null) {
      onTabChange(clickedTab);
    }

    setStartX(0);
    setClickedTab(null);
  };

  // 탭 클릭 시작 핸들러
  const handleTabMouseDown = (index: number, e: React.MouseEvent) => {
    setClickedTab(index);
    handleMouseDown(e);
  };

  return (
    <div
      className={styles.tabMenuContainer}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${
            activeTab === index ? styles.activeTab : ""
          }`}
          onMouseDown={(e) => handleTabMouseDown(index, e)}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

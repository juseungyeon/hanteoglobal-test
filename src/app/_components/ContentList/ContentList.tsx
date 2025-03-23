"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import ContentItem from "./ContentItem";
import { fetchContents } from "@/api/content";
import styles from "./ContentList.module.scss";

interface ContentListProps {
  category: string;
}

export default function ContentList({ category }: ContentListProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["contents", category],
      queryFn: ({ pageParam = 1 }) => fetchContents(category, pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.nextPage : undefined;
      },
      initialPageParam: 1,
    });

  // 무한 스크롤을 위한 Intersection Observer 설정
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver]);

  return (
    <div className={styles.contentListContainer}>
      <h2 className={styles.title}>{category}</h2>

      {status === "pending" ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : status === "error" ? (
        <div className={styles.error}>에러가 발생했습니다.</div>
      ) : (
        <>
          <div className={styles.contentList}>
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((item) => (
                  <ContentItem key={item.id} item={item} />
                ))}
              </React.Fragment>
            ))}
          </div>

          <div ref={loadMoreRef} className={styles.loadMore}>
            {isFetchingNextPage && (
              <div className={styles.loadingMore}>더 불러오는 중...</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

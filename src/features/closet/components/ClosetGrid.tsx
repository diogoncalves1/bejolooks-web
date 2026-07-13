"use client";

import { useEffect, useRef } from "react";
import { ClosetItemCard, ClosetItemCardSkeleton } from "./ClosetItemCard";
import { EmptyState } from "./EmptyState";
import type { ClosetItem } from "../types";

interface ClosetGridProps {
  items: ClosetItem[];
  /** true durante o carregamento inicial (mostra skeletons no lugar do grid) */
  isLoading: boolean;
  /** true enquanto se carrega a página seguinte (scroll infinito) */
  isLoadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  /** true quando o armário como um todo não tem items (independentemente do filtro) */
  isWardrobeEmpty: boolean;
  onClearFilter: () => void;
}

const SKELETON_COUNT = 10;

export function ClosetGrid({
  items,
  isLoading,
  isLoadingMore,
  hasMore,
  onLoadMore,
  isWardrobeEmpty,
  onClearFilter,
}: ClosetGridProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Scroll infinito: assim que o sentinel entra no viewport, pede a próxima página.
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isLoading, hasMore, onLoadMore]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ClosetItemCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        isWardrobeEmpty={isWardrobeEmpty}
        onClearFilter={isWardrobeEmpty ? undefined : onClearFilter}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <ClosetItemCard key={item.id} item={item} />
        ))}
        {isLoadingMore &&
          Array.from({ length: 5 }).map((_, i) => (
            <ClosetItemCardSkeleton key={`more-${i}`} />
          ))}
      </div>

      {/* Sentinel invisível que despoleta o carregamento da página seguinte */}
      {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />}
    </>
  );
}

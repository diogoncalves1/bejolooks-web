"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { fetchClosetItems } from "@/features/closet/api";
import { PAGE_SIZE } from "@/features/closet/constants";
import { CategoryFilter } from "@/features/closet/components/CategoryFilter";
import { ClosetGrid } from "@/features/closet/components/ClosetGrid";
import type { CategoryFilterValue, ClosetItem } from "@/features/closet/types";

export default function ClosetPage() {
  const [items, setItems] = useState<ClosetItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterValue>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Carrega os items do armário (mock, por agora)
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setError(null);
      try {
        const data = await fetchClosetItems();
        if (isMounted) setItems(data);
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar o teu armário.");
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  // Repõe a paginação sempre que o filtro muda
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory]);

  const counts = useMemo(() => {
    const acc: Partial<Record<CategoryFilterValue, number>> = {};
    for (const item of items ?? []) {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
    }
    return acc;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    // pequeno delay para simular paginação de rede
    setTimeout(() => {
      setVisibleCount((count) => count + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 400);
  }, []);

  const isInitialLoading = items === null && !error;

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            O meu armário
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items
              ? `${items.length} ${items.length === 1 ? "peça" : "peças"} no total`
              : "A carregar as tuas peças..."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold underline underline-offset-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Tentar novamente
          </button>
        </div>
      )}

      {!error && (
        <>
          {/* Filtro por categoria — escondido se o armário estiver vazio */}
          {(isInitialLoading || (items && items.length > 0)) && (
            <div className="mb-6">
              <CategoryFilter
                counts={counts}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          )}

          <ClosetGrid
            items={visibleItems}
            isLoading={isInitialLoading}
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            isWardrobeEmpty={!isInitialLoading && (items?.length ?? 0) === 0}
            onClearFilter={() => setSelectedCategory("all")}
          />
        </>
      )}
    </main>
  );
}

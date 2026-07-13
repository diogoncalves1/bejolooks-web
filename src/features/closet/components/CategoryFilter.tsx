"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, CLOSET_CATEGORIES } from "../constants";
import type { CategoryFilterValue } from "../types";

interface CategoryFilterProps {
  /** Nº de items por categoria (para mostrar o contador em cada pill). */
  counts: Partial<Record<CategoryFilterValue, number>>;
  selected: CategoryFilterValue;
  onSelect: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ counts, selected, onSelect }: CategoryFilterProps) {
  const total = Object.values(counts).reduce((sum, n) => sum + (n ?? 0), 0);

  return (
    <div
      role="tablist"
      aria-label="Filtrar por categoria"
      className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <FilterPill
        label="Tudo"
        count={total}
        active={selected === "all"}
        onClick={() => onSelect("all")}
      />
      {CLOSET_CATEGORIES.map((category) => (
        <FilterPill
          key={category}
          label={CATEGORY_LABELS[category]}
          count={counts[category] ?? 0}
          active={selected === category}
          onClick={() => onSelect(category)}
        />
      ))}
    </div>
  );
}

interface FilterPillProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, count, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
        active
          ? "border-primary bg-primary text-foreground"
          : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-xs font-bold",
          active ? "bg-foreground/10" : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    </button>
  );
}

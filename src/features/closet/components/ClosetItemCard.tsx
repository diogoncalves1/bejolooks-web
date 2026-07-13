import Image from "next/image";
import { CATEGORY_LABELS } from "../constants";
import type { ClosetItem } from "../types";

interface ClosetItemCardProps {
  item: ClosetItem;
}

export function ClosetItemCard({ item }: ClosetItemCardProps) {
  return (
    <article className="group flex flex-col gap-2.5">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 px-0.5">
        <span className="w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground">
          {CATEGORY_LABELS[item.category]}
        </span>
        <h3 className="truncate text-sm font-semibold text-foreground">
          {item.name}
        </h3>
      </div>
    </article>
  );
}

export function ClosetItemCardSkeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="aspect-[3/4] w-full animate-pulse rounded-2xl bg-muted" />
      <div className="flex flex-col gap-1.5 px-0.5">
        <div className="h-4 w-16 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

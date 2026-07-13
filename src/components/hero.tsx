import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Star } from "lucide-react";

const stats = [
  { value: "48K+", label: "Outfits Created" },
  { value: "12K+", label: "Active Users" },
  { value: "300+", label: "Brands" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Top accent strip */}
      <div className="h-1 w-full bg-primary" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 pt-14 pb-0 md:pt-20">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2">
          {/* Left: text content */}
          <div className="flex flex-col gap-7 pb-14 md:pb-20 animate-fade-in-up">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Flame className="h-3 w-3 fill-primary" aria-hidden="true" />
                Trending Now
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Star
                  className="h-3 w-3 fill-primary text-primary"
                  aria-hidden="true"
                />
                <Star
                  className="h-3 w-3 fill-primary text-primary"
                  aria-hidden="true"
                />
                <Star
                  className="h-3 w-3 fill-primary text-primary"
                  aria-hidden="true"
                />
                <Star
                  className="h-3 w-3 fill-primary text-primary"
                  aria-hidden="true"
                />
                <Star
                  className="h-3 w-3 fill-primary text-primary"
                  aria-hidden="true"
                />
                <span className="ml-1">4.9 on App Store</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-6xl font-bold leading-[1.05] text-balance text-foreground md:text-7xl lg:text-8xl">
              Your Style.{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-primary">Your Rules.</span>
              </span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Build fire outfits, discover streetwear drops, and flex your look
              to a community of fashion-forward creators. BejoLooks is the app
              your closet has been waiting for.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Browse Looks
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 border-t border-border pt-7">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-0.5 ${i !== 0 ? "border-l border-border pl-8" : ""}`}
                >
                  <span className="font-serif text-2xl font-bold text-foreground">
                    {s.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image flush to bottom */}
          <div className="relative animate-fade-in-up animation-delay-200">
            {/* Floating pill — trending tag */}
            <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-dark/90 backdrop-blur px-4 py-2 shadow-lg">
              <span
                className="h-2 w-2 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-dark-foreground">
                Live: 230 styling now
              </span>
            </div>

            {/* Floating card — top pick */}
            <div className="absolute right-6 top-1/3 z-10 rounded-2xl bg-white/90 backdrop-blur-sm border border-border px-4 py-3 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">
                Top Pick
              </p>
              <p className="text-sm font-bold text-foreground">
                Urban Cargo Look
              </p>
              <p className="text-xs text-muted-foreground">
                +2.4K saves this week
              </p>
            </div>

            <div className="relative h-[500px] w-full overflow-hidden rounded-t-3xl md:h-[580px] lg:h-[640px]">
              <Image
                src="/hero-outfit.png"
                alt="Young person in a stylish streetwear outfit on BejoLooks"
                fill
                priority
                className="object-cover object-top"
              />
              {/* Bottom gradient fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

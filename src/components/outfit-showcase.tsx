import Image from "next/image";
import { TrendingUp, Users, Sparkles, Zap } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "AI Style Picks",
    desc: "Personalised outfit suggestions based on your taste and the latest trends.",
  },
  {
    icon: TrendingUp,
    title: "Trend Reports",
    desc: "Weekly drops of the hottest looks from streets around the world.",
  },
  {
    icon: Users,
    title: "Community Drops",
    desc: "Share your fits, get saves, and build your style following.",
  },
  {
    icon: Zap,
    title: "Instant Saves",
    desc: "Bookmark any outfit in one tap and remix it any time.",
  },
];

export default function OutfitShowcase() {
  return (
    <section className="bg-dark text-dark-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-last lg:order-first">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/outfit-collage.png"
                alt="Three friends in stylish streetwear outfits in an urban setting"
                width={640}
                height={500}
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-primary px-5 py-3.5 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/70 mb-0.5">
                This Week
              </p>
              <p className="font-serif text-2xl font-bold text-foreground">
                +6.2K Looks Shared
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="w-fit rounded-full bg-dark-foreground/10 border border-dark-foreground/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-dark-foreground">
                For The Culture
              </span>
              <h2 className="font-serif text-4xl font-bold leading-tight text-balance text-dark-foreground md:text-5xl">
                Style Is a <span className="text-primary">Sport.</span>
                <br />
                Play to Win.
              </h2>
              <p className="text-sm leading-relaxed text-dark-foreground/70 max-w-md">
                BejoLooks gives you the tools, the community, and the
                inspiration to level up your wardrobe game — every single day.
              </p>
            </div>

            <ul
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              aria-label="App highlights"
            >
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex flex-col gap-2 rounded-2xl bg-dark-foreground/10 border border-dark-foreground/10 p-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                      <Icon
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm font-bold text-dark-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs leading-relaxed text-dark-foreground/60">
                      {item.desc}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

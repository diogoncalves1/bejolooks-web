import { Wand2, Compass, ShirtIcon } from "lucide-react";

const features = [
  {
    icon: Wand2,
    tag: "Mix & Match",
    title: "Build Any Outfit",
    description:
      "Drag, drop, and layer pieces from your closet. Experiment with wild combos and lock in your signature look — no limits.",
    bg: "bg-primary",
    textColor: "text-foreground",
    iconWrapBg: "bg-foreground/10",
    iconColor: "text-foreground",
    tagColor: "bg-foreground/15 text-foreground",
  },
  {
    icon: Compass,
    tag: "Trending Now",
    title: "Discover What's Hot",
    description:
      "AI-powered style drops, community picks, and weekly trend reports. Never miss a wave — stay three steps ahead.",
    bg: "bg-dark",
    textColor: "text-dark-foreground",
    iconWrapBg: "bg-primary/20",
    iconColor: "text-primary",
    tagColor: "bg-primary/20 text-primary",
  },
  {
    icon: ShirtIcon,
    tag: "Smart Wardrobe",
    title: "Own Your Closet",
    description:
      "Digitise every piece, filter by vibe, season, or colour. Know exactly what you own and what you need next.",
    bg: "bg-secondary",
    textColor: "text-foreground",
    iconWrapBg: "bg-foreground/10",
    iconColor: "text-foreground",
    tagColor: "bg-foreground/10 text-foreground",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-5 py-20 md:py-28"
      aria-labelledby="features-heading"
    >
      {/* Section header */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full bg-primary/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            What We Offer
          </span>
          <h2
            id="features-heading"
            className="font-serif text-4xl font-bold text-balance text-foreground md:text-5xl"
          >
            Built for the <span className="text-primary">Next Generation</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
          Three powerful tools, one slick app — everything a modern style
          enthusiast needs.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className={`group relative flex flex-col gap-6 rounded-3xl p-8 transition-transform hover:-translate-y-1 hover:shadow-lg ${feature.bg}`}
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconWrapBg} ${feature.iconColor}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              {/* Tag */}
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${feature.tagColor}`}
              >
                {feature.tag}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-2 mt-auto">
                <h3
                  className={`font-serif text-2xl font-bold ${feature.textColor}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed opacity-70 ${feature.textColor}`}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

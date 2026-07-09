import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export default function CtaSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-5 py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center md:px-16 md:py-24">
        {/* Decorative background shapes */}
        <div
          aria-hidden="true"
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-foreground/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-foreground/10"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-foreground/20"
        />

        <div className="relative flex flex-col items-center gap-8">
          {/* Icon badge */}
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/10 border border-foreground/20">
            <Zap className="h-8 w-8 text-foreground fill-foreground" aria-hidden="true" />
          </span>

          <h2
            id="cta-heading"
            className="font-serif text-4xl font-bold text-balance text-foreground md:text-5xl lg:text-6xl"
          >
            Stop Overthinking.
            <br />
            Start Dripping.
          </h2>

          <p className="max-w-md text-base leading-relaxed text-foreground/75">
            Join 12,000+ style enthusiasts who already create, share, and discover incredible outfits daily
            on BejoLooks. It&apos;s free. It&apos;s fire.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/30 px-8 py-4 text-sm font-bold text-foreground transition-colors hover:border-foreground"
            >
              Explore Looks
            </Link>
          </div>

          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
            No credit card required &middot; Free forever plan
          </p>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { Zap } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'My Closet', href: '/closet' },
    { label: 'My Outfits', href: '/outfits' },
    { label: 'Explore', href: '/explore' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground border-t border-accent-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Zap className="h-5 w-5 text-foreground fill-foreground" aria-hidden="true" />
              </span>
              <span className="font-serif text-xl font-bold text-accent-foreground">
                bejo<span className="text-primary">looks</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-accent-foreground/60">
              Your style hub for creating fire outfits, discovering streetwear, and building your fashion identity.
            </p>
            {/* App badges placeholder */}
            <div className="flex gap-2">
              <div className="rounded-xl border border-accent-foreground/20 px-3.5 py-2 text-xs font-bold text-accent-foreground/60 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                App Store
              </div>
              <div className="rounded-xl border border-accent-foreground/20 px-3.5 py-2 text-xs font-bold text-accent-foreground/60 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                Google Play
              </div>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} aria-label={`${group} links`}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-foreground/40">
                {group}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-accent-foreground/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-accent-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-accent-foreground/40">
            &copy; {new Date().getFullYear()} BejoLooks. All rights reserved.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-accent-foreground/40">
            Dress Different. Live Loud.
          </p>
        </div>
      </div>
    </footer>
  )
}

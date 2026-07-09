'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Features', href: '/features' },
  { label: 'Closet', href: '/closet' },
  { label: 'Outfits', href: '/outfits' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
            <Zap className="h-5 w-5 text-accent-foreground fill-primary" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            bejo<span className="text-primary">looks</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/login"
            className="rounded-full px-5 py-2 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground transition-all hover:scale-105 active:scale-95"
          >
            Sign Up Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-xl p-2 text-foreground md:hidden transition-colors hover:bg-secondary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="border-t border-border bg-background px-5 pb-6 pt-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="rounded-full border border-border px-5 py-3 text-center text-sm font-bold text-foreground hover:bg-secondary"
              onClick={() => setMobileOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-accent px-5 py-3 text-center text-sm font-bold text-accent-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up Free
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

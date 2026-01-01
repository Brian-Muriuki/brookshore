"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Container from "./Container";
import TripBagCounter from "./TripBagCounter";
import TripBag from "./TripBag";

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

const navLinks = [
  { href: "/corporate", label: "Corporate" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const isHome = pathname === "/";

  const activeHref = useMemo(() => {
    if (!pathname) return null;
    const exact = navLinks.find((l) => l.href === pathname)?.href;
    if (exact) return exact;
    if (pathname.startsWith("/corporate")) return "/corporate";
    return null;
  }, [pathname]);

  return (
    <header
      className={classNames(
        "sticky top-0 z-40 border-b border-border backdrop-blur",
        isHome
          ? "bg-[color-mix(in_oklab,var(--background)_70%,transparent)]"
          : "bg-[color-mix(in_oklab,var(--background)_85%,transparent)]",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground font-black">
              B
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                Brookshore Safaris
              </div>
              <div className="text-[11px] text-[color-mix(in_oklab,var(--foreground)_65%,transparent)]">
                Kenya tours & corporate travel
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  activeHref === link.href
                    ? "bg-muted"
                    : "hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Trip Bag */}
            <div className="relative ml-2">
              <TripBagCounter onClick={() => setBagOpen(!bagOpen)} />
              <TripBag isOpen={bagOpen} onClose={() => setBagOpen(false)} />
            </div>

            {/* CTA */}
            <Link
              href="/#experiences"
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
            >
              Build Your Trip
            </Link>
          </nav>

          {/* Mobile: Trip Bag + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Trip Bag */}
            <div className="relative">
              <TripBagCounter onClick={() => setBagOpen(!bagOpen)} />
              <TripBag isOpen={bagOpen} onClose={() => setBagOpen(false)} />
            </div>

            {/* Hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1">
                <span
                  className={classNames(
                    "h-0.5 w-5 rounded bg-foreground transition",
                    menuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={classNames(
                    "h-0.5 w-5 rounded bg-foreground transition",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={classNames(
                    "h-0.5 w-5 rounded bg-foreground transition",
                    menuOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen ? (
        <div className="border-t border-border bg-[color-mix(in_oklab,var(--background)_92%,transparent)] md:hidden">
          <Container>
            <div className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={classNames(
                    "rounded-xl px-3 py-3 text-sm font-semibold",
                    activeHref === link.href ? "bg-muted" : "hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#experiences"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground"
              >
                Build Your Trip
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

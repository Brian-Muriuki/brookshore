"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [menuOpen, setMenuOpen] = useState(false);

  // Remove locale prefix from pathname for comparison
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const isHome = pathWithoutLocale === "/";

  const navLinks = [
    { href: `/${locale}/corporate`, label: t("corporate"), key: "corporate" },
  ] as const;

  const activeHref = useMemo(() => {
    if (!pathname) return null;
    if (pathname.includes("/corporate")) return `/${locale}/corporate`;
    return null;
  }, [pathname, locale]);

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
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground font-black">
              B
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                Brookshores Safaris
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
                key={link.key}
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

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* CTA */}
            <Link
              href={`/${locale}#packages`}
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
            >
              {tCommon("viewPackages")}
            </Link>
          </nav>

          {/* Mobile: Language + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />

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
                  key={link.key}
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
                href={`/${locale}#packages`}
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground"
              >
                {tCommon("viewPackages")}
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

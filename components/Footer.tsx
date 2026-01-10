"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "./Container";

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-base font-semibold">Brookshores Safaris</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">{t("quickLinks")}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link className="hover:underline" href={`/${locale}#packages`}>
                {tNav("packages")}
              </Link>
              <Link className="hover:underline" href={`/${locale}/corporate`}>
                {tNav("corporate")}
              </Link>
              <Link className="hover:underline" href={`/${locale}/about`}>
                {tNav("about")}
              </Link>
              <Link className="hover:underline" href={`/${locale}/contact`}>
                {tNav("contact")}
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">{t("contact")}</div>
            <div className="mt-3 space-y-2 text-sm text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
              {phone ? <div>Phone: {phone}</div> : null}
              {email ? <div>Email: {email}</div> : null}
              <div>{t("location")}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border bg-card px-3 py-1">
                M-Pesa
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1">
                Visa
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1">
                Mastercard
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)] md:flex-row">
          <div>
            {t("copyright", { year: new Date().getFullYear() })}
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#">
              Instagram
            </a>
            <a className="hover:underline" href="#">
              Facebook
            </a>
            <a className="hover:underline" href="#">
              TripAdvisor
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

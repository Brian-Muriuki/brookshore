"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import BrandLogo from "./BrandLogo";
import Container from "./Container";
import { getContactEmail, getContactPhone } from "@/lib/contact";

export default function Footer() {
  const phone = getContactPhone();
  const email = getContactEmail();
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const packagesHref = `/${locale}#packages-by-group`;

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo className="h-14 w-[190px] sm:h-16 sm:w-[216px]" />
            <p className="mt-3 max-w-md text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">{t("quickLinks")}</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link className="hover:underline" href={packagesHref}>
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
              {email ? (
                <div>
                  Email:{" "}
                  <a className="font-medium text-brand hover:underline" href={`mailto:${email}`}>
                    {email}
                  </a>
                </div>
              ) : null}
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

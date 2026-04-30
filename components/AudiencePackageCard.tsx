"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { AudiencePackage } from "@/data/audiencePackages";

function buildHref(
  locale: string,
  pkg: AudiencePackage,
  source: string,
  campaign?: string,
) {
  const basePath = pkg.primaryHref
    ? `/${locale}${pkg.primaryHref}`
    : `/${locale}/programs/${pkg.slug}`;
  const params = new URLSearchParams({ source });
  if (campaign) params.set("campaign", campaign);

  return `${basePath}?${params.toString()}`;
}

export default function AudiencePackageCard({
  package: pkg,
  badgeLabel,
}: {
  package: AudiencePackage;
  badgeLabel?: string;
}) {
  const locale = useLocale();
  const href = buildHref(locale, pkg, "home-audience-cards");

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[28px] border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            {pkg.priceFrom} {pkg.priceUnit}
          </span>
          {badgeLabel ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
              {badgeLabel}
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            {pkg.duration}
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {pkg.title}
          </h3>
          <p className="mt-2 text-sm text-white/88">{pkg.subtitle}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_74%,transparent)]">
          {pkg.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {pkg.groupSize}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {pkg.extraLabel}: {pkg.extraValue}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {pkg.activities.slice(0, 2).map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-3 py-1 text-xs text-[color-mix(in_oklab,var(--foreground)_72%,transparent)]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand">Explore package →</span>
        </div>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Tour } from "@/data/tours";
import { getVibeById, getVibeColor } from "@/data/legacy/vibes";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const locale = useLocale();
  const t = useTranslations("tours");
  const tVibes = useTranslations("vibes");
  const tItems = useTranslations("tourItems");

  // Get translated title and tagline, fallback to tour data
  const title = tItems.has(`${tour.slug}.title`)
    ? tItems(`${tour.slug}.title`)
    : tour.title;
  const tagline = tItems.has(`${tour.slug}.tagline`)
    ? tItems(`${tour.slug}.tagline`)
    : tour.tagline;

  const vibe = getVibeById(tour.vibe);
  const vibeColorClasses = getVibeColor(tour.vibe);

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={tour.image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Duration badge */}
        <div className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
          {tour.duration}
        </div>

        {/* Vibe badge */}
        {vibe && (
          <div
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium border ${vibeColorClasses}`}
          >
            {vibe.icon} {tVibes(vibe.id)}
          </div>
        )}

        {/* Destinations */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex flex-wrap gap-1">
            {tour.destinations.slice(0, 3).map((dest) => (
              <span
                key={dest}
                className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-xs text-white"
              >
                {dest}
              </span>
            ))}
            {tour.destinations.length > 3 && (
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-xs text-white">
                +{tour.destinations.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold leading-tight group-hover:text-brand transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)] line-clamp-2">
          {tagline}
        </p>

        {/* Price range */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-sm text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
            {t("priceFrom")}
          </span>
          <span className="font-semibold text-brand">
            ${tour.pricing.international.from}
          </span>
          <span className="text-xs text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
            USD
          </span>
        </div>

        {/* Highlights preview */}
        <div className="mt-3 flex flex-wrap gap-1">
          {tour.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]"
            >
              {highlight.length > 25 ? highlight.slice(0, 25) + "..." : highlight}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-brand group-hover:underline">
            {t("viewDetails")} →
          </span>
        </div>
      </div>
    </Link>
  );
}

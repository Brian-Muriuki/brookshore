"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import Container from "./Container";
import { currentCampaign } from "@/data/currentCampaign";
import { isCampaignActive } from "@/lib/campaign";

export default function SeasonalSpotlight() {
  const locale = useLocale();

  if (!isCampaignActive(currentCampaign)) {
    return null;
  }

  const href = `/${locale}${currentCampaign.href}`;

  return (
    <section className="py-10">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-lg shadow-black/5">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[320px] bg-[#f6efe3] lg:min-h-[680px]">
              <Image
                src={currentCampaign.image}
                alt={currentCampaign.title}
                fill
                className="object-contain object-top"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.26em] text-brand">
                Seasonal spotlight
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {currentCampaign.title}
              </h2>
              <p className="mt-3 text-base text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                {currentCampaign.subtitle}
              </p>
              <p className="mt-4 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_72%,transparent)]">
                {currentCampaign.teaser}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                    Price from
                  </div>
                  <div className="mt-1 text-xl font-semibold">
                    {currentCampaign.priceFrom}{" "}
                    <span className="text-sm font-medium text-[color-mix(in_oklab,var(--foreground)_65%,transparent)]">
                      {currentCampaign.priceUnit}
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                    Full board includes
                  </div>
                  <div className="mt-1 text-sm font-medium">
                    {currentCampaign.includes.join(" • ")}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={href}
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
                >
                  {currentCampaign.ctaLabel}
                </Link>
                <Link
                  href={`/${locale}/programs/family-tales?source=seasonal-spotlight&campaign=mothers-day-mombasa-2026`}
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                  View Family Tales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

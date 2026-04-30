"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "./Container";

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  const scrollToPackages = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("packages-by-group");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80"
          alt="Kenya safari landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-background" />
      </div>

      <Container>
        <div className="relative py-16 sm:py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
              <span className="text-white/90">{t("badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-white/85">
              {t("description")}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToPackages}
                className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {tCommon("viewPackages")}
              </button>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {tCommon("talkToExpert")}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/75">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                ✓ {t("trustBadge1")}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                ✓ {t("trustBadge2")}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                ✓ {t("trustBadge3")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

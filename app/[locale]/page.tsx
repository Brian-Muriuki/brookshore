"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import TrustStrip from "@/components/TrustStrip";
import NewsletterForm from "@/components/NewsletterForm";
import PackageGrid from "@/components/PackageGrid";
import TourGrid from "@/components/TourGrid";
import SeasonalSpotlight from "@/components/SeasonalSpotlight";
import AudiencePackagesSection from "@/components/AudiencePackagesSection";

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("packages");
  const tTours = useTranslations("tours");
  const tWhyUs = useTranslations("whyUs");
  const tDest = useTranslations("destinations");
  const tTest = useTranslations("testimonials");
  const tNews = useTranslations("newsletter");

  return (
    <div>
      <HeroSection />
      <TrustStrip />
      <SeasonalSpotlight />
      <AudiencePackagesSection />

      {/* Safari Packages Section */}
      <section id="packages" className="py-14 sm:py-18 scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title="Classic Safari Packages"
            description="Browse our day-by-day safari itineraries below. If you're traveling with a specific group in mind, the Packages by Group section above might be a better starting point."
          />

          <div className="mt-8">
            <PackageGrid />
          </div>
        </Container>
      </section>

      {/* Tours & Experiences Section */}
      <section id="tours" className="border-y border-border bg-muted py-14 sm:py-18 scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow={tTours("eyebrow")}
            title={tTours("title")}
            description={tTours("description")}
          />

          <div className="mt-8">
            <TourGrid showFilters={true} limit={6} />
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/tours`}
              className="inline-flex items-center justify-center rounded-xl border border-brand bg-transparent px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              {tTours("viewAll")} →
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Brookshores */}
      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow={tWhyUs("eyebrow")}
            title={tWhyUs("title")}
            description={tWhyUs("description")}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "📋",
                title: tWhyUs("item1Title"),
                desc: tWhyUs("item1Desc"),
              },
              {
                icon: "🚐",
                title: tWhyUs("item2Title"),
                desc: tWhyUs("item2Desc"),
              },
              {
                icon: "🏕️",
                title: tWhyUs("item3Title"),
                desc: tWhyUs("item3Desc"),
              },
              {
                icon: "💬",
                title: tWhyUs("item4Title"),
                desc: tWhyUs("item4Desc"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="mt-3 text-sm font-semibold">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Destinations */}
      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow={tDest("eyebrow")}
            title={tDest("title")}
            description={tDest("description")}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: "masaiMara", emoji: "🦁" },
              { key: "amboseli", emoji: "🐘" },
              { key: "samburu", emoji: "🦒" },
              { key: "lakeNakuru", emoji: "🦩" },
            ].map((card) => (
              <Link
                key={card.key}
                href={`/${locale}#packages`}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="text-3xl">{card.emoji}</div>
                <div className="mt-3 text-sm font-semibold">
                  {tDest(card.key)}
                </div>
                <div className="mt-2 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {tDest(`${card.key}Desc`)}
                </div>
                <div className="mt-4 h-1 w-10 rounded-full bg-brand transition group-hover:w-14" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-muted py-14 sm:py-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow={tTest("eyebrow")}
              title={tTest("title")}
              description={tTest("description")}
            />
            <div className="grid gap-4">
              {[
                {
                  name: "Amina (Nairobi)",
                  text: "Our Naivasha weekend was so easy to book. Pricing was upfront, replies came in quickly, and everything ran on time.",
                },
                {
                  name: "James (UK)",
                  text: "Our Mara itinerary was laid out beautifully. We knew exactly what was included and what to expect each day.",
                },
                {
                  name: "HR Team (Tech Company)",
                  text: "Booking the team trip was painless. We got clear options, realistic timelines, and great coordination throughout.",
                },
              ].map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <blockquote className="text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-semibold">
                    {testimonial.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-14 sm:py-18">
        <Container>
          <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest text-brand uppercase">
                {tNews("eyebrow")}
              </div>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                {tNews("title")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                {tNews("description")}
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </div>
  );
}

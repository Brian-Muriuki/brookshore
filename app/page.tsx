import Link from "next/link";
import Container from "../components/Container";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import TrustStrip from "../components/TrustStrip";
import NewsletterForm from "../components/NewsletterForm";
import ExperienceGrid from "../components/ExperienceGrid";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrustStrip />

      {/* Experience Builder Section */}
      <section id="experiences" className="py-14 sm:py-18 scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="Build Your Trip"
            title="Explore & Collect Your Favorites"
            description="Browse experiences by vibe, add what you love to your trip bag, and we'll craft the perfect itinerary."
          />

          <div className="mt-8">
            <ExperienceGrid showFilters={true} />
          </div>
        </Container>
      </section>

      {/* Why Brookshore */}
      <section className="border-y border-border bg-muted py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Why Brookshore"
            title="We handle the logistics, you enjoy the trip"
            description="Build your dream trip with confidence. Our experts turn your wishlist into reality."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🎒",
                title: "Build your wishlist",
                desc: "Add experiences you love — no dates or routes needed.",
              },
              {
                icon: "💬",
                title: "Expert takes over",
                desc: "We optimize routes, book lodges, and handle transfers.",
              },
              {
                icon: "📋",
                title: "Get your itinerary",
                desc: "Receive 2-3 options with exact pricing within 24 hours.",
              },
              {
                icon: "✈️",
                title: "Travel with confidence",
                desc: "WhatsApp support throughout your trip.",
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

      {/* Pathways */}
      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Quick Start"
            title="Jump into a vibe"
            description="Not sure where to start? Pick a pathway and we'll filter experiences for you."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Safari & Wildlife", emoji: "🦁", vibe: "safari" },
              { label: "Beach & Coast", emoji: "🏖️", vibe: "beach" },
              { label: "Mountains & Hiking", emoji: "⛰️", vibe: "mountains" },
              { label: "Corporate Travel", emoji: "💼", href: "/corporate" },
            ].map((card) => (
              <Link
                key={card.label}
                href={card.href || `/#experiences`}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="text-3xl">{card.emoji}</div>
                <div className="mt-3 text-sm font-semibold">{card.label}</div>
                <div className="mt-2 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  Explore {card.label.toLowerCase()} →
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
              eyebrow="Testimonials"
              title="What travelers say"
              description="A few words from guests and corporate teams we've supported."
            />
            <div className="grid gap-4">
              {[
                {
                  name: "Amina (Nairobi)",
                  text: "The Naivasha weekend was seamless — clear pricing, quick responses, and great timing.",
                },
                {
                  name: "James (UK)",
                  text: "The Mara itinerary had everything we needed laid out — we knew what was included and what to expect.",
                },
                {
                  name: "HR Team (Tech Company)",
                  text: "Proposal flow was straightforward — clear options, timelines, and coordination.",
                },
              ].map((t) => (
                <figure
                  key={t.name}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <blockquote className="text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-semibold">
                    {t.name}
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
                Newsletter
              </div>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Get deals and new experiences
              </h2>
              <p className="mt-3 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                Stay updated on resident deals, last-minute weekend packages, and seasonal safaris.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </div>
  );
}

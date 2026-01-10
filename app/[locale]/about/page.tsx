import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Accordion from "@/components/Accordion";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-12">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Local expertise, thoughtful planning"
          description="A Kenya-first team focused on clear itineraries, reliable support, and a great guest experience."
        />

        <section className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="text-sm font-semibold">Our story</div>
            <p className="mt-3 text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
              Brookshores Safaris is built around one goal: make Kenya easy to
              explore. Whether you’re traveling as a resident, visiting from
              abroad, or coordinating a corporate retreat, we focus on clarity,
              comfort, and reliable support.
            </p>
            <p className="mt-3 text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
              Our approach is simple: listen carefully, recommend the best-fit
              options, and communicate clearly from planning to return.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
            <div className="relative aspect-[16/11]">
              <Image
                src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80"
                alt="Wildlife in Kenya"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Team"
            title="Guides and trip designers"
            description="Experienced support for leisure and corporate travel."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Lead Guide", role: "Safari specialist" },
              { name: "Trip Designer", role: "Beach & weekend escapes" },
              { name: "Corporate Lead", role: "Retreats & MICE" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {p.role}
                </div>
                <div className="mt-4 h-24 rounded-xl border border-border bg-muted" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-border bg-muted p-8 sm:p-10">
          <SectionHeading
            eyebrow="Promise"
            title="Responsible travel, done right"
            description="A dedicated section for safety, sustainability, and respect for communities."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Safety first",
                desc: "Clear briefings, vetted partners, and reliable support.",
              },
              {
                title: "Respectful wildlife viewing",
                desc: "Ethical practices and park rules followed.",
              },
              {
                title: "Community impact",
                desc: "Support local guides, crafts, and experiences.",
              },
              {
                title: "Transparent pricing",
                desc: "Inclusions/exclusions clearly listed on tours.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="text-sm font-semibold">{v.title}</div>
                <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Certifications"
            title="Licenses & memberships"
            description="Professional standards and responsible operations."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid h-16 place-items-center rounded-2xl border border-border bg-card text-xs font-semibold text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]"
              >
                Badge
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we hear a lot"
            description="Reduce friction by answering the basics upfront."
          />
          <div className="mt-6">
            <Accordion
              items={[
                {
                  title: "Do you offer resident rates?",
                  content:
                    "Yes. We can quote resident-friendly options in KES depending on the package and season.",
                  defaultOpen: true,
                },
                {
                  title: "Can you customize itineraries?",
                  content:
                    "Absolutely. Use the quote form or WhatsApp button to tell us your dates, budget, and must-haves.",
                },
                {
                  title: "Do you handle corporate retreats?",
                  content:
                    "Yes. The corporate page is designed as a proposal-first flow for HR/admin teams.",
                },
                {
                  title: "Is payment available via M-Pesa?",
                  content:
                    "Yes. We can guide you on the available payment options when we share your quote.",
                },
              ]}
            />
          </div>
        </section>
      </Container>
    </div>
  );
}

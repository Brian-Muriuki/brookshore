import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";
import { ButtonLink } from "@/components/Button";

export const metadata = {
  title: "Corporate Travel",
};

export default function CorporatePage() {
  return (
    <div>
      <section className="border-b border-border bg-muted py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest text-brand uppercase">
                Corporate
              </div>
              <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Corporate travel & retreats, handled end-to-end
              </h1>
              <p className="mt-4 text-pretty text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                A clean B2B flow for HR and admin teams: proposals, venues,
                transport, activities, and support — with clear timelines and a
                single point of contact.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#proposal">Request a proposal</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Talk to us
                </ButtonLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  24/7 support
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  Dedicated account manager
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  Budget-first planning
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6">
              <div className="text-sm font-semibold">Services</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Team building",
                    desc: "Activities, venues, facilitators, and logistics.",
                  },
                  {
                    title: "Retreats & offsites",
                    desc: "Naivasha, Mara, Coast — curated experiences.",
                  },
                  {
                    title: "MICE",
                    desc: "Meetings, conferences, events, group travel.",
                  },
                  {
                    title: "Transport",
                    desc: "Shuttles, airport transfers, fleet options.",
                  },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="text-sm font-semibold">{s.title}</div>
                    <div className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Value"
            title="Built for efficiency (not browsing)"
            description="Corporate clients need proposals, clear accountability, and predictable operations."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Fast proposals",
                desc: "Structured request form and clear next steps.",
              },
              {
                title: "Dedicated support",
                desc: "One point of contact from planning to delivery.",
              },
              {
                title: "Cost control",
                desc: "Budget ranges and transparent inclusions.",
              },
              {
                title: "Reliable execution",
                desc: "On-time transport and contingency planning.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="text-sm font-semibold">{v.title}</div>
                <p className="mt-2 text-sm leading-6 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Trusted By"
            title="Teams we support"
            description="From small teams to large organizations — locally and across the region."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Finance",
              "Tech",
              "NGOs",
              "Education",
              "SMEs",
              "Professional services",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold"
              >
                {label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Case Studies"
            title="Problem → plan → outcome"
            description="A simple framework for clear communication and delivery."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                problem: "30-person offsite, tight timelines",
                plan: "Venue shortlist + transport plan + activity options.",
                outcome: "Executed in 2 weeks with a single point of contact.",
              },
              {
                problem: "Quarterly team building with budget controls",
                plan: "Package tiers + clear inclusions/exclusions.",
                outcome: "Predictable cost per head for each event.",
              },
              {
                problem: "Airport transfers for visiting executives",
                plan: "Meet & greet + reliable scheduling + standby support.",
                outcome: "On-time pickups and smooth logistics.",
              },
            ].map((c) => (
              <div
                key={c.problem}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="text-xs font-semibold tracking-widest text-brand uppercase">
                  Case study
                </div>
                <div className="mt-3 text-sm font-semibold">Problem</div>
                <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {c.problem}
                </p>
                <div className="mt-4 text-sm font-semibold">Plan</div>
                <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {c.plan}
                </p>
                <div className="mt-4 text-sm font-semibold">Outcome</div>
                <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                  {c.outcome}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="proposal" className="border-t border-border bg-muted py-14 sm:py-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Proposal"
                title="Tell us what you need"
                description="Share your dates, group size, destination ideas, and budget range."
              />
              <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                <div className="font-semibold text-foreground">
                  Typical request details
                </div>
                <ul className="mt-3 grid gap-2">
                  <li>Destination(s) and dates</li>
                  <li>Group size and accommodation level</li>
                  <li>Transport requirements</li>
                  <li>Budget range per person</li>
                  <li>Any activities (team building / CSR / gala dinner)</li>
                </ul>
              </div>
            </div>

            <QuoteForm variant="corporate" />
          </div>
        </Container>
      </section>
    </div>
  );
}

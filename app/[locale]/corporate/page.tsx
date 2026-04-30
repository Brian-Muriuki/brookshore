import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import AudienceInquiryForm from "@/components/AudienceInquiryForm";
import { getAudiencePackageBySlug } from "@/data/audiencePackages";

export const metadata = {
  title: "Executive Retreat",
};

export default function CorporatePage() {
  const executiveRetreat = getAudiencePackageBySlug("executive-retreat");

  if (!executiveRetreat) {
    return null;
  }

  return (
    <div>
      <section className="border-b border-border bg-muted py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest text-brand uppercase">
                Executive Retreat
              </div>
              <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Leadership retreats and strategy offsites, handled end-to-end
              </h1>
              <p className="mt-4 text-pretty text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                Whether you&apos;re booking a board offsite, a leadership strategy session, or an
                NGO retreat, we sort the venue, AV, rooms, transport, and on-site
                coordination so you can spend your time on the agenda, not the spreadsheet.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-border bg-background px-4 py-2 font-semibold">
                  {executiveRetreat.duration}
                </span>
                <span className="rounded-full border border-border bg-background px-4 py-2 font-semibold">
                  {executiveRetreat.groupSize}
                </span>
                <span className="rounded-full bg-brand px-4 py-2 font-semibold text-white">
                  {executiveRetreat.priceFrom} {executiveRetreat.priceUnit}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  Dedicated event coordinator
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  Venue + AV ready
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  Budget-first planning
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-xl shadow-black/5">
              <div className="relative aspect-[4/3]">
                <Image
                  src={executiveRetreat.image}
                  alt={executiveRetreat.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="What’s included"
            title="Everything you need, sorted in one go"
            description="Pick your destination and dates, send us your team&rsquo;s requirements, and we&rsquo;ll come back with a proposal that already covers the venue, logistics, and the small details you&rsquo;d normally have to chase."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {executiveRetreat.included.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="text-sm font-semibold">{item}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Best for"
            title="Teams that need structure, not just a venue"
            description="If you&rsquo;ve been juggling vendors, hotel quotes, and transport spreadsheets, this is the easier route. Tell us what your team needs and we&rsquo;ll build the rest around it."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {executiveRetreat.idealFor.map((label) => (
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

      <section id="proposal" className="py-14 sm:py-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Proposal"
                title="Tell us what your team needs"
                description="Share your dates, headcount, destination ideas, and any specifics, and we&rsquo;ll come back with a proposal that fits how your team actually works."
              />
              <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                <div className="font-semibold text-foreground">
                  Typical request details
                </div>
                <ul className="mt-3 grid gap-2">
                  <li>Destination options and preferred dates</li>
                  <li>Attendee count and accommodation level</li>
                  <li>Transport and airport transfer needs</li>
                  <li>Meeting, workshop, and AV expectations</li>
                  <li>Any add-ons like team building, gala dinner, or wellness</li>
                </ul>
              </div>
            </div>

            <AudienceInquiryForm
              package={executiveRetreat}
              heading="Request an Executive Retreat proposal"
              description="Send us the basics and we&rsquo;ll get back to you with a tailored Executive Retreat proposal, usually within one working day."
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

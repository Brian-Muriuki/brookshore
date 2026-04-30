import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Container from "@/components/Container";
import AudienceInquiryForm from "@/components/AudienceInquiryForm";
import { currentCampaign } from "@/data/currentCampaign";
import { getAudiencePackageBySlug } from "@/data/audiencePackages";
import { isCampaignActive } from "@/lib/campaign";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Mother's Day Mombasa Trip | Brookshores Safaris",
  description:
    "Treat Mum to a coastal getaway in Mombasa this Mother's Day. Limited-time full-board offer, available through Tuesday, May 12, 2026.",
};

export default async function MothersDayMombasaPage({ params }: PageProps) {
  const { locale } = await params;
  const linkedPackage = getAudiencePackageBySlug(currentCampaign.linkedPackageSlug);
  const active = isCampaignActive(currentCampaign);

  if (!linkedPackage) {
    return null;
  }

  return (
    <div className="pb-20">
      <section className="border-b border-border bg-muted py-10 sm:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-xl shadow-black/5">
              <div className="relative aspect-[3/4]">
                <Image
                  src={currentCampaign.image}
                  alt={currentCampaign.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Limited-time campaign
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {currentCampaign.title}
              </h1>
              <p className="mt-3 text-lg text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
                {currentCampaign.subtitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_74%,transparent)]">
                A full-board coastal escape made for Mother's Day weekend. Booking stays open until Tuesday, May 12, 2026, in case you need a couple of extra days to round up the family.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                    Price from
                  </div>
                  <div className="mt-2 text-xl font-semibold">
                    {currentCampaign.priceFrom}{" "}
                    <span className="text-sm font-medium text-[color-mix(in_oklab,var(--foreground)_65%,transparent)]">
                      {currentCampaign.priceUnit}
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                    Full board includes
                  </div>
                  <div className="mt-2 text-sm font-semibold">
                    {currentCampaign.includes.join(" • ")}
                  </div>
                </div>
              </div>

              {!active ? (
                <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                  This Mother's Day offer has wrapped up, but you can still plan a family coastal trip with us any time of the year. See the package below.
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-brand/25 bg-brand/5 p-4 text-sm">
                  Looking to travel another time of the year? This trip is part of our{" "}
                  <span className="font-semibold">{linkedPackage.title}</span> package, available year-round.
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/programs/family-tales?source=mothersday-page&campaign=mothers-day-mombasa-2026`}
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                >
                  View Family Tales
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold">Why families love this trip</h2>
                <p className="mt-3 text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_76%,transparent)]">
                  Mum gets a real break, the kids get the beach, and you get to enjoy it all with someone else handling the meals, the rooms, and the airport runs. We've kept it simple, full board, easy bookings, and a team on the ground if anything comes up while you're there.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Full-board stay so meals are sorted from the moment you arrive",
                  "Family-friendly rooms and beachside lodging",
                  "Quick WhatsApp follow-up once you send your details",
                  "Easy to extend into a longer family trip if you want more days",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <AudienceInquiryForm
              package={linkedPackage}
              heading="Request the Mother's Day offer"
              description="Send us a few details and our team will follow up on the Mother's Day Mombasa offer while it's still on."
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

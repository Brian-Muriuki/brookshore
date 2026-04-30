import type { AudiencePackage } from "@/data/audiencePackages";
import AudienceInquiryForm from "./AudienceInquiryForm";

export default function AudiencePackageDetail({
  package: pkg,
}: {
  package: AudiencePackage;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="mt-3 text-sm leading-7 text-[color-mix(in_oklab,var(--foreground)_78%,transparent)]">
            {pkg.description}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Duration", value: pkg.duration },
            { label: "Group size", value: pkg.groupSize },
            { label: "Price from", value: `${pkg.priceFrom} ${pkg.priceUnit}` },
            { label: pkg.extraLabel, value: pkg.extraValue },
          ].map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                {fact.label}
              </div>
              <div className="mt-2 text-sm font-semibold">{fact.value}</div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold">What's included</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.included.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card p-4 text-sm"
              >
                <span className="font-semibold text-brand">Included:</span> {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Activities & highlights</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.activities.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card p-4 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Destinations</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.destinations.map((destination) => (
              <span
                key={destination}
                className="rounded-full border border-border bg-card px-3 py-2 text-sm"
              >
                {destination}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Ideal for</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.idealFor.map((item) => (
              <span
                key={item}
                className="rounded-full bg-muted px-3 py-2 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <AudienceInquiryForm package={pkg} />
      </div>
    </div>
  );
}

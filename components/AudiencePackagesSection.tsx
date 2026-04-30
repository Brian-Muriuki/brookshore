"use client";

import Container from "./Container";
import SectionHeading from "./SectionHeading";
import AudiencePackageCard from "./AudiencePackageCard";
import { audiencePackages } from "@/data/audiencePackages";
import { currentCampaign } from "@/data/currentCampaign";
import { isCampaignActive } from "@/lib/campaign";

export default function AudiencePackagesSection() {
  const activeCampaign = isCampaignActive(currentCampaign) ? currentCampaign : null;

  return (
    <section id="packages-by-group" className="py-14 sm:py-18 scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Packages by Group"
          title="Start with the package that fits your people"
          description="Explore packages tailored for schools, executive teams, families, fellowships, and organized groups so you can find the right fit faster."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {audiencePackages.map((pkg) => (
            <AudiencePackageCard
              key={pkg.slug}
              package={pkg}
              badgeLabel={
                activeCampaign?.linkedPackageSlug === pkg.slug
                  ? "Mother's Day Special"
                  : undefined
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

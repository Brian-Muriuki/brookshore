import Image from "next/image";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Container from "@/components/Container";
import AudiencePackageDetail from "@/components/AudiencePackageDetail";
import { audiencePackages, getAudiencePackageBySlug } from "@/data/audiencePackages";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return audiencePackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getAudiencePackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Program Not Found | Brookshores Safaris",
    };
  }

  return {
    title: `${pkg.title} | Brookshores Safaris`,
    description: pkg.tagline,
  };
}

export default async function AudienceProgramPage({ params }: PageProps) {
  const { slug, locale } = await params;

  if (slug === "executive-retreat") {
    redirect(`/${locale}/corporate`);
  }

  const pkg = getAudiencePackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-muted">
        <div className="absolute inset-0">
          <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
        <Container>
          <div className="relative z-10 flex min-h-[420px] items-end py-10 text-white">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                Packages by Group
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {pkg.title}
              </h1>
              <p className="mt-3 text-lg text-white/92">{pkg.subtitle}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">
                {pkg.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/12 px-4 py-2">{pkg.duration}</span>
                <span className="rounded-full bg-white/12 px-4 py-2">{pkg.groupSize}</span>
                <span className="rounded-full bg-brand px-4 py-2 font-semibold text-white">
                  {pkg.priceFrom} {pkg.priceUnit}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12">
        <Container>
          <AudiencePackageDetail package={pkg} />
        </Container>
      </section>
    </div>
  );
}

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPackageBySlug, packages } from "@/data/packages";
import Container from "@/components/Container";
import PackageDetailClient from "./PackageDetailClient";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Package Not Found | Brookshores Safaris",
    };
  }

  return {
    title: `${pkg.title} | Brookshores Safaris`,
    description: pkg.tagline,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const tPkg = await getTranslations("tourPackages");
  const tCommon = await getTranslations("common");

  // Get translated title and tagline, fallback to package data
  const title = tPkg.has(`${pkg.slug}.title`) ? tPkg(`${pkg.slug}.title`) : pkg.title;
  const tagline = tPkg.has(`${pkg.slug}.tagline`) ? tPkg(`${pkg.slug}.tagline`) : pkg.tagline;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${pkg.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <Container>
            <div className="pb-8 text-white">
              <div className="mb-2 inline-block rounded-full bg-brand px-3 py-1 text-xs font-medium">
                {pkg.duration} {tCommon("days")}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-lg text-white/90">{tagline}</p>
            </div>
          </Container>
        </div>
      </div>

      <div className="mt-8">
        <Container>
          <PackageDetailClient package={pkg} />
        </Container>
      </div>
    </div>
  );
}

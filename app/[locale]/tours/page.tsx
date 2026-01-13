import { getTranslations } from "next-intl/server";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TourGrid from "@/components/TourGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ToursPage() {
  const t = await getTranslations("tours");

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-muted">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-brand uppercase tracking-wider mb-2">
              {t("eyebrow")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              {t("description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Tours Grid with Filters */}
      <section className="py-16">
        <Container>
          <TourGrid showFilters={true} />
        </Container>
      </section>
    </main>
  );
}

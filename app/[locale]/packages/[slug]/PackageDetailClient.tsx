"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Package } from "@/data/packages";
import PackageBookingForm from "@/components/PackageBookingForm";
import SuccessConfirmation from "@/components/SuccessConfirmation";

interface PackageDetailClientProps {
  package: Package;
}

export default function PackageDetailClient({ package: pkg }: PackageDetailClientProps) {
  const t = useTranslations("packageDetail");
  const tCommon = useTranslations("common");
  const tPkg = useTranslations("tourPackages");

  // Get translated description, fallback to package data
  const description = tPkg.has(`${pkg.slug}.description`) ? tPkg(`${pkg.slug}.description`) : pkg.description;

  const [showSuccess, setShowSuccess] = useState(false);
  const [tripRef, setTripRef] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [showMobileForm, setShowMobileForm] = useState(false);

  const handleSuccess = (ref: string, url: string) => {
    setTripRef(ref);
    setWhatsappUrl(url);
    setShowSuccess(true);
    setShowMobileForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showSuccess) {
    return (
      <SuccessConfirmation tripRef={tripRef} whatsappUrl={whatsappUrl} />
    );
  }

  return (
    <>
    {/* Mobile Booking Modal/Drawer */}
    {showMobileForm && (
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowMobileForm(false)}
        />
        {/* Drawer */}
        <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t("readyToBook")}?</h3>
            <button
              onClick={() => setShowMobileForm(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-lg"
              aria-label={tCommon("close")}
            >
              x
            </button>
          </div>
          <PackageBookingForm package={pkg} onSuccess={handleSuccess} />
        </div>
      </div>
    )}

    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-10">
        {/* Description */}
        <section>
          <h2 className="text-xl font-semibold">{t("overview")}</h2>
          <p className="mt-3 text-[color-mix(in_oklab,var(--foreground)_80%,transparent)] leading-relaxed">
            {description}
          </p>
        </section>

        {/* Destinations */}
        <section>
          <h2 className="text-xl font-semibold">{t("destinations")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {pkg.destinations.map((dest, idx) => (
              <span
                key={dest}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
              >
                {idx > 0 && (
                  <span className="text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]">
                    →
                  </span>
                )}
                {dest}
              </span>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="text-xl font-semibold">{t("highlights")}</h2>
          <ul className="mt-3 space-y-2">
            {pkg.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
              >
                <span className="mt-1 text-brand">*</span>
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        {/* Excursions */}
        {(pkg.excursions.enRoute.length > 0 || pkg.excursions.atDestination.length > 0) && (
          <section id="excursions">
            <h2 className="text-xl font-semibold">{t("excursions")}</h2>
            <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              {t("excursionsDescription")}
            </p>

            {/* En Route Excursions */}
            {pkg.excursions.enRoute.length > 0 && (
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-blue-700 dark:text-blue-400">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-xs">
                    &#10148;
                  </span>
                  {t("enRouteExcursions")}
                </h3>
                <p className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                  {t("enRouteDescription")}
                </p>
                <div className="mt-3 space-y-3">
                  {pkg.excursions.enRoute.map((excursion) => (
                    <div
                      key={excursion.name}
                      className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">
                          {excursion.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                        {excursion.location}
                      </p>
                      <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                        {excursion.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* At Destination Excursions */}
            {pkg.excursions.atDestination.length > 0 && (
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-xs">
                    &#9733;
                  </span>
                  {t("atDestinationExcursions")}
                </h3>
                <p className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                  {t("atDestinationDescription")}
                </p>
                <div className="mt-3 space-y-3">
                  {pkg.excursions.atDestination.map((excursion) => (
                    <div
                      key={excursion.name}
                      className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-emerald-900 dark:text-emerald-100">
                          {excursion.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                        {excursion.location}
                      </p>
                      <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--foreground)_75%,transparent)]">
                        {excursion.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* First Book Now CTA - Mobile */}
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 text-center lg:hidden">
          <p className="text-sm font-medium">{t("readyToBook")}?</p>
          <button
            onClick={() => setShowMobileForm(true)}
            className="mt-3 w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {tCommon("bookNow")}
          </button>
        </div>

        {/* Itinerary - THE MAIN FOCUS */}
        <section id="itinerary">
          <h2 className="text-2xl font-bold">{t("itinerary")}</h2>
          <div className="mt-6 space-y-6">
            {pkg.itinerary.map((day) => (
              <div
                key={day.day}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {day.day}
                  </div>
                  <h3 className="text-lg font-semibold">{day.title}</h3>
                </div>
                <p className="mt-4 text-[color-mix(in_oklab,var(--foreground)_80%,transparent)] leading-relaxed">
                  {day.description}
                </p>
                {day.notes && day.notes.length > 0 && (
                  <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-1">
                      {t("importantNote")}
                    </p>
                    {day.notes.map((note, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-amber-700 dark:text-amber-300"
                      >
                        {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Important Notes */}
        {pkg.importantNotes.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold">{t("importantInfo")}</h2>
            <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
              <ul className="space-y-2">
                {pkg.importantNotes.map((note, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300"
                  >
                    <span className="mt-0.5">*</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* What's Included / Excluded */}
        <section className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
              {t("included")}
            </h2>
            <ul className="mt-3 space-y-2">
              {pkg.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
                >
                  <span className="mt-0.5 text-green-600 dark:text-green-400">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
              {t("excluded")}
            </h2>
            <ul className="mt-3 space-y-2">
              {pkg.excludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
                >
                  <span className="mt-0.5 text-red-600 dark:text-red-400">
                    &#10007;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Second Book Now CTA (after includes/excludes) - Mobile */}
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 text-center lg:hidden">
          <p className="font-medium">{t("readyToExperience")}</p>
          <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
            {t("confirmAvailability")}
          </p>
          <button
            onClick={() => setShowMobileForm(true)}
            className="mt-4 w-full rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {tCommon("bookNow")}
          </button>
        </div>
      </div>

      {/* Sidebar - Booking Form (Desktop Only) */}
      <div className="hidden lg:block lg:col-span-1">
        <div
          id="booking-form"
          className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg"
        >
          <PackageBookingForm package={pkg} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>

    {/* Sticky Bottom Bar - Mobile Only */}
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{t("daysSafari", { days: pkg.duration })}</p>
          <p className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
            {pkg.destinations.slice(0, 2).join(", ")}
            {pkg.destinations.length > 2 && ` +${pkg.destinations.length - 2}`}
          </p>
        </div>
        <button
          onClick={() => setShowMobileForm(true)}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {tCommon("bookNow")}
        </button>
      </div>
    </div>

    {/* Bottom padding to account for sticky bar on mobile */}
    <div className="h-20 lg:hidden" />
    </>
  );
}

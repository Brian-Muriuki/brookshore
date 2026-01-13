"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tour } from "@/data/tours";
import { generateTripRef, WHATSAPP_NUMBER } from "@/lib/tripRef";

type AccommodationTier = "3-star" | "4-star" | "5-star";

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  adults: number;
  kids: number;
  airportTransfers: boolean;
  accommodationTier: AccommodationTier;
  notes: string;
}

interface TourBookingFormProps {
  tour: Tour;
  onSuccess: (tripRef: string, whatsappUrl: string) => void;
}

export default function TourBookingForm({ tour, onSuccess }: TourBookingFormProps) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");

  const accommodationOptions: { value: AccommodationTier; label: string; description: string }[] = [
    { value: "3-star", label: t("accommodation3Star"), description: t("accommodation3StarDesc") },
    { value: "4-star", label: t("accommodation4Star"), description: t("accommodation4StarDesc") },
    { value: "5-star", label: t("accommodation5Star"), description: t("accommodation5StarDesc") },
  ];

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    startDate: "",
    endDate: "",
    adults: 2,
    kids: 0,
    airportTransfers: false,
    accommodationTier: "4-star",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate end date based on start date and tour duration
  const calculateEndDate = (startDate: string) => {
    if (!startDate) return "";
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + tour.minDays - 1);
    return end.toISOString().split("T")[0];
  };

  const handleStartDateChange = (date: string) => {
    const endDate = calculateEndDate(date);
    setFormData({ ...formData, startDate: date, endDate });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("errors.nameRequired");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("errors.phoneRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errors.emailInvalid");
    }
    if (!formData.startDate) {
      newErrors.startDate = t("errors.dateRequired");
    }
    if (formData.adults < 1) {
      newErrors.adults = t("errors.adultsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const tripRef = generateTripRef();

      // Submit to API
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: "tour-booking",
          tripRef,
          tourId: tour.id,
          tourTitle: tour.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          startDate: formData.startDate,
          endDate: formData.endDate,
          adults: formData.adults,
          kids: formData.kids,
          airportTransfers: formData.airportTransfers,
          accommodationTier: formData.accommodationTier,
          notes: formData.notes,
        }),
      });

      // Generate WhatsApp message
      const message = `Hi! I'd like to book the ${tour.title} tour.

Ref: #${tripRef}

Travel Dates: ${formatDate(formData.startDate)} - ${formatDate(formData.endDate)}
Travelers: ${formData.adults} adult${formData.adults > 1 ? "s" : ""}${formData.kids > 0 ? `, ${formData.kids} kid${formData.kids > 1 ? "s" : ""}` : ""}
Airport Transfers: ${formData.airportTransfers ? "Yes, please" : "No, thanks"}
Accommodation: ${formData.accommodationTier}
${formData.notes ? `\nNotes: ${formData.notes}` : ""}

Please confirm availability and pricing. Thank you!`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      onSuccess(tripRef, whatsappUrl);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: t("errors.submitError") });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("title")}</h3>
        <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          {t("subtitle")}
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">{t("name")} *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            errors.name ? "border-red-500" : "border-border"
          }`}
          placeholder={t("namePlaceholder")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-sm font-medium">{t("whatsapp")} *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            errors.phone ? "border-red-500" : "border-border"
          }`}
          placeholder={t("whatsappPlaceholder")}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">{t("email")} *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            errors.email ? "border-red-500" : "border-border"
          }`}
          placeholder={t("emailPlaceholder")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Travel Dates - Calendar Style */}
      <div>
        <label className="block text-sm font-medium">{t("travelDates")} *</label>
        <p className="mt-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
          {t("travelDatesNote", { days: tour.minDays })}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              {t("startDate")}
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              min={getMinDate()}
              className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
                errors.startDate ? "border-red-500" : "border-border"
              }`}
            />
          </div>
          <div>
            <label className="block text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              {t("endDate")}
            </label>
            <input
              type="date"
              value={formData.endDate}
              readOnly
              className="mt-1 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none cursor-not-allowed"
            />
          </div>
        </div>
        {errors.startDate && (
          <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
        )}
        {formData.startDate && formData.endDate && (
          <p className="mt-2 text-sm text-brand">
            {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
          </p>
        )}
      </div>

      {/* Travelers - Adults and Kids */}
      <div>
        <label className="block text-sm font-medium">{t("travelers")} *</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {/* Adults */}
          <div>
            <label className="block text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              {tCommon("adults")}
            </label>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    adults: Math.max(1, formData.adults - 1),
                  })
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-lg font-medium transition hover:bg-muted"
              >
                -
              </button>
              <span className="flex h-10 w-12 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium">
                {formData.adults}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, adults: formData.adults + 1 })
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-lg font-medium transition hover:bg-muted"
              >
                +
              </button>
            </div>
          </div>
          {/* Kids */}
          <div>
            <label className="block text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              {tCommon("kidsAge")}
            </label>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    kids: Math.max(0, formData.kids - 1),
                  })
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-lg font-medium transition hover:bg-muted"
              >
                -
              </button>
              <span className="flex h-10 w-12 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium">
                {formData.kids}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, kids: formData.kids + 1 })
                }
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-lg font-medium transition hover:bg-muted"
              >
                +
              </button>
            </div>
          </div>
        </div>
        {errors.adults && (
          <p className="mt-1 text-xs text-red-500">{errors.adults}</p>
        )}
      </div>

      {/* Airport Transfers Toggle */}
      <div className="rounded-xl border border-border p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={formData.airportTransfers}
              onChange={(e) =>
                setFormData({ ...formData, airportTransfers: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="h-6 w-11 rounded-full bg-muted peer-checked:bg-brand transition-colors"></div>
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></div>
          </div>
          <div>
            <div className="text-sm font-medium">{t("airportTransfers")}</div>
            <p className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
              {t("airportTransfersDesc")}
            </p>
          </div>
        </label>
      </div>

      {/* Accommodation Style */}
      <div>
        <label className="block text-sm font-medium">{t("accommodation")}</label>
        <div className="mt-2 space-y-2">
          {accommodationOptions.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                formData.accommodationTier === option.value
                  ? "border-brand bg-brand/5"
                  : "border-border hover:border-brand/50"
              }`}
            >
              <input
                type="radio"
                name="accommodationTier"
                value={option.value}
                checked={formData.accommodationTier === option.value}
                onChange={() =>
                  setFormData({ ...formData, accommodationTier: option.value })
                }
                className="mt-0.5 h-4 w-4 border-border text-brand focus:ring-brand"
              />
              <div>
                <div className="text-sm font-medium">{option.label}</div>
                <div className="text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
                  {option.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium">
          {t("specialRequests")}
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder={t("specialRequestsPlaceholder")}
        />
      </div>

      {errors.submit && (
        <p className="text-sm text-red-500">{errors.submit}</p>
      )}

      {/* Submit button */}
      <div className="sticky bottom-0 -mx-4 bg-background px-4 pb-4 pt-2 sm:static sm:mx-0 sm:bg-transparent sm:p-0">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-brand py-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? tCommon("sending") : t("submitButton")}
        </button>
      </div>

      {/* Trust signals */}
      <div className="space-y-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
        <p>{t("trustNote1")}</p>
        <p>{t("trustNote2")}</p>
        <p>{t("trustNote3")}</p>
      </div>
    </form>
  );
}

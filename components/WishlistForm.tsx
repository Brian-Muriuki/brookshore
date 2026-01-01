"use client";

import { useState } from "react";
import { useTripStore, useTripItems, useIsResident } from "@/store/tripStore";
import { getExperienceById } from "@/data/experiences";
import { calculateTripEstimate, formatPriceRange } from "@/lib/pricing";
import { generateTripRef, generateWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/tripRef";

type BudgetPreference = "works" | "prefer-lower" | "can-go-higher";

interface WishlistFormProps {
  onSuccess: (tripRef: string, whatsappUrl: string) => void;
}

export default function WishlistForm({ onSuccess }: WishlistFormProps) {
  const items = useTripItems();
  const isResident = useIsResident();
  const { tripShape, accommodationTier, tripName, setIsResident } = useTripStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelMonth: "",
    groupSize: "2 adults",
    notes: "",
    budgetPreference: "works" as BudgetPreference,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimate = calculateTripEstimate(items, isResident);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "WhatsApp number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const tripRef = generateTripRef();

      // Prepare experiences data
      const experiencesData = items.map((item) => {
        const exp = getExperienceById(item.experienceId);
        return {
          id: item.experienceId,
          name: exp?.name || "",
          priority: item.priority,
        };
      });

      // Submit to API
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: "wishlist",
          tripRef,
          tripName: tripName || "My Kenya Adventure",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelMonth: formData.travelMonth,
          groupSize: formData.groupSize,
          notes: formData.notes,
          budgetPreference: formData.budgetPreference,
          accommodationTier,
          isResident,
          tripDays: tripShape.days,
          startingCity: tripShape.startingCity,
          experiences: experiencesData,
          estimate: {
            from: estimate.from,
            to: estimate.to,
            currency: estimate.currency,
          },
        }),
      });

      // Generate WhatsApp message
      const message = generateWhatsAppMessage({
        tripName: tripName || "My Kenya Adventure",
        tripRef,
        experiences: experiencesData,
        tripDays: tripShape.days,
        startingCity: tripShape.startingCity,
        accommodationTier,
        budgetPreference: formData.budgetPreference,
      });

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      onSuccess(tripRef, whatsappUrl);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Almost there!</h3>
        <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          Tell us a bit about yourself and we&apos;ll craft your perfect itinerary.
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            errors.name ? "border-red-500" : "border-border"
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-sm font-medium">WhatsApp Number *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            errors.phone ? "border-red-500" : "border-border"
          }`}
          placeholder="+254 7XX XXX XXX"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`mt-1 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
            errors.email ? "border-red-500" : "border-border"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Travel month */}
      <div>
        <label className="block text-sm font-medium">
          When are you thinking of traveling?
        </label>
        <select
          value={formData.travelMonth}
          onChange={(e) =>
            setFormData({ ...formData, travelMonth: e.target.value })
          }
          className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="">Select month...</option>
          <option value="January 2025">January 2025</option>
          <option value="February 2025">February 2025</option>
          <option value="March 2025">March 2025</option>
          <option value="April 2025">April 2025</option>
          <option value="May 2025">May 2025</option>
          <option value="June 2025">June 2025</option>
          <option value="July 2025">July 2025</option>
          <option value="August 2025">August 2025</option>
          <option value="September 2025">September 2025</option>
          <option value="October 2025">October 2025</option>
          <option value="November 2025">November 2025</option>
          <option value="December 2025">December 2025</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>

      {/* Group size */}
      <div>
        <label className="block text-sm font-medium">How many travelers?</label>
        <select
          value={formData.groupSize}
          onChange={(e) =>
            setFormData({ ...formData, groupSize: e.target.value })
          }
          className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="Solo">Solo traveler</option>
          <option value="2 adults">2 adults</option>
          <option value="2 adults + kids">2 adults + kids</option>
          <option value="3-4 adults">3-4 adults</option>
          <option value="5+ group">5+ group</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium">
          Anything else we should know? (optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="Special occasions, dietary needs, etc."
        />
      </div>

      <hr className="border-border" />

      {/* Resident toggle */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={isResident}
          onChange={(e) => setIsResident(e.target.checked)}
          className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
        />
        <span className="text-sm">I&apos;m a Kenya resident (show KES prices)</span>
      </label>

      <hr className="border-border" />

      {/* Budget preference */}
      <div>
        <p className="text-sm font-medium">
          Your estimate: {formatPriceRange(estimate)} /person
        </p>
        <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
          Does this range work for your budget?
        </p>
        <div className="mt-3 space-y-2">
          {[
            { value: "works", label: "Yes, this works" },
            { value: "prefer-lower", label: "I'd prefer lower options" },
            { value: "can-go-higher", label: "I can go higher for premium" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="budgetPreference"
                value={option.value}
                checked={formData.budgetPreference === option.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budgetPreference: e.target.value as BudgetPreference,
                  })
                }
                className="h-4 w-4 border-border text-brand focus:ring-brand"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {errors.submit && (
        <p className="text-sm text-red-500">{errors.submit}</p>
      )}

      {/* Submit button - sticky on mobile */}
      <div className="sticky bottom-0 -mx-4 bg-background px-4 pb-4 pt-2 sm:static sm:mx-0 sm:bg-transparent sm:p-0">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-brand py-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send to Expert & Get My Itinerary"}
        </button>
      </div>

      {/* Trust signals */}
      <div className="space-y-1 text-xs text-[color-mix(in_oklab,var(--foreground)_60%,transparent)]">
        <p>✓ Personal expert assigned to you</p>
        <p>✓ No payment required to inquire</p>
        <p>✓ Best price guarantee for Residents</p>
      </div>
    </form>
  );
}

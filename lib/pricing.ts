import { Experience, getExperienceById } from "@/data/experiences";
import { TripItem, AccommodationTier } from "@/store/tripStore";

export interface PriceRange {
  from: number;
  to: number;
  currency: string;
}

/**
 * Format a price with currency symbol
 */
export function formatPrice(amount: number, currency: string): string {
  if (currency === "USD") {
    return `$${amount.toLocaleString()}`;
  }
  if (currency === "KES") {
    return `KES ${amount.toLocaleString()}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

/**
 * Format a price range
 */
export function formatPriceRange(range: PriceRange): string {
  const { from, to, currency } = range;
  if (currency === "USD") {
    return `$${from.toLocaleString()} - $${to.toLocaleString()}`;
  }
  if (currency === "KES") {
    return `KES ${from.toLocaleString()} - ${to.toLocaleString()}`;
  }
  return `${currency} ${from.toLocaleString()} - ${to.toLocaleString()}`;
}

/**
 * Get price for a single experience based on audience
 */
export function getExperiencePrice(
  experience: Experience,
  isResident: boolean
): PriceRange {
  return isResident
    ? { ...experience.pricing.resident, currency: "KES" }
    : { ...experience.pricing.international, currency: "USD" };
}

/**
 * Format the "From $X/person" display
 */
export function formatFromPrice(
  experience: Experience,
  isResident: boolean
): string {
  const pricing = isResident
    ? experience.pricing.resident
    : experience.pricing.international;
  const currency = isResident ? "KES" : "USD";

  return `From ${formatPrice(pricing.from, currency)}/person`;
}

/**
 * Calculate total estimate for multiple experiences
 */
export function calculateTripEstimate(
  items: TripItem[],
  isResident: boolean
): PriceRange {
  let totalFrom = 0;
  let totalTo = 0;

  items.forEach((item) => {
    const experience = getExperienceById(item.experienceId);
    if (experience) {
      const pricing = isResident
        ? experience.pricing.resident
        : experience.pricing.international;
      totalFrom += pricing.from;
      totalTo += pricing.to;
    }
  });

  return {
    from: totalFrom,
    to: totalTo,
    currency: isResident ? "KES" : "USD",
  };
}

/**
 * Calculate total days for experiences
 */
export function calculateTripDays(items: TripItem[]): {
  min: number;
  max: number;
} {
  let minDays = 0;
  let maxDays = 0;

  items.forEach((item) => {
    const experience = getExperienceById(item.experienceId);
    if (experience) {
      minDays += experience.minDays;
      maxDays += experience.maxDays;
    }
  });

  return { min: minDays, max: maxDays };
}

/**
 * Get trip fit message based on selected days vs experience days
 */
export function getTripFitMessage(
  items: TripItem[],
  selectedDays: number | null
): { message: string; status: "good" | "warning" | "info" } {
  if (items.length === 0) {
    return { message: "", status: "info" };
  }

  const { min, max } = calculateTripDays(items);

  if (!selectedDays) {
    if (min === max) {
      return {
        message: `Great for a ${min}-day trip`,
        status: "good",
      };
    }
    return {
      message: `Great for a ${min}-${max} day trip`,
      status: "good",
    };
  }

  if (selectedDays < min) {
    return {
      message: `You've saved ${items.length} experiences. That's usually a ${min}-${max} day trip. Try marking a few as "If time".`,
      status: "warning",
    };
  }

  if (selectedDays >= min && selectedDays <= max) {
    return {
      message: `Perfect fit for your ${selectedDays}-day trip!`,
      status: "good",
    };
  }

  return {
    message: `You have room for more! These fit ${min}-${max} days.`,
    status: "info",
  };
}

/**
 * Accommodation tier display names
 */
export const accommodationTierNames: Record<AccommodationTier, string> = {
  budget: "Budget",
  midrange: "Mid-range",
  comfort: "Comfort",
  luxury: "Luxury",
};

/**
 * Get accommodation tier description
 */
export function getAccommodationDescription(tier: AccommodationTier): string {
  const descriptions: Record<AccommodationTier, string> = {
    budget: "Basic camps, shared facilities",
    midrange: "Comfortable lodges, en-suite rooms",
    comfort: "Quality lodges, good amenities",
    luxury: "Premium lodges, full service",
  };
  return descriptions[tier];
}

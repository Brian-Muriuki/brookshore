import { getWhatsAppNumber } from "./phone";

/**
 * Generate a unique trip reference ID
 * Format: TRIP-YYYY-XXXXX (e.g., TRIP-2024-A3B2C)
 */
export function generateTripRef(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing chars (0, O, 1, I)
  let suffix = "";

  for (let i = 0; i < 5; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `TRIP-${year}-${suffix}`;
}

/**
 * Generate a WhatsApp message for trip submission
 */
export function generateWhatsAppMessage(data: {
  tripName: string;
  tripRef: string;
  experiences: { name: string; priority: "must-do" | "if-time" }[];
  tripDays: number | null;
  startingCity: string | null;
  accommodationTier: string;
  budgetPreference: string;
}): string {
  const {
    tripName,
    tripRef,
    experiences,
    tripDays,
    startingCity,
    accommodationTier,
    budgetPreference,
  } = data;

  const experiencesList = experiences
    .map((e) => `• ${e.name} (${e.priority === "must-do" ? "Must-do" : "If time"})`)
    .join("\n");

  const budgetText =
    budgetPreference === "works"
      ? "This range works"
      : budgetPreference === "prefer-lower"
      ? "I'd prefer lower options"
      : "I can go higher for premium";

  const tierText =
    accommodationTier.charAt(0).toUpperCase() + accommodationTier.slice(1);

  const parts = [
    `Hi! I just built a Kenya wishlist on Brookshores Safaris.`,
    ``,
    `Trip: "${tripName || "My Kenya Adventure"}"`,
    `Ref: #${tripRef}`,
    ``,
    `Experiences:`,
    experiencesList,
    ``,
    `Duration: ${tripDays ? `${tripDays} days` : "Flexible"}`,
    `Starting: ${startingCity || "Not sure yet"}`,
    `Style: ${tierText}`,
    `Budget: ${budgetText}`,
    ``,
    `I'm ready to finalize this. What are the next steps?`,
  ];

  return parts.join("\n");
}

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function generateWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  // Remove any non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Shared WhatsApp number for Brookshores Safaris
 */
export const WHATSAPP_NUMBER = getWhatsAppNumber();

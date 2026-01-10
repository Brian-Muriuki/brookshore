import { NextResponse } from "next/server";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw9EVlcAF1-d6wkrBRw1d-SwSWpCkiKa0y5CqrEXzOT3S7I4VnwHrsC6cc1mBsiDtbn/exec";

type WishlistPayload = {
  variant: "wishlist";
  tripRef: string;
  tripName: string;
  name: string;
  email: string;
  phone: string;
  travelMonth?: string;
  groupSize?: string;
  notes?: string;
  budgetPreference?: string;
  accommodationTier?: string;
  isResident?: boolean;
  tripDays?: number | null;
  startingCity?: string | null;
  experiences?: Array<{ id: string; name: string; priority: string }>;
  estimate?: { from: number; to: number; currency: string };
};

type PackageBookingPayload = {
  variant: "package-booking";
  tripRef: string;
  packageId: string;
  packageTitle: string;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  adults: number;
  kids: number;
  airportTransfers: boolean;
  accommodationTier: string;
  notes?: string;
};

type LegacyPayload = {
  variant?: "tour" | "corporate" | "contact" | "newsletter";
  subject?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  dates?: string;
  groupSize?: string;
  budgetRange?: string;
  message?: string;
  page?: string;
};

type LeadPayload = WishlistPayload | PackageBookingPayload | LegacyPayload;

async function sendToGoogleSheet(data: Record<string, unknown>) {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Google Sheet error:", response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send to Google Sheet:", error);
    return false;
  }
}

export async function POST(req: Request) {
  let payload: LeadPayload | null = null;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = payload?.email?.trim();
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email is required" },
      { status: 400 },
    );
  }

  // Handle wishlist submissions
  if (payload && "variant" in payload && payload.variant === "wishlist") {
    const wishlistData = payload as WishlistPayload;

    const sheetData = {
      timestamp: new Date().toISOString(),
      tripReference: wishlistData.tripRef,  // Match Apps Script field name
      tripName: wishlistData.tripName,
      name: wishlistData.name,
      email: wishlistData.email,
      phone: wishlistData.phone,
      travelMonth: wishlistData.travelMonth || "",
      groupSize: wishlistData.groupSize || "",
      notes: wishlistData.notes || "",
      budgetPreference: wishlistData.budgetPreference || "",
      accommodationTier: wishlistData.accommodationTier || "",
      isResident: wishlistData.isResident ? "Yes" : "No",
      tripDays: wishlistData.tripDays || "",
      startingCity: wishlistData.startingCity || "",
      experiences: wishlistData.experiences
        ?.map((e) => `${e.name} (${e.priority})`)
        .join(", ") || "",
      estimateFrom: wishlistData.estimate?.from || "",
      estimateTo: wishlistData.estimate?.to || "",
      currency: wishlistData.estimate?.currency || "",
    };

    const success = await sendToGoogleSheet(sheetData);

    if (!success) {
      console.error("Failed to save lead to Google Sheet:", sheetData);
      // Still return success to user - we don't want to block their experience
      // The lead data is logged above for recovery
    }

    console.log("Wishlist lead received:", sheetData);
    return NextResponse.json({ ok: true });
  }

  // Handle package booking submissions
  if (payload && "variant" in payload && payload.variant === "package-booking") {
    const bookingData = payload as PackageBookingPayload;

    // Calculate trip days from dates
    const startDate = new Date(bookingData.startDate);
    const endDate = new Date(bookingData.endDate);
    const tripDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const sheetData = {
      timestamp: new Date().toISOString(),
      tripReference: bookingData.tripRef,
      tripName: bookingData.packageTitle,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      // Old fields - leave empty for package bookings
      travelMonth: "",
      groupSize: "",
      notes: bookingData.notes || "",
      budgetPreference: "",
      accommodationTier: bookingData.accommodationTier,
      isResident: "",
      tripDays: tripDays,
      startingCity: "",
      experiences: "",
      estimateFrom: "",
      estimateTo: "",
      currency: "",
      // New fields for package bookings
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      adults: bookingData.adults,
      kids: bookingData.kids,
      airportTransfers: bookingData.airportTransfers ? "Yes" : "No",
    };

    const success = await sendToGoogleSheet(sheetData);

    if (!success) {
      console.error("Failed to save package booking to Google Sheet:", sheetData);
    }

    console.log("Package booking received:", sheetData);
    return NextResponse.json({ ok: true });
  }

  // Handle legacy form submissions (corporate, contact, tour)
  const legacyData = payload as LegacyPayload;

  const sheetData = {
    variant: legacyData.variant || "contact",
    name: legacyData.name || "",
    email: legacyData.email || "",
    phone: legacyData.phone || "",
    company: legacyData.company || "",
    dates: legacyData.dates || "",
    groupSize: legacyData.groupSize || "",
    budgetRange: legacyData.budgetRange || "",
    message: legacyData.message || "",
  };

  const success = await sendToGoogleSheet(sheetData);

  if (!success) {
    console.error("Failed to save lead to Google Sheet:", sheetData);
  }

  console.log("Lead received:", sheetData);
  return NextResponse.json({ ok: true });
}


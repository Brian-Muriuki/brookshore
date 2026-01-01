import { NextResponse } from "next/server";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbycoa0-HlKRIkoyumzORNuhWwUVBMsFQilr8PeZohS6oQGoA9gRKaVOgg2L7dn0vhuq9g/exec";

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

type LeadPayload = WishlistPayload | LegacyPayload;

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

  // Handle legacy form submissions (corporate, contact, etc.)
  console.log("Lead received:", {
    variant: (payload as LegacyPayload)?.variant || "contact",
    email,
    name: payload?.name,
    phone: payload?.phone,
  });

  return NextResponse.json({ ok: true });
}


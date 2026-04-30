import { NextResponse } from "next/server";
import { normalizeLeadPhone } from "@/lib/phone";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

type LeadMeta = {
  pagePath?: string;
  pageUrl?: string;
  leadSource?: string;
  campaignSlug?: string;
};

type WishlistPayload = LeadMeta & {
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

type PackageBookingPayload = LeadMeta & {
  variant: "package-booking";
  tripRef: string;
  packageId: string;
  packageSlug: string;
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

type TourBookingPayload = LeadMeta & {
  variant: "tour-booking";
  tripRef: string;
  tourId: string;
  tourSlug: string;
  tourTitle: string;
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

type LegacyPayload = LeadMeta & {
  variant?: "tour" | "corporate" | "contact" | "newsletter";
  subject?: string;
  tripReference?: string;
  tripName?: string;
  tripSlug?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  dates?: string;
  groupSize?: string;
  budgetRange?: string;
  message?: string;
};

type LeadPayload =
  | WishlistPayload
  | PackageBookingPayload
  | TourBookingPayload
  | LegacyPayload;

type SheetRow = Record<string, string | number>;

function getPagePath(payload: LeadMeta & { page?: string }) {
  return payload.pagePath || payload.page || "";
}

function calculateTripDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "";
  }

  return (
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
}

function createBaseRow(payload: LeadPayload, leadType: string): SheetRow {
  return {
    timestamp: new Date().toISOString(),
    leadType,
    variant: payload.variant || leadType,
    leadSource: payload.leadSource?.trim() || "website",
    campaignSlug: payload.campaignSlug?.trim() || "",
    pagePath: getPagePath(payload),
    pageUrl: payload.pageUrl?.trim() || "",
    status: "New",
    assignedTo: "",
    tripReference: "",
    tripName: "",
    tripSlug: "",
    packageId: "",
    packageSlug: "",
    tourId: "",
    tourSlug: "",
    subject: "",
    name: "",
    email: payload.email?.trim() || "",
    phone: normalizeLeadPhone(payload.phone),
    company: "",
    dates: "",
    groupSize: "",
    budgetRange: "",
    startDate: "",
    endDate: "",
    tripDays: "",
    adults: "",
    kids: "",
    travelMonth: "",
    startingCity: "",
    airportTransfers: "",
    accommodationTier: "",
    isResident: "",
    experiences: "",
    budgetPreference: "",
    estimateFrom: "",
    estimateTo: "",
    currency: "",
    message: "",
    notes: "",
  };
}

function buildWishlistRow(payload: WishlistPayload): SheetRow {
  return {
    ...createBaseRow(payload, "wishlist"),
    tripReference: payload.tripRef,
    tripName: payload.tripName,
    name: payload.name,
    groupSize: payload.groupSize || "",
    tripDays: payload.tripDays || "",
    travelMonth: payload.travelMonth || "",
    startingCity: payload.startingCity || "",
    accommodationTier: payload.accommodationTier || "",
    isResident: payload.isResident ? "Yes" : "No",
    experiences:
      payload.experiences
        ?.map((experience) => `${experience.name} (${experience.priority})`)
        .join(", ") || "",
    budgetPreference: payload.budgetPreference || "",
    estimateFrom: payload.estimate?.from || "",
    estimateTo: payload.estimate?.to || "",
    currency: payload.estimate?.currency || "",
    notes: payload.notes || "",
  };
}

function buildPackageBookingRow(payload: PackageBookingPayload): SheetRow {
  return {
    ...createBaseRow(payload, "package-booking"),
    tripReference: payload.tripRef,
    tripName: payload.packageTitle,
    tripSlug: payload.packageSlug,
    packageId: payload.packageId,
    packageSlug: payload.packageSlug,
    name: payload.name,
    startDate: payload.startDate,
    endDate: payload.endDate,
    tripDays: calculateTripDays(payload.startDate, payload.endDate),
    adults: payload.adults,
    kids: payload.kids,
    airportTransfers: payload.airportTransfers ? "Yes" : "No",
    accommodationTier: payload.accommodationTier,
    notes: payload.notes || "",
  };
}

function buildTourBookingRow(payload: TourBookingPayload): SheetRow {
  return {
    ...createBaseRow(payload, "tour-booking"),
    tripReference: payload.tripRef,
    tripName: payload.tourTitle,
    tripSlug: payload.tourSlug,
    tourId: payload.tourId,
    tourSlug: payload.tourSlug,
    name: payload.name,
    startDate: payload.startDate,
    endDate: payload.endDate,
    tripDays: calculateTripDays(payload.startDate, payload.endDate),
    adults: payload.adults,
    kids: payload.kids,
    airportTransfers: payload.airportTransfers ? "Yes" : "No",
    accommodationTier: payload.accommodationTier,
    notes: payload.notes || "",
  };
}

function buildLegacyRow(payload: LegacyPayload): SheetRow {
  const leadType = payload.variant || "contact";

  return {
    ...createBaseRow(payload, leadType),
    tripReference: payload.tripReference || "",
    tripName: payload.tripName || "",
    tripSlug: payload.tripSlug || "",
    subject: payload.subject || "",
    name: payload.name || "",
    company: payload.company || "",
    dates: payload.dates || "",
    groupSize: payload.groupSize || "",
    budgetRange: payload.budgetRange || "",
    message: payload.message || "",
  };
}

async function sendToGoogleSheet(data: SheetRow) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
    return {
      ok: false as const,
      error:
        "Lead capture is not configured yet. Add GOOGLE_SHEETS_WEBHOOK_URL to continue.",
    };
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseText = await response.text();

    if (!response.ok) {
      console.error("Google Sheet error:", response.status, responseText);
      return {
        ok: false as const,
        error: "Lead capture could not be completed. Please try again.",
      };
    }

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText) as {
          ok?: boolean;
          error?: string;
        };

        if (parsed.ok === false) {
          console.error("Google Sheet rejected lead:", parsed.error || responseText);
          return {
            ok: false as const,
            error: parsed.error || "Lead capture could not be completed. Please try again.",
          };
        }
      } catch {
        // Some webhook responses may return plain text. That is acceptable as long as the request succeeded.
      }
    }

    return { ok: true as const };
  } catch (error) {
    console.error("Failed to send to Google Sheet:", error);
    return {
      ok: false as const,
      error: "Lead capture could not be completed. Please try again.",
    };
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

  let sheetRow: SheetRow;

  if (payload && "variant" in payload && payload.variant === "wishlist") {
    sheetRow = buildWishlistRow(payload);
  } else if (
    payload &&
    "variant" in payload &&
    payload.variant === "package-booking"
  ) {
    sheetRow = buildPackageBookingRow(payload);
  } else if (payload && "variant" in payload && payload.variant === "tour-booking") {
    sheetRow = buildTourBookingRow(payload);
  } else {
    sheetRow = buildLegacyRow(payload as LegacyPayload);
  }

  const result = await sendToGoogleSheet(sheetRow);

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  console.log("Lead received:", sheetRow);
  return NextResponse.json({ ok: true });
}

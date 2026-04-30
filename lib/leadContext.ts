export type LeadClientContext = {
  pagePath?: string;
  pageUrl?: string;
  leadSource: string;
  campaignSlug?: string;
};

function pickParam(searchParams: URLSearchParams, keys: string[]) {
  for (const key of keys) {
    const value = searchParams.get(key)?.trim();
    if (value) return value;
  }

  return undefined;
}

export function getLeadClientContext(): LeadClientContext {
  if (typeof window === "undefined") {
    return { leadSource: "website" };
  }

  const { pathname, search, href } = window.location;
  const searchParams = new URLSearchParams(search);

  return {
    pagePath: pathname || undefined,
    pageUrl: href || undefined,
    leadSource:
      pickParam(searchParams, ["source", "lead_source", "utm_source"]) ||
      "website",
    campaignSlug: pickParam(searchParams, [
      "campaign",
      "campaign_slug",
      "utm_campaign",
    ]),
  };
}

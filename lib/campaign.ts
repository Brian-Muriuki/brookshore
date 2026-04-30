type CampaignWindow = {
  startAt: string;
  endAt: string;
};

export function isCampaignActive(campaign: CampaignWindow, now = new Date()) {
  const start = new Date(campaign.startAt);
  const end = new Date(campaign.endAt);

  return now >= start && now <= end;
}

import { normalizeLeadPhone } from "./phone";

const DEFAULT_CONTACT_EMAIL = "info@brookshoressafaris.com";

export function getContactEmail() {
  return process.env.NEXT_PUBLIC_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
}

export function getContactPhone() {
  return normalizeLeadPhone(process.env.NEXT_PUBLIC_PHONE) || "+254727256939";
}

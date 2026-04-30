const KENYA_COUNTRY_CODE = "254";
const DEFAULT_WHATSAPP_NUMBER = "254727256939";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function isLikelyInternationalDigits(value: string) {
  return value.length >= 8 && value.length <= 15;
}

export function normalizeLeadPhone(rawPhone: string | null | undefined) {
  const trimmed = rawPhone?.trim() || "";
  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("+")) {
    const digits = digitsOnly(trimmed);
    return isLikelyInternationalDigits(digits) ? `+${digits}` : trimmed;
  }

  const digits = digitsOnly(trimmed);
  if (!digits) {
    return trimmed;
  }

  if (digits.startsWith("00") && isLikelyInternationalDigits(digits.slice(2))) {
    return `+${digits.slice(2)}`;
  }

  if (/^254\d{9}$/.test(digits)) {
    return `+${digits}`;
  }

  if (/^0[17]\d{8}$/.test(digits)) {
    return `+${KENYA_COUNTRY_CODE}${digits.slice(1)}`;
  }

  if (/^[17]\d{8}$/.test(digits)) {
    return `+${KENYA_COUNTRY_CODE}${digits}`;
  }

  return trimmed;
}

export function getWhatsAppNumber() {
  const normalized = normalizeLeadPhone(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
  return digitsOnly(normalized) || DEFAULT_WHATSAPP_NUMBER;
}

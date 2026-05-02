const NAIROBI_TIME_ZONE = "Africa/Nairobi";

export function formatKenyaTimestamp(value: Date | string | number = new Date()) {
  const date = value instanceof Date ? value : new Date(value);

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: NAIROBI_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const map = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second} EAT`;
}

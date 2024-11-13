export const timestamp = new Intl.DateTimeFormat("en-PH", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  hour: "numeric",
  minute: "numeric",
});

export const fullTimestamp = new Intl.DateTimeFormat("en-PH", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

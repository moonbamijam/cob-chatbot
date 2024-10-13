export const timestamp = new Intl.DateTimeFormat("en-PH", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  hour: "numeric",
  minute: "numeric",
});

export const timeDisplay = (timestamp: Date | number) => {
  const time = new Intl.DateTimeFormat("en-PH", {
    hour12: true,
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
  return time;
};

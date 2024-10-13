const date = new Date();

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = weekdays[date.getDay()];
const month = months[date.getMonth()];

export const formatedDate = `${weekday}, ${month} ${date.getDate()}, ${date.getFullYear()}`;

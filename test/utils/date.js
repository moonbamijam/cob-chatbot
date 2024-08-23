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

let weekday = weekdays[date.getDay()];
let month = months[date.getMonth()];

export const formatedDate = `${weekday}, ${month} ${date.getDate()}, ${date.getFullYear()}`;

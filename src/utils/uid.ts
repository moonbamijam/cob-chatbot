const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
const uidLength = 30;
let uid: string = "";

const generateUID = () => {
  for (let i = 0; i < uidLength; i++) {
    uid += characters.charAt(Math.round(Math.random() * 62));
  }

  localStorage.setItem("uid", uid);
  return uid;
};

export const verifiedUID = () => {
  if (
    localStorage.getItem("uid") == null ||
    localStorage.getItem("uid")?.length === 15
  ) {
    localStorage.removeItem("uid");
    uid = generateUID();
  } else if (localStorage.getItem("uid"))
    uid = localStorage.getItem("uid") || uid;

  return uid;
};

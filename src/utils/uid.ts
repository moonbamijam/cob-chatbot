const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
const uidLength = 30;
let uid: string = "";

export const generateUID = () => {
  for (let i = 0; i < uidLength; i++) {
    uid += characters.charAt(Math.round(Math.random() * 62));
  }
  return uid;
};

export const setUID = () => {
  const localUid = localStorage.getItem("uid");
  if (localUid == null || localUid?.length <= 15) {
    localStorage.removeItem("uid");
    uid = generateUID();
    localStorage.setItem("uid", uid);
    localStorage.removeItem("rating");
  } else if (localUid) uid = localUid || uid;

  return uid;
};

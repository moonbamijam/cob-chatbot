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
  console.log("called");
  const localUid = localStorage.getItem("uid");
  if (localUid == null || localUid?.length <= 15) {
    localStorage.removeItem("uid");
    uid = generateUID();
  } else if (localUid) uid = localUid || uid;

  return uid;
};

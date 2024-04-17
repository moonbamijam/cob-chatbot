export const hasSymbol = (str) => /@=@/.test(str);
let multipleMessage = null;

export const splitMessage = (message) => {
  if (hasSymbol(message)) {
    multipleMessage = message.split("@=@");
  }
  return multipleMessage;
};

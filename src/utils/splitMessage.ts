export const hasSymbol = (text: string) => /@=@/.test(text);
let multipleMessage: string[] = [];

export const splitMessage = (text: string) => {
  if (hasSymbol(text)) {
    multipleMessage = text.split("@=@");
  }
  return multipleMessage;
};

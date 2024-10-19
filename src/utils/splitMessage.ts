export const hasSymbol = (text: string) => /@=@/.test(text);
let multipleMessage: string[] = [];

export const hasImageSymbol = (text: string) => /\[([^\]]+)\]/.test(text);

export const splitMessage = (text: string) => {
  if (hasSymbol(text)) {
    multipleMessage = text.split("@=@");
  }
  return multipleMessage;
};

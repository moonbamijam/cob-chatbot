import { hasSplitSymbol } from "./symbol-checker";

export const splitMessage = (text: string) => {
  let multipleMessage: string[] = [];
  if (hasSplitSymbol(text)) {
    multipleMessage = text.split("@=@");
  }
  return multipleMessage;
};

export const hasSplitSymbol = (text: string) => /@=@/.test(text);

export const hasFileSymbol = (text: string) => /\[([^\]]+)\]/.test(text);

export const hasLinkSymbol = (text: string) => /{=([^{}]+)=}/.test(text);

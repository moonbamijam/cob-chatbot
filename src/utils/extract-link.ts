export const extractLink = (
  input: string,
): { link: string | null; linkMessage?: string | null; text: string } => {
  const regex = /\[([^\]]+)\]/;
  const match = input.match(regex);

  const regularLinkRegex = /{=([^{}]+)=}/;
  const regularLinkMatch = input.match(regularLinkRegex);

  const regularLinkMessageRegex = /<([^<>]+)>/;
  const regularLinkMessageMatch = input.match(regularLinkMessageRegex);

  if (match) {
    const link = match[1];
    const text = input.replace(regex, "").trim();
    return { link, text };
  } else if (regularLinkMatch) {
    const link = regularLinkMatch[1];
    if (regularLinkMessageMatch) {
      const linkMessage = regularLinkMessageMatch[1];
      const text = input
        .replace(regularLinkRegex, "")
        .replace(regularLinkMessageRegex, "")
        .trim();
      return { link, linkMessage, text };
    } else {
      const text = input.replace(regularLinkRegex, "").trim();
      return { link, text };
    }
  }
  // input.replace(regularLinkMessageRegex, "").trim()
  return { link: null, linkMessage: null, text: input.trim() };
};

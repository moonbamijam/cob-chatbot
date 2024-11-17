export const extractLink = (
  input: string,
): { link: string; linkMessage?: string | null; text?: string | null } => {
  const fileLinkRegex = /\[=(.*?)=]/;
  const fileLinkMatch = input.match(fileLinkRegex);

  const regularLinkRegex = /{=([^{}]+)=}/;
  const regularLinkMatch = input.match(regularLinkRegex);

  const regularLinkMessageRegex = /<([^<>]+)>/;
  const regularLinkMessageMatch = input.match(regularLinkMessageRegex);

  if (fileLinkMatch) {
    const link = fileLinkMatch[1];
    const text = input.replace(fileLinkRegex, "").trim();
    return { link, text };
  } else if (regularLinkMatch && regularLinkMessageMatch) {
    const url = regularLinkMatch[1];
    const linkMessage = regularLinkMessageMatch[1];
    const link = input
      .replace(
        regularLinkRegex,
        `<a href="${url}" class="font-semibold text-primary dark:text-secondary hover:underline" target="_blank">${linkMessage}</a>`,
      )
      .replace(regularLinkMessageRegex, "")
      .trim();
    return { link };
  } else if (regularLinkMatch) {
    const url = regularLinkMatch[1];
    const link = input
      .replace(
        regularLinkRegex,
        `<a href="${url}" class="font-semibold text-primary dark:text-secondary hover:underline" target="_blank">Click here</a>`,
      )
      .trim();
    return { link };
  }
  return { link: "", linkMessage: null, text: input.trim() };
};

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
    const link = input.replace(/<(.+?)>{=(.+?)=}/g, (_match, text, url) => {
      return `<a class="font-semibold text-primary dark:text-secondary hover:underline" href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    });

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

export const extractMultipleLink = (
  input: string,
): { link: string; fileLink: string; linkMessage?: string | null } => {
  const fileLinkRegex = /\[=(.*?)=]/;
  const fileLinkMatch = input.match(fileLinkRegex);

  const regularLinkRegex = /{=([^{}]+)=}/;
  const regularLinkMatch = input.match(regularLinkRegex);

  const regularLinkMessageRegex = /<([^<>]+)>/;
  const regularLinkMessageMatch = input.match(regularLinkMessageRegex);

  if (
    fileLinkMatch &&
    ((regularLinkMatch && regularLinkMessageMatch) || regularLinkMatch)
  ) {
    const fileLink = fileLinkMatch[1];

    const link = input
      .replace(/<(.+?)>{=(.+?)=}/g, (_match, text, url) => {
        return `<a class="font-semibold text-primary dark:text-secondary hover:underline" href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      })
      .replace(fileLinkRegex, "");

    return { link, fileLink };
  }
  return { link: "", fileLink: "", linkMessage: null };
};

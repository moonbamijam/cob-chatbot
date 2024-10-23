// check if the bot answer has this regex
export const containsPlaceholder = (text: string) => {
  const matchPlaceholderPattern = /\{=\s*[^{}]+\s*=\}/;
  return matchPlaceholderPattern.test(text);
};

// add a custom style to that link
export const splitLinkToResponse = (text: string) => {
  const matchLinkPattern = /{=([^{}]+)=}/;
  const customLinkMessagePattern = /<([^<>]+)>/;
  const linkMessage = text.match(customLinkMessagePattern);
  const link = text.match(matchLinkPattern);

  const interpolatedString = text.replace(
    matchLinkPattern,
    `<a href="${link ? link[1] : ""}" class="text-primary dark:text-secondary font-semibold hover:underline" target="_blank">${linkMessage ? linkMessage[1] : "click here"}</a>`,
  );

  return interpolatedString;
};

export const extractLink = (
  input: string,
): { link: string | null; text: string } => {
  // Regular expression to match text in square bracket
  const regex = /\[([^\]]+)\]/;
  const match = input.match(regex);

  if (match) {
    const link = match[1]; // Extract the link
    // Remove the square brackets and link from the text
    const text = input.replace(regex, "").trim();
    return { link, text };
  }

  return { link: null, text: input.trim() };
};

// check if the bot answer has this regex
export const containsPlaceholder = (text: string) => {
  const matchPlaceholderPattern = /\{=\s*[^{}]+\s*=\}/;
  return matchPlaceholderPattern.test(text);
};

// add a custom style to that link
export const splitLinkToResponse = (text: string) => {
  const matchLinkPattern = /{=([^{}]+)=}/;
  const link = text.match(matchLinkPattern);

  if (link) {
    const interpolatedString = text.replace(
      matchLinkPattern,
      `<a href="${link[1]}" class="text-primary dark:text-secondary font-semibold uppercase hover:underline" target="_blank">click here</a>`,
    );

    return interpolatedString;
  } else return text;
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

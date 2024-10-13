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

// check if the bot answer has this regex
export const containsPlaceholder = (string) => {
  const matchPlaceholderPattern = /\{=\s*[^{}]+\s*=\}/;
  return matchPlaceholderPattern.test(string);
};

// add a custom style to that link
export const splitLinkToResponse = (string) => {
  const matchLinkPattern = /{=([^{}]+)=}/;
  const link = string.match(matchLinkPattern);

  if (link) {
    const interpolatedString = string.replace(
      matchLinkPattern,
      `<a href="${link[1]}" class="text-primary dark:text-secondary font-semibold uppercase hover:underline" target="_blank">click here</a>`,
    );
    return interpolatedString;
  } else return string;
};

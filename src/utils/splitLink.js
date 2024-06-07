export const containsPlaceholder = (string) => {
  const matchPlaceholderPattern = /\{=\s*[^{}]+\s*=\}/;
  return matchPlaceholderPattern.test(string);
};

export const splitLinkToResponse = (string, intent) => {
  const matchLinkPattern = /{=([^{}]+)=}/;
  const link = string.match(matchLinkPattern);

  if (link && intent?.startsWith("form")) {
    const interpolatedString = string.replace(
      matchLinkPattern,
      `<a href="${link[1]}" class="text-primary dark:text-secondary font-semibold uppercase hover:underline" target="_blank">click here to download</a>`
    );
    return interpolatedString;
  } else if (link && intent?.startsWith("link")) {
    const interpolatedString = string.replace(
      matchLinkPattern,
      `<a href="${link[1]}" class="text-primary dark:text-secondary font-semibold uppercase hover:underline" target="_blank">click here to view</a>`
    );
    return interpolatedString;
  } else return string;
};

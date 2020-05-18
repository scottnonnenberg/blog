export default function fixLocalLinks(
  html?: string,
  domain?: string
): string | undefined {
  if (!html) {
    return html;
  }

  const linkR = /href="(\/[^"]*)"/g;
  return html.replace(linkR, (match, link) => `href="${domain + link}"`);
}

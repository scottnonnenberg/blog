export function fixLocalLinks(html?: string, domain?: string): string | undefined {
  if (!html) {
    return html;
  }

  const linkR = /href="(\/[^"]*)"/g;
  return html.replace(linkR, (_match, link) => `href="${domain + link}"`);
}

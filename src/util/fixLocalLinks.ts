export function fixLocalLinks(html: string, domain: string): string {
  const linkR = /href="(\/[^"]*)"/g;
  return html.replace(linkR, (_match, link: string) => `href="${domain}${link}"`);
}

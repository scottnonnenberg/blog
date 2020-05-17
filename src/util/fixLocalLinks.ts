export default function fixLocalLinks(html?: string, domain?: string) {
  if (!html) {
    return html;
  }

  const linkR = /href="(\/[^"]*)"/g;
  return html.replace(linkR, (match, link) => `href="${domain + link}"`);
}

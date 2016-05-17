export default function fixLocalLinks(html, domain) {
  if (!html) {
    return html;
  }

  const linkR = /href="(\/[^"]+)"/g;
  return html.replace(linkR, (match, link) => `href="${domain + link}"`);
}

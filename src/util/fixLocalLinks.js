export default function fixLocalLinks(domain, html) {
  const linkR = /href="(\/[^"]+)"/g;
  return html.replace(linkR, (match, link) => `href="${domain + link}"`);
}

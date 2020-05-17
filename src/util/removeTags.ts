export default function removeTags(html?: string) {
  if (!html) {
    return html;
  }

  return html.replace(/<[^>]*>/g, '');
}

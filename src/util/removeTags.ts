export default function removeTags(html?: string): string | undefined {
  if (!html) {
    return html;
  }

  return html.replace(/<[^>]*>/g, '');
}

export default function removeTags(html) {
  if (!html) {
    return html;
  }

  return html.replace(/<[^>]*>/g, '');
}

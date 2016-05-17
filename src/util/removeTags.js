export default function removeTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

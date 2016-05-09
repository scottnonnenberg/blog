const prefix = /<p>(<em>)?\[[^\]]+\](<\/em>)?<\/p>\n/m;
const fold = /<div class='fold'/;

export default function getPreFoldContent(content) {
  const foldMatch = fold.exec(content);

  if (foldMatch) {
    content = content.slice(0, foldMatch.index);
  }

  content = content.replace(prefix, '');

  return content;
}

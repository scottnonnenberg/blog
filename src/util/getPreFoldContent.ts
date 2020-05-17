const prefix = /<p>(<em>)?\[[^\]]+\](<\/em>)?<\/p>\n/m;
const fold = /<div class='fold'/;


function getAboveFold(content: string) {
  const foldMatch = fold.exec(content);

  if (foldMatch) {
    return content.slice(0, foldMatch.index);
  }

  return content;
}

export default function getPreFoldContent(content?: string) {
  if (!content) {
    return content;
  }

  const aboveFold = getAboveFold(content);

  return aboveFold.replace(prefix, '');
}

var fold = /<div class='fold'/;

export default function getPreFoldContent(content) {
  const match = fold.exec(content);
  if (match) {
    return content.slice(0, match.index);
  }
  return content;
};

const startOfBlock = '<p>';
const endOfBlockTest = /<\/p>/m;
const endOfBlock = '</p>';

export default function appendToLastTextBlock(
  content?: string,
  toInsert?: string
): string | undefined {
  if (!content) {
    return content;
  }

  const result = content.split(startOfBlock).filter(block => Boolean(block.length));

  for (let i = result.length - 1; i >= 0; i -= 1) {
    const block = result[i];

    const withoutTags = block.replace(/<[^>]*>/g, '');
    const withoutWhitespace = withoutTags.replace(/\s/g, '');

    if (withoutWhitespace.length) {
      result[i] = block.replace(endOfBlockTest, toInsert + endOfBlock);
      break;
    }
  }

  return startOfBlock + result.join(startOfBlock);
}

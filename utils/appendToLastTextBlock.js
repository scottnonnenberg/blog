import filter from 'lodash/filter';


const startOfBlock = '<p>';
const endOfBlockTest = /<\/p>/m;
const endOfBlock = '</p>';

export default function appendToLastTextBlock(content, toInsert) {
  const blocks = filter(content.split(startOfBlock), (block) => Boolean(block.length));

  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];

    const withoutTags = block.replace(/<[^>]*>/g, '');
    const withoutWhitespace = withoutTags.replace(/\s/g, '');

    if (withoutWhitespace.length) {
      blocks[i] = block.replace(endOfBlockTest, toInsert + endOfBlock);
      break;
    }
  }

  return startOfBlock + blocks.join(startOfBlock);
}

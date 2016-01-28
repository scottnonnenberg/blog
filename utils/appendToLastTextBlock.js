import filter from 'lodash/collection/filter';

var startOfBlock = '<p>';
var endOfBlockTest = /<\/p>/m;
var endOfBlock = '</p>';

export default function appendToLastTextBlock(content, toInsert) {
  const blocks = filter(content.split(startOfBlock), function(block) {
    return Boolean(block.length);
  });

  for (var i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    const withoutTags = block.replace(/<[^>]*>/g, '');
    const withoutWhitespace = withoutTags.replace(/\s/g, '');
    if (withoutWhitespace.length) {
      blocks[i] = block.replace(endOfBlockTest, toInsert + endOfBlock);
      break;
    }
  }

  return startOfBlock + blocks.join(startOfBlock);;
};

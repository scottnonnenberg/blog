/* eslint-disable thehelp/no-mutation, immutable/no-let, no-loops/no-loops */

import filter from 'lodash/filter';

const startOfBlock = '<p>';
const endOfBlockTest = /<\/p>/m;
const endOfBlock = '</p>';

export default function appendToLastTextBlock(content, toInsert) {
  if (!content) {
    return content;
  }

  // yes, we like functional design.
  // but implementing this with maps/filter/last/splice just isn't as clean

  const result = filter(content.split(startOfBlock), block => Boolean(block.length));

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

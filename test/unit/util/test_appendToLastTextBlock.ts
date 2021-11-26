import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import { appendToLastTextBlock } from 'src/util/appendToLastTextBlock';

describe('unit/utils/appendToLastTextBlock', () => {
  it('does not insert toInsert if all blocks are tag/whitespace only', () => {
    const input = stripIndent`
      <p>
        <a href="somewhere">
          <img src="something" />
        </a>
      </p>
      <p>
        <hr />
      </p>
    `;

    expect(appendToLastTextBlock(input, 'Read More...')).to.equal(input);
  });

  it('inserts at end of last non-tag entry', () => {
    const input = stripIndent`
      <p>
        <a href="somewhere">
          <img src="something" />
        </a>
      </p>
      <p>
        Initial text.
      </p>
      <p>
        Blog post preview.
      </p>
      <p>
        <hr />
      </p>
    `;
    const toInsert = 'Read More.';

    const expected = stripIndent`
      <p>
        <a href="somewhere">
          <img src="something" />
        </a>
      </p>
      <p>
        Initial text.
      </p>
      <p>
        Blog post preview.
      Read More.</p>
      <p>
        <hr />
      </p>
    `;

    expect(appendToLastTextBlock(input, toInsert)).to.equal(expected);
  });
});

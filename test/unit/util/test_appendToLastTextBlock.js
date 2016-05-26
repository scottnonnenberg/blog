import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import appendToLastTextBlock from 'src/util/appendToLastTextBlock';


describe('unit/both/utils/appendToLastTextBlock', () => {
  it('returns undefined for undefined input', () => {
    expect(appendToLastTextBlock()).to.equal();
  });

  it('returns empty string for empty string input', () => {
    expect(appendToLastTextBlock('')).to.equal('');
  });

  it('does not insert toInsert of all blocks are tag/whitespace only', () => {
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

    expect(appendToLastTextBlock(input)).to.equal(input);
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

import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import getPreFoldContent from 'src/util/getPreFoldContent';

describe('unit/utils/getPreFoldContent', () => {
  it('returns undefined for undefined input', () => {
    expect(getPreFoldContent()).to.equal();
  });

  it('returns empty string for empty string input', () => {
    expect(getPreFoldContent('')).to.equal('');
  });

  it('returns entire string if fold not found', () => {
    const input = `
      blog post.
      and another line.

      And another paragraph.
    `;
    expect(getPreFoldContent(input)).to.equal(input);
  });

  it('returns only the content before the fold', () => {
    const input = stripIndent`
      blog post.
      and another line.
      <div class='fold'></div>
      And another paragraph.
    `;
    const expected = 'blog post.\nand another line.\n';

    expect(getPreFoldContent(input)).to.equal(expected);
  });

  it('does not include the introductory text inside brackets', () => {
    const input = stripIndent`
      <p><em>[This post is special.]</em></p>
      intro.
      <div class='fold'></div>
      body.
    `;
    const expected = 'intro.\n';

    expect(getPreFoldContent(input)).to.equal(expected);
  });


  it('does not include the introductory text inside brackets (without <em>)', () => {
    const input = stripIndent`
      <p>[This post is special.]</p>
      intro.
      <div class='fold'></div>
      body.
    `;
    const expected = 'intro.\n';

    expect(getPreFoldContent(input)).to.equal(expected);
  });
});

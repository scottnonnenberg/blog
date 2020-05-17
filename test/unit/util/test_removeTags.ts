import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import removeTags from 'src/util/removeTags';


describe('unit/utils/removeTags', () => {
  it('returns undefined for undefined input', () => {
    expect(removeTags()).to.equal(undefined);
  });

  it('returns empty string for empty string input', () => {
    expect(removeTags('')).to.equal('');
  });

  it('eliminates tags but does not eliminate escapes', () => {
    const html = stripIndent`
      <h1>Header</h1>
      <a href="something">Left &amp; Right</a>
    `;
    const expected = stripIndent`
      Header
      Left &amp; Right
    `;

    expect(removeTags(html)).to.equal(expected);
  });
});

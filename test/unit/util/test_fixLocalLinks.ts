import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import fixLocalLinks from 'src/util/fixLocalLinks';

describe('unit/utils/fixLocalLinks', () => {
  it('returns undefined for undefined input', () => {
    expect(fixLocalLinks()).to.equal(undefined);
  });

  it('returns empty string for empty string input', () => {
    expect(fixLocalLinks('')).to.equal('');
  });

  it('does not replace absolute link', () => {
    const html = stripIndent`
      <a href="http://somewhere"></a>
    `;
    const domain = 'domain';

    expect(fixLocalLinks(html, domain)).to.equal(html);
  });

  it('replaces all instances of local links', () => {
    const html = stripIndent`
      <a href="/link1/">Text</a>
      <a href="/link2/">Text</a>
    `;
    const domain = 'domain';

    const expected = stripIndent`
      <a href="domain/link1/">Text</a>
      <a href="domain/link2/">Text</a>
    `;

    expect(fixLocalLinks(html, domain)).to.equal(expected);
  });

  it('replaces link to root of page', () => {
    const html = stripIndent`
      <a href="/">Text</a>
    `;
    const domain = 'domain';

    const expected = stripIndent`
      <a href="domain/">Text</a>
    `;

    expect(fixLocalLinks(html, domain)).to.equal(expected);
  });
});

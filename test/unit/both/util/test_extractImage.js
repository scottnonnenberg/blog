import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import extractImage from 'src/util/extractImage';


describe('unit/both/utils/extractImage', () => {
  it('returns undefined for undefined input', () => {
    expect(extractImage()).to.equal();
  });

  it('returns empty string for empty string input', () => {
    expect(extractImage('')).to.equal('');
  });

  it('returns nothing if no image found', () => {
    const body = stripIndent`
      first line of blog post
      second line
      third line
      <img>
      src="somewhere"
    `;

    expect(extractImage(body)).to.equal();
  });

  it('returns first image src found', () => {
    const body = stripIndent`
      first line of blog post
      <img something src="target1">
      <img something again src="target2">
      last line
    `;

    expect(extractImage(body)).to.equal('target1');
  });
});

import { expect } from 'chai';

import getTagCounts from 'src/util/getTagCounts';

describe('unit/utils/getTagCounts', () => {
  it('returns an empty object for no input', () => {
    expect(getTagCounts()).to.deep.equal({});
  });

  it('returns counts for one post', () => {
    const posts = [{
      frontmatter: {
        tags: ['one', 'two', 'three'],
      },
    }];
    const expected = {
      one: 1,
      two: 1,
      three: 1,
    };

    expect(getTagCounts(posts)).to.deep.equal(expected);
  });

  it('returns counts for two posts', () => {
    const posts = [{
      frontmatter: {
        tags: ['one', 'two', 'three'],
      },
    }, {
      frontmatter: {
        tags: ['two', 'three'],
      },
    }];
    const expected = {
      one: 1,
      two: 2,
      three: 2,
    };

    expect(getTagCounts(posts)).to.deep.equal(expected);
  });
});

import { expect } from 'chai';

import { getTagCounts } from 'src/util/getTagCounts';

describe('unit/utils/getTagCounts', () => {
  it('returns an empty object for no input', () => {
    expect(getTagCounts([])).to.deep.equal([]);
  });

  it('returns counts for one post', () => {
    const posts = [
      {
        frontmatter: {
          tags: ['one', 'two', 'three'],
        },
      },
    ];
    const expected = [
      { tag: 'one', count: 1 },
      { tag: 'two', count: 1 },
      { tag: 'three', count: 1 },
    ];

    expect(getTagCounts(posts)).to.deep.equal(expected);
  });

  it('returns counts for two posts', () => {
    const posts = [
      {
        frontmatter: {
          tags: ['one', 'two', 'three'],
        },
      },
      {
        frontmatter: {
          tags: ['two', 'three'],
        },
      },
    ];
    const expected = [
      { tag: 'two', count: 2 },
      { tag: 'three', count: 2 },
      { tag: 'one', count: 1 },
    ];

    expect(getTagCounts(posts)).to.deep.equal(expected);
  });
});

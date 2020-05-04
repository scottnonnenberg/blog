import { expect } from 'chai';

import getPostsWithTag from 'src/util/getPostsWithTag';


describe('unit/utils/getPostsWithTag', () => {
  it('returns empty array when provided null', () => {
    expect(getPostsWithTag()).to.deep.equal([]);
  });

  it('handles posts without tags', () => {
    const posts = [{}, {
      frontmatter: {
        tags: ['one', 'three'],
      },
    }];
    const expected = [{
      frontmatter: {
        tags: ['one', 'three'],
      },
    }];

    const actual = getPostsWithTag(posts, 'one');
    expect(actual).to.deep.equal(expected);
  });

  it('includes posts with tag', () => {
    const posts = [{
      frontmatter: {
        tags: ['one', 'two'],
      },
    }, {
      frontmatter: {
        tags: ['two', 'three'],
      },
    }, {
      frontmatter: {
        tags: ['three', 'four'],
      },
    }];
    const expected = [{
      frontmatter: {
        tags: ['one', 'two'],
      },
    }, {
      frontmatter: {
        tags: ['two', 'three'],
      },
    }];

    const actual = getPostsWithTag(posts, 'two');
    expect(actual).to.deep.equal(expected);
  });
});


import { expect } from 'chai';

import getPostsWithTag from 'src/util/getPostsWithTag';


describe('unit/both/utils/getPostsWithTag', () => {
  it('returns empty array when provided null', () => {
    expect(getPostsWithTag()).to.deep.equal([]);
  });

  it('handles posts without tags', () => {
    const posts = [{}, {
      data: {
        tags: ['one', 'three'],
      },
    }];
    const expected = [{
      data: {
        tags: ['one', 'three'],
      },
    }];

    const actual = getPostsWithTag(posts, 'one');
    expect(actual).to.deep.equal(expected);
  });

  it('includes posts with tag', () => {
    const posts = [{
      data: {
        tags: ['one', 'two'],
      },
    }, {
      data: {
        tags: ['two', 'three'],
      },
    }, {
      data: {
        tags: ['three', 'four'],
      },
    }];
    const expected = [{
      data: {
        tags: ['one', 'two'],
      },
    }, {
      data: {
        tags: ['two', 'three'],
      },
    }];

    const actual = getPostsWithTag(posts, 'two');
    expect(actual).to.deep.equal(expected);
  });
});


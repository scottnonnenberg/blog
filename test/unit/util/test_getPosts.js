import { expect } from 'chai';

import getPosts from 'src/util/getPosts';


describe('unit/utils/getPosts', () => {
  it('returns empty array when provided null', () => {
    expect(getPosts()).to.deep.equal([]);
  });

  it('returns properly-structured posts', () => {
    const pages = [{
      data: {
        body: 'contents',
      },
      date: 1,
      path: '/something/',
    }, {
      data: {
        body: 'contents',
      },
      date: 2,
      path: '/another/',
    }];
    const expected = [pages[1], pages[0]];

    const actual = getPosts(pages);
    expect(actual).to.deep.equal(expected);
  });

  it('excludes pages without path', () => {
    const pages = [{}];

    const actual = getPosts(pages);
    expect(actual).to.have.length(0);
  });

  it('excludes the root page', () => {
    const pages = [{
      path: '/',
    }];

    const actual = getPosts(pages);
    expect(actual).to.have.length(0);
  });

  it('excludes pages without data', () => {
    const pages = [{
      path: '/something/',
    }];

    const actual = getPosts(pages);
    expect(actual).to.have.length(0);
  });

  it('excludes pages without data.body', () => {
    const pages = [{
      path: '/something/',
      data: {},
    }];

    const actual = getPosts(pages);
    expect(actual).to.have.length(0);
  });

  it('excludes draft pages', () => {
    const pages = [{
      path: '/something/',
      data: {
        body: 'contents',
        draft: true,
      },
    }];

    const actual = getPosts(pages);
    expect(actual).to.have.length(0);
  });
});

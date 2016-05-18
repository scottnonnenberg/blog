import { expect } from 'chai';

import generateMetaTags from 'src/util/generateMetaTags';


describe('unit/both/util/generateMetaTags', () => {
  it('returns array when not given a page', () => {
    const page = {};
    const config = {};
    const url = '';

    const actual = generateMetaTags(page, config, url);

    expect(actual).to.have.length.above(5);
  });

  it('returns longer array when given a page', () => {
    const page = {
      data: {
        body: 'Body of article',
        date: new Date('2015-05-17T21:55:17.888Z'),
      },
    };
    const config = {
      authorBlurb: 'Cool guy',
    };
    const url = '';

    const actual = generateMetaTags(page, config, url);

    expect(actual).to.have.length.above(15);
  });
});

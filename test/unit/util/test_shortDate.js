import { expect } from 'chai';

import shortDate from 'src/util/shortDate';


describe('unit/utils/shortDate', () => {
  const now = new Date('2016-05-17T21:55:17.888Z');

  it('returns date with year for prior year', () => {
    const date = new Date('2015-05-17T21:55:17.888Z');
    const expected = '2015 May 17';

    const actual = shortDate(date, now);
    expect(actual).to.equal(expected);
  });

  it('returns date with year for prior year without provided now', () => {
    const date = new Date('2015-05-17T21:55:17.888Z');
    const expected = '2015 May 17';

    const actual = shortDate(date);
    expect(actual).to.equal(expected);
  });

  it('returns date without year for current year', () => {
    const date = new Date('2016-05-17T21:55:17.888Z');
    const expected = 'May 17';

    const actual = shortDate(date, now);
    expect(actual).to.equal(expected);
  });
});

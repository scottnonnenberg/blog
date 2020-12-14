import { expect } from 'chai';

import { longDate } from 'src/util/longDate';

describe('unit/utils/longDate', () => {
  it('returns date with year for prior year', () => {
    const date = '2015-05-17T21:55:17.888Z';
    const expected = '2015 May 17';

    const actual = longDate(date);
    expect(actual).to.equal(expected);
  });

  it('returns date with year for current year', () => {
    const date = '2016-05-17T21:55:17.888Z';
    const expected = '2016 May 17';

    const actual = longDate(date);
    expect(actual).to.equal(expected);
  });
});

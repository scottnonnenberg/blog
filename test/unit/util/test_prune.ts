import { expect } from 'chai';

import { prune } from 'src/util/prune';

describe('unit/utils/prune', () => {
  it('returns string if string is shorter than limit', () => {
    const expected = 'this is some text';

    const actual = prune(expected, 50);
    expect(actual).to.equal(expected);
  });

  it('returns string if string length matches limit', () => {
    const expected = '0123456789';

    const actual = prune(expected, 10);
    expect(actual).to.equal(expected);
  });

  it('returns correct pruned string if string length is exactly three less than limit', () => {
    const text____ = 'one two three four five six seven';
    const expected = 'one two three four five six...';

    const actual = prune(text____, 30);
    expect(actual).to.equal(expected);
  });

  it('returns correct string if it needs to drop a whole word', () => {
    const text____ = 'one two three four five sixty-seven';
    const expected = 'one two three four five...';

    const actual = prune(text____, 30);
    expect(actual).to.equal(expected);
  });

  it('returns chopped string if there are no spaces', () => {
    const text____ = 'onetwothreefourfivesixty-seven';
    const expected = 'onetwothreefourfi...';

    const actual = prune(text____, 20);
    expect(actual).to.equal(expected);
  });

  it('returns string without trailing punctuation', () => {
    const text____ = 'one two three four five, sixty-seven';
    const expected = 'one two three four five...';

    const actual = prune(text____, 30);
    expect(actual).to.equal(expected);
  });

  it('returns trimmed strings with newlines and multi-spaces removed', () => {
    const text____ = '  one   two\nthree four\nfive six seven ';
    const expected = 'one two three...';

    const actual = prune(text____, 20);
    expect(actual).to.equal(expected);
  });
});

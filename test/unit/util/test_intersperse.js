import { expect } from 'chai';

import intersperse from 'src/util/intersperse';


describe('unit/utils/intersperse', () => {
  it('returns empty array for null', () => {
    expect(intersperse()).to.deep.equal([]);
  });

  it('returns empty array for empty array', () => {
    expect(intersperse([])).to.deep.equal([]);
  });

  it('returns new array for just one array', () => {
    const array = ['item1'];

    const actual = intersperse(array, 'new');
    expect(actual).not.to.equal(array);
    expect(actual).to.deep.equal(array);
  });

  it('adds new item to two-item array', () => {
    const array = ['item1', 'item2'];
    const expected = ['item1', 'new', 'item2'];

    const actual = intersperse(array, 'new');
    expect(actual).not.to.equal(array);
    expect(actual).to.deep.equal(expected);
  });

  it('adds new item to three-item array', () => {
    const array = ['item1', 'item2', 'item3'];
    const expected = ['item1', 'new', 'item2', 'new', 'item3'];

    const actual = intersperse(array, 'new');
    expect(actual).not.to.equal(array);
    expect(actual).to.deep.equal(expected);
  });
});


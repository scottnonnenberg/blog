import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import TagTemplate from 'src/_tagTemplate';
import TagPage from 'src/TagPage';


describe('unit/_tagTemplate', () => {
  it('renders', () => {
    const wrapper = shallow(<TagTemplate route={{}} b="2" />);

    expect(wrapper.contains(<TagPage tag="TAG" route={{}} b="2" />)).to.equal(true);
  });
});

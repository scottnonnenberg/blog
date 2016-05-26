import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import Author from 'src/Author';


describe('unit/Author', () => {
  it('renders', () => {
    const wrapper = shallow(<Author />);

    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.find('div.author')).to.have.length(1);

    const divs = wrapper.find('div');
    expect(divs).to.have.length(2);

    const container = divs.at(1);
    expect(container.html()).to.contain('Hi');
  });
});

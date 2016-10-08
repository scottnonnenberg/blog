import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import EmailSignup from 'src/EmailSignup';


describe('unit/EmailSignup', () => {
  it('renders', () => {
    const wrapper = shallow(<EmailSignup text="Sign up!" />);

    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(3);

    const label = wrapper.find('label');
    expect(label).to.have.length(1);
    expect(label.text()).to.equal('Sign up!');
  });

  it('returns null if mailchimp.js is empty', () => {
    const wrapper = shallow(<EmailSignup text="Sign up!" mailchimp={{}} />);

    expect(wrapper.get(0)).to.equal(null);
  });
});

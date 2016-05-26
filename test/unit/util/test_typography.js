import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import { rhythm, TypographyStyle, fontSizeToMS } from 'src/util/typography';


describe('unit/util/typography', () => {
  describe('#rhythm', () => {
    it('runs', () => {
      const actual = rhythm(1);
      expect(actual).to.match(/\d+\.\d+rem/);
    });
  });

  describe('#TypographyStyle', () => {
    it('runs', () => {
      const wrapper = shallow(<TypographyStyle />);
      expect(wrapper.find('style')).length(1);
    });
  });

  describe('#fontSizeToMS', () => {
    it('runs', () => {
      const actual = fontSizeToMS(1);
      expect(actual).to.have.property('fontSize');
      expect(actual).to.have.property('lineHeight');
    });
  });
});

import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import generateMetaTags from 'src/util/generateMetaTags';


describe('unit/util/generateMetaTags', () => {
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
      authorImage: 'http://static/authorImage',
    };
    const url = '';

    const actual = generateMetaTags(page, config, url);

    expect(actual).to.have.length.above(15);

    const wrapper = shallow(<div>{actual}</div>);
    expect(wrapper.contains(<meta
      property="twitter:card"
      content="summary"
    />)).to.equal(true);
    expect(wrapper.contains(<meta
      property="twitter:image"
      content="http://static/authorImage"
    />)).to.equal(true);
  });

  it('returns longer array when given a page', () => {
    const page = {
      data: {
        body: 'Body of article <img src="http://static/image">',
        date: new Date('2015-05-17T21:55:17.888Z'),
      },
    };
    const config = {
      authorBlurb: 'Cool guy',
    };
    const url = '';

    const actual = generateMetaTags(page, config, url);
    const wrapper = shallow(<div>{actual}</div>);

    expect(wrapper.contains(<meta
      property="twitter:card"
      content="summary_large_image"
    />)).to.equal(true);
    expect(wrapper.contains(<meta
      property="twitter:image"
      content="http://static/image"
    />)).to.equal(true);
  });
});

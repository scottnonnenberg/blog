import { expect } from 'chai';

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import PostLink from 'src/PostLink';


describe('unit/PostLink', () => {
  it('renders post with title', () => {
    const post = {
      path: '/post/',
      data: {
        title: 'Title of post',
        date: new Date('2015-05-17T21:55:17.888Z'),
      },
    };

    const wrapper = shallow(<PostLink post={post} />);
    expect(wrapper.contains(<Link to="/post/">Title of post</Link>)).to.equal(true);

    const dateSpan = wrapper.find('span.date');
    expect(dateSpan).to.have.length(1);
    expect(dateSpan.html()).to.contain('2015 May 17');
  });
});

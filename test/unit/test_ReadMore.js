import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import ReadMore from 'src/ReadMore';
import TextPreview from 'src/TextPreview';


describe('unit/both/ReadMore', () => {
  it('renders', () => {
    const post = {
      path: '/post/',
      data: {
        title: 'Title of post',
        next: '/next/',
        previous: '/previous/',
      },
    };
    const posts = [{
      path: '/next/',
    }, {
      path: '/previous/',
    }];

    const wrapper = shallow(<ReadMore post={post} posts={posts} />);

    expect(wrapper.find(TextPreview)).to.have.length(2);
  });

  it('renders with just next', () => {
    const post = {
      path: '/post/',
      data: {
        title: 'Title of post',
        next: '/next/',
        previous: '/previous/',
      },
    };
    const posts = [{
      path: '/next/',
    }];

    const wrapper = shallow(<ReadMore post={post} posts={posts} />);

    expect(wrapper.find(TextPreview)).to.have.length(1);
  });

  it('renders with no next/previous', () => {
    const post = {
      path: '/post/',
      data: {
        title: 'Title of post',
      },
    };
    const posts = [];

    const wrapper = shallow(<ReadMore post={post} posts={posts} />);

    expect(wrapper.find(TextPreview)).to.have.length(0);
  });
});

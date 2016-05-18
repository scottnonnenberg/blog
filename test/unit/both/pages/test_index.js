import { expect } from 'chai';

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import Index from 'pages/index';
import HTMLPreview from 'src/HTMLPreview';
import TextPreview from 'src/TextPreview';
import PostLink from 'src/PostLink';
import Author from 'src/Author';


describe('unit/both/pages/index', () => {
  it('renders', () => {
    const page = {
      path: '/one/',
      data: {
        body: 'One contents',
      },
    };
    const route = {
      pages: [page, page, page, page, page,
              page, page, page, page, page,
              page, page, page, page, page,
              page, page, page, page, page],
    };

    const wrapper = shallow(<Index route={route} />);

    expect(wrapper.find(HTMLPreview)).to.have.length(5);
    expect(wrapper.find(TextPreview)).to.have.length(5);
    expect(wrapper.find(PostLink)).to.have.length(10);

    expect(wrapper.find(Author)).to.have.length(1);

    expect(wrapper.contains(<Link to="/popular/">Popular Posts</Link>)).to.equal(true);
    expect(wrapper.contains(<Link to="/tags/">Tags</Link>)).to.equal(true);

    const aboutMeLink = <a href="https://scottnonnenberg.com">About Me</a>;
    expect(wrapper.contains(aboutMeLink)).to.equal(true);
  });
});

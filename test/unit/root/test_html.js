import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { shallow } from 'enzyme';

import Html from 'html';


describe('unit/both/root/html', () => {
  beforeEach(() => {
    DocumentTitle.rewind();
  });

  it('renders in develop mode (empty body only)', () => {
    const body = '';

    const wrapper = shallow(<Html body={body} />);

    expect(wrapper.contains(<title>Scott Nonnenberg</title>)).to.equal(true);

    expect(wrapper.find('link[rel="stylesheet"]')).to.have.length(0);
    expect(wrapper.find('script')).to.have.length(2);
    expect(wrapper.find('noscript')).to.have.length(1);
  });

  it('renders in build mode (body and router parameters)', () => {
    const body = stripIndent`
      Intro to post.
      Body of post.
    `;
    const routes = [{
      page: {
        title: 'root template',
      },
    }, {
      page: {
        title: 'root',
      },
    }];
    const location = {
      pathname: '/post/',
    };

    shallow(<DocumentTitle title="Page title" />);
    const wrapper = shallow(<Html body={body} routes={routes} location={location} />);

    expect(wrapper.contains(<title>Page title</title>)).to.equal(true);

    expect(wrapper.find('link[rel="stylesheet"]')).to.have.length(1);
    expect(wrapper.find('script')).to.have.length(1);
    expect(wrapper.find('noscript')).to.have.length(1);
  });
});

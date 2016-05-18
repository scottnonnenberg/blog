import { expect } from 'chai';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { shallow } from 'enzyme';

import { default as TagPage, _getTextPreviews, _getPlain } from 'src/TagPage';
import Author from 'src/Author';
import TextPreview from 'src/TextPreview';
import PostLink from 'src/PostLink';


describe('unit/both/TagPage', () => {
  it('renders', () => {
    const tag = 'one';
    const route = {
      pages: [],
    };

    const wrapper = shallow(<TagPage tag={tag} route={route} />);

    expect(wrapper.contains(<h1>Posts tagged 'one'</h1>)).to.equal(true);

    expect(wrapper.find(DocumentTitle)).to.have.length(1);
    expect(wrapper.find(Author)).to.have.length(1);
  });

  it('_getTextPreviews returns five TextPreviews', () => {
    const posts = [{
      path: '/one/',
    }, {
      path: '/two/',
    }, {
      path: '/three/',
    }, {
      path: '/four/',
    }, {
      path: '/five/',
    }, {
      path: '/six/',
    }, {
      path: '/seven/',
    }];

    const elements = _getTextPreviews(posts);

    expect(elements).to.have.length(5);
    expect(elements[0]).to.have.property('type', TextPreview);
    expect(elements[0]).to.have.property('key', '/one/');

    expect(elements[4]).to.have.property('type', TextPreview);
    expect(elements[4]).to.have.property('key', '/five/');
  });

  it('_getPlain returns remainder in PostLinks', () => {
    const posts = [{
      path: '/one/',
    }, {
      path: '/two/',
    }, {
      path: '/three/',
    }, {
      path: '/four/',
    }, {
      path: '/five/',
    }, {
      path: '/six/',
    }, {
      path: '/seven/',
    }];

    const elements = _getPlain(posts);

    expect(elements).to.have.length(2);

    expect(elements[0]).to.have.property('type', PostLink);
    expect(elements[0]).to.have.property('key', '/six/');

    expect(elements[1]).to.have.property('type', PostLink);
    expect(elements[1]).to.have.property('key', '/seven/');
  });
});

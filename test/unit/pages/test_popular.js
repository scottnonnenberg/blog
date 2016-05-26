import { expect } from 'chai';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { shallow } from 'enzyme';

import Popular from 'pages/popular';
import Author from 'src/Author';
import TextPreview from 'src/TextPreview';


describe('unit/both/pages/popular', () => {
  it('renders', () => {
    const route = {
      pages: [{
        path: '/three/',
        data: {
          body: 'Three contenst',
        },
      }, {
        path: '/two/',
        data: {
          rank: 2,
          body: 'Three contenst',
        },
      }, {
        path: '/one/',
        data: {
          rank: 1,
          body: 'Three contenst',
        },
      }],
    };

    const wrapper = shallow(<Popular route={route} />);

    expect(wrapper.contains(<h1>Popular Posts</h1>)).to.equal(true);

    expect(wrapper.find(Author)).to.have.length(1);
    expect(wrapper.find(DocumentTitle)).to.have.length(1);

    expect(wrapper.find('li')).to.have.length(2);
    expect(wrapper.find(TextPreview)).to.have.length(2);
  });
});

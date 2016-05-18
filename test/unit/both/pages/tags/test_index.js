import { expect } from 'chai';

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import Index from 'pages/tags/index';


describe('unit/both/pages/tags/index', () => {
  it('renders', () => {
    const route = {
      pages: [{
        path: '/one/',
        data: {
          tags: ['one', 'two', 'three'],
          body: 'One contents',
        },
      }, {
        path: '/two/',
        data: {
          tags: ['two', 'three'],
          body: 'Two contents',
        },
      }, {
        path: '/three/',
        data: {
          tags: ['three'],
          body: 'Three contents',
        },
      }],
    };

    const wrapper = shallow(<Index route={route} />);

    expect(wrapper.find(Link)).to.have.length(3);

    expect(wrapper.contains(<Link to="/tags/one/">one</Link>)).to.equal(true);

    expect(wrapper.contains(<Link to="/tags/two/">two</Link>)).to.equal(true);

    expect(wrapper.contains(<Link to="/tags/three/">three</Link>)).to.equal(true);
  });
});

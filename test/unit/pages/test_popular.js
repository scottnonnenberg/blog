import { expect } from 'chai';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { shallow } from 'enzyme';

import Popular from 'pages/popular';
import Author from 'src/Author';
import TextPreview from 'src/TextPreview';
import PostLink from 'src/PostLink';


function makePage(name, rank) {
  return {
    path: `/${name}/`,
    data: {
      body: `${name} content`,
      rank,
    },
  };
}

describe('unit/pages/popular', () => {
  it('renders', () => {
    const zero = makePage('zero', null);
    const two = makePage('two', 2);
    const route = {
      pages: [
        zero,
        two,
        makePage('one', 1),
        makePage('three', 3),
        makePage('four', 4),
        makePage('five', 5),
        makePage('six', 6),
        makePage('seven', 7),
        makePage('eight', 8),
        makePage('nine', 9),
        makePage('ten', 10),
        makePage('eleven', 11),
      ],
    };

    const wrapper = shallow(<Popular route={route} />);

    expect(wrapper.contains(<h1>Popular Posts</h1>)).to.equal(true);

    expect(wrapper.find(Author)).to.have.length(1);
    expect(wrapper.find(DocumentTitle)).to.have.length(1);

    expect(wrapper.find(TextPreview)).to.have.length(10);

    expect(wrapper.find(PostLink)).to.have.length(1);

    expect(wrapper.findWhere(node => node.prop('post') === zero)).to.have.length(0);
    expect(wrapper.findWhere(node => node.prop('post') === two)).to.have.length(1);
  });
});

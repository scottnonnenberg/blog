import { expect } from 'chai';

import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { shallow } from 'enzyme';

import MarkdownWrapper from 'wrappers/md';
import Author from 'src/Author';
import ReadMore from 'src/ReadMore';


describe('unit/wrappers/md', () => {
  it('renders', () => {
    const route = {
      page: {
        data: {
          tags: ['one', 'two'],
          title: 'Post title',
          body: 'Body of the post',
          date: new Date('2015-05-17T21:55:17.888Z'),
        },
      },
      pages: [],
    };

    const wrapper = shallow(<MarkdownWrapper route={route} />);

    expect(wrapper.find(DocumentTitle)).to.have.length(1);
    expect(wrapper.find(Link)).to.have.length(2);
    expect(wrapper.find(Author)).to.have.length(1);
    expect(wrapper.find(ReadMore)).to.have.length(1);

    expect(wrapper.contains(<h1>Post title</h1>)).to.equal(true);

    const html = wrapper.html();
    expect(html).to.contain('Tags:');
  });

  it('renders without any provided tags', () => {
    const route = {
      page: {
        data: {
          tags: [],
          title: 'Post title',
          body: 'Body of the post',
          date: new Date('2015-05-17T21:55:17.888Z'),
        },
      },
      pages: [],
    };

    const wrapper = shallow(<MarkdownWrapper route={route} />);

    const html = wrapper.html();
    expect(html).not.to.contain('Tags:');
  });
});

import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import HTMLPreview from 'src/HTMLPreview';


describe('unit/both/HTMLPreview', () => {
  it('renders', () => {
    const post = {
      path: '/post/',
      data: {
        title: 'Title of post',
        date: new Date('2015-05-17T21:55:17.888Z'),
        body: stripIndent`
          <p>Intro to post.</p>
          <div class='fold'></div>
          <p>Rest of post.</p>
        `,
      },
    };

    const wrapper = shallow(<HTMLPreview post={post} />);
    expect(wrapper.contains(<Link to="/post/">Title of post</Link>)).to.equal(true);

    const dateSpan = wrapper.find('span.date');
    expect(dateSpan).to.have.length(1);
    expect(dateSpan.html()).to.contain('2015 May 17');

    const markdown = wrapper.find('div.markdown');
    expect(markdown).to.have.length(1);
    const markdownHTML = markdown.html();

    expect(markdownHTML).to.contain('Intro to post');
    expect(markdownHTML).to.contain('Read more&nbsp;»');
    expect(markdownHTML).not.to.contain('Rest of post');
  });
});

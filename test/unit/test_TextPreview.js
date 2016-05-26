import { expect } from 'chai';
import { stripIndent } from 'common-tags';

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import TextPreview from 'src/TextPreview';


describe('unit/TextPreview', () => {
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

    const wrapper = shallow(<TextPreview post={post} />);
    expect(wrapper.contains(<Link to="/post/">Title of post</Link>)).to.equal(true);

    const dateSpan = wrapper.find('span.date');
    expect(dateSpan).to.have.length(1);
    expect(dateSpan.html()).to.contain('2015 May 17');

    const p = wrapper.find('p');
    expect(p).to.have.length(1);
    const pText = p.text();

    expect(pText).to.contain('Intro to post');
    expect(pText).not.to.contain('Rest of post');

    expect(wrapper.contains(<Link to="/post/">Read more&nbsp;»</Link>)).to.equal(true);
  });
});

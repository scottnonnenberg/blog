import { expect } from 'chai';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { shallow } from 'enzyme';

import NotFound from 'pages/404';
import Author from 'src/Author';


describe('unit/pages/404', () => {
  it('renders', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.find(Author)).to.have.length(1);
    expect(wrapper.find(DocumentTitle)).to.have.length(1);

    const html = wrapper.html();
    expect(html).to.contain('Couldn&#x27;t find that');
    expect(html).to.contain('Looks like something');
  });
});

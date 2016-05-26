import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import RootTemplate from 'pages/_template';


describe('unit/pages/_template', () => {
  it('renders', () => {
    const location = {
      pathname: '/page/',
    };
    const children = <div />;
    const context = {
      router: {},
    };

    const wrapper = shallow(<RootTemplate
      location={location}
      children={children}
    />, { context });

    const html = wrapper.html();
    expect(html).not.to.contain('A blog about');
  });

  it('renders children', () => {
    const location = {
      pathname: '/',
    };
    const children = <div>
      <h1>One</h1>
      <h2>Two</h2>
    </div>;
    const context = {
      router: {},
    };

    const wrapper = shallow(<RootTemplate
      location={location}
      children={children}
    />, { context });

    expect(wrapper.contains(children)).to.equal(true);
  });

  it('renders root page', () => {
    const location = {
      pathname: '/',
    };
    const children = <div />;
    const context = {
      router: {},
    };

    const wrapper = shallow(<RootTemplate
      location={location}
      children={children}
    />, { context });

    const html = wrapper.html();
    expect(html).to.contain('A blog about');
  });
});

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Wrapper from './Wrapper';

const stories = storiesOf('src/components/Wrapper', module);

stories.add('Root', () => (
  <Wrapper
    location={{
      ...window.location,
      state: null,
      pathname: '/',
    }}
  >
    <div>This is a child div</div>
  </Wrapper>
));

stories.add('Page', () => (
  <Wrapper
    location={{
      ...window.location,
      state: null,
      pathname: '/page-slug',
    }}
  >
    <div>This is a child div</div>
  </Wrapper>
));

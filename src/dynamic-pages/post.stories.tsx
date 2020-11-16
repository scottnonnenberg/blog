import * as React from 'react';

import Post, { PropsType } from './post';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';

const { current, next, previous } = posts;

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const data = {
    markdownRemark: current,
  };
  const location = {
    ...window.location,
    state: null,
    pathname: '/page-slug',
  };
  const pageContext = {
    next,
    previous,
  };

  return {
    // Core fields
    data,
    location,
    pageContext,

    // Other stuff provided by Gatsby
    navigate: async () => undefined,
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageResources: {} as any,
    path: '/page-slug',
    pathContext: {},
    uri: '/page-slug',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/dynamic-pages/post', module);

stories.add('Default', () => <Post {...createProps()} />);

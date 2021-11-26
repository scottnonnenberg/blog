import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';
import type { PropsType } from './post';
import Post from './post';

const { current, next, previous } = posts;

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const site = {
    siteMetadata: {
      currentCommit: 'fake-sha',
      github: 'https://github.com/fake/repo',
    },
  };

  const data = {
    markdownRemark: current,
    site,
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
    navigate: async () => Promise.resolve(),
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    pageResources: {} as any,
    path: '/page-slug',
    uri: '/page-slug',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/dynamic-pages/post', module);

stories.add('Default', () => <Post {...createProps()} />);

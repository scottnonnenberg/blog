import * as React from 'react';

import Post, { PropsType } from './post';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';

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
    navigate: async () => undefined,
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageResources: {} as any,
    path: '/page-slug',
    uri: '/page-slug',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/dynamic-pages/post', module);

stories.add('Default', () => <Post {...createProps()} />);

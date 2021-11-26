import * as React from 'react';

import { storiesOf } from '@storybook/react';
import type { PropsType } from 'src/pages/index';
import Index from 'src/pages/index';

import { posts } from 'test/fixtures';

const { current, next, previous, lastYear } = posts;

const withHtml = {
  edges: [
    { node: previous },
    { node: previous },
    { node: previous },
    { node: current },
    { node: current },
  ],
};
const withText = {
  edges: [
    { node: current },
    { node: next },
    { node: next },
    { node: next },
    { node: lastYear },
  ],
};
const justLink = { edges: [{ node: lastYear }, { node: lastYear }, { node: lastYear }] };

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const data = {
    withHtml,
    withText,
    justLink,
  };
  const location = {
    ...window.location,
    state: null,
    pathname: '/',
  };

  return {
    // Core fields
    data,
    location,
    pageContext: null,

    // Other stuff provided by Gatsby
    navigate: async () => Promise.resolve(),
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    pageResources: {} as any,
    path: '/',
    uri: '/',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/pages/index', module);

stories.add('Default', () => <Index {...createProps()} />);

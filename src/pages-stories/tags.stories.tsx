import * as React from 'react';

import Tags, { PropsType } from 'src/pages/tags';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';

const { current, next, previous, lastYear } = posts;

const edges = [
  { node: previous },
  { node: previous },
  { node: previous },
  { node: previous },
  { node: previous },
  { node: previous },
  { node: current },
  { node: current },
  { node: current },
  { node: next },
  { node: next },
  { node: next },
  { node: lastYear },
  { node: lastYear },
  { node: lastYear },
  { node: lastYear },
  { node: lastYear },
  { node: lastYear },
  { node: lastYear },
  { node: lastYear },
];

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const data = {
    allMarkdownRemark: {
      edges,
    },
  };
  const location = {
    ...window.location,
    state: null,
    pathname: '/tags',
  };

  return {
    // Core fields
    data,
    location,
    pageContext: null,

    // Other stuff provided by Gatsby
    navigate: async () => undefined,
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageResources: {} as any,
    path: '/tags',
    pathContext: {},
    uri: '/tags',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/pages/tags', module);

stories.add('Default', () => <Tags {...createProps()} />);

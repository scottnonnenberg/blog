import * as React from 'react';

import Tag, { PropsType } from './tag';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';

const { current, next, previous, lastYear } = posts;

const withText = [previous, previous, previous, current, current];

const justLink = [current, next, next, next, lastYear];

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const location = {
    ...window.location,
    state: null,
    pathname: '/page-slug',
  };
  const pageContext = {
    tag: 'tech',
    withText,
    justLink,
  };

  return {
    // Core fields
    data: null,
    location,
    pageContext,

    // Other stuff provided by Gatsby
    navigate: async () => undefined,
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageResources: {} as any,
    path: '/tags/tech',
    pathContext: {},
    uri: '/tags/tech',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/dynamic-pages/tag', module);

stories.add('Default', () => <Tag {...createProps()} />);

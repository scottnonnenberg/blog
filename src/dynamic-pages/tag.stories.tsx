import * as React from 'react';
import moment from 'moment';

import Tag, { PropsType } from './tag';

import { storiesOf } from '@storybook/react';

const previous = {
  fields: {
    slug: 'previous-slug',
  },
  frontmatter: {
    title: 'Previous Title',
    date: moment().subtract(1, 'day').toJSON(),
  },
  html:
    "<p>Previous <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const current = {
  fields: {
    slug: 'current-slug',
  },
  frontmatter: {
    title: 'Current Title',
    date: moment().toJSON(),
    tags: ['tag1', 'tag2'],
  },
  html:
    "<p>Current post with <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const next = {
  fields: {
    slug: 'next-slug',
  },
  frontmatter: {
    title: 'Next Title',
    date: moment().add(1, 'day').toJSON(),
  },
  html:
    "<p>Next <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};

const postsWithTag = [
  previous,
  previous,
  previous,
  current,
  current,
  current,
  next,
  next,
  next,
];

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const location = {
    ...window.location,
    state: null,
    pathname: '/page-slug',
  };
  const pageContext = {
    tag: 'tech',
    postsWithTag,
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
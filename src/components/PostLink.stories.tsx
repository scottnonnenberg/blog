import * as React from 'react';
import PostLink from './PostLink';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/PostLink', module);

stories.add('Default', () => (
  <PostLink
    post={{
      fields: {
        slug: 'post-slug',
      },
      frontmatter: {
        title: 'Post Title',
        date: new Date().toJSON(),
      },
      html:
        "<p>This is some <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
    }}
  />
));

stories.add('Last Year', () => {
  const today = moment();
  today.subtract(1, 'year');

  return (
    <PostLink
      post={{
        fields: {
          slug: 'last-year-slug',
        },
        frontmatter: {
          title: 'Last Year Title',
          date: today.toJSON(),
        },
        html:
          "<p>This is some <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
      }}
    />
  );
});

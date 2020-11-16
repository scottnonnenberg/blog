import * as React from 'react';
import HTMLPreview from './HTMLPreview';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/HTMLPreview', module);

stories.add('Default', () => (
  <HTMLPreview
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
  const oneYearOut = moment().subtract(1, 'year');

  return (
    <HTMLPreview
      post={{
        fields: {
          slug: 'last-year-slug',
        },
        frontmatter: {
          title: 'Last Year Title',
          date: oneYearOut.toJSON(),
        },
        html:
          "<p>This is some <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
      }}
    />
  );
});

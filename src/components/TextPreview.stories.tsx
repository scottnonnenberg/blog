import * as React from 'react';
import TextPreview from './TextPreview';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/TextPreview', module);

stories.add('Default', () => (
  <TextPreview
    post={{
      fields: {
        slug: 'post-slug',
      },
      frontmatter: {
        title: 'Post Title',
        date: new Date().toJSON(),
      },
      html:
        "<p><b>This is bold</b>! <a href='#'>This is a link</a></p><div class='fold'></div><p>Below this is a second paragraph</p>",
    }}
  />
));

stories.add('Last Year', () => {
  const today = moment();
  today.subtract(1, 'year');

  return (
    <TextPreview
      post={{
        fields: {
          slug: 'last-year-slug',
        },
        frontmatter: {
          title: 'Last Year Title',
          date: today.toJSON(),
        },
        html:
          "<p><b>This is bold</b>! <a href='#'>This is a link</a></p><div class='fold'></div><p>Below this is a second paragraph</p>",
      }}
    />
  );
});

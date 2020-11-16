import * as React from 'react';
import ReadMore from './ReadMore';
import moment from 'moment';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/ReadMore', module);

const previous = {
  fields: {
    slug: 'previous-slug',
  },
  frontmatter: {
    title: 'Previous Title',
    date: new Date().toJSON(),
  },
  html:
    "<p>Previous <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const next = {
  fields: {
    slug: 'next-slug',
  },
  frontmatter: {
    title: 'Next Title',
    date: new Date().toJSON(),
  },
  html:
    "<p>Next <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};

stories.add('Default', () => <ReadMore previous={previous} next={next} />);

stories.add('Previous Only', () => <ReadMore previous={previous} />);

stories.add('Next Only', () => <ReadMore next={next} />);

stories.add('None', () => {
  const today = moment();
  today.subtract(1, 'year');

  return <ReadMore />;
});

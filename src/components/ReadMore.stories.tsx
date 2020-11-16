import * as React from 'react';
import ReadMore from './ReadMore';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';

const { next, previous } = posts;

const stories = storiesOf('src/components/ReadMore', module);

stories.add('Default', () => <ReadMore previous={previous} next={next} />);

stories.add('Previous Only', () => <ReadMore previous={previous} />);

stories.add('Next Only', () => <ReadMore next={next} />);

stories.add('None', () => <ReadMore />);

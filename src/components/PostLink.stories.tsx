import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';
import PostLink from './PostLink';

const { current, lastYear } = posts;

const stories = storiesOf('src/components/PostLink', module);

stories.add('Default', () => <PostLink post={current} />);

stories.add('Last Year', () => <PostLink post={lastYear} />);

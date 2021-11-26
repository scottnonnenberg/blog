import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';
import TextPreview from './TextPreview';

const { current, lastYear } = posts;

const stories = storiesOf('src/components/TextPreview', module);

stories.add('Default', () => <TextPreview post={current} />);

stories.add('Last Year', () => <TextPreview post={lastYear} />);

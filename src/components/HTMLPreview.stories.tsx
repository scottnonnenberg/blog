import * as React from 'react';
import HTMLPreview from './HTMLPreview';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';

const { current, lastYear } = posts;

const stories = storiesOf('src/components/HTMLPreview', module);

stories.add('Default', () => <HTMLPreview post={current} />);

stories.add('Last Year', () => <HTMLPreview post={lastYear} />);

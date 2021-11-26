import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { posts } from 'test/fixtures';
import HTMLPreview from './HTMLPreview';

const { current, lastYear } = posts;

const stories = storiesOf('src/components/HTMLPreview', module);

stories.add('Default', () => <HTMLPreview post={current} />);

stories.add('Last Year', () => <HTMLPreview post={lastYear} />);

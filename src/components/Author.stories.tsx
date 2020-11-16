import * as React from 'react';
import Author from './Author';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/Author', module);

stories.add('Default', () => <Author />);

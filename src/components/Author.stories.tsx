import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Author from './Author';

const stories = storiesOf('src/components/Author', module);

stories.add('Default', () => <Author />);

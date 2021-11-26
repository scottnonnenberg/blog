import * as React from 'react';
import { storiesOf } from '@storybook/react';
import EmailSignup from './EmailSignup';

const stories = storiesOf('src/components/EmailSignup', module);

stories.add('Default', () => <EmailSignup callToAction="This is the call to action" />);

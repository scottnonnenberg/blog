import * as React from 'react';
import EmailSignup from './EmailSignup';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/EmailSignup', module);

stories.add('Default', () => <EmailSignup callToAction="This is the call to action" />);

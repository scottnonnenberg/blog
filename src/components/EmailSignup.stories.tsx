import * as React from 'react';
import EmailSignup from './EmailSignup';

import { storiesOf } from '@storybook/react';

storiesOf('src/components', module).add('EmailSignup', () => {
  return <EmailSignup callToAction="This is the call to action" />;
});

import * as React from 'react';
import Author from './Author';

import { storiesOf } from '@storybook/react';

storiesOf('src/components', module).add('Author', () => {
  return <Author />;
});

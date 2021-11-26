import * as React from 'react';

import { storiesOf } from '@storybook/react';
import type { PropsType } from 'src/pages/404';
import NotFound from 'src/pages/404';

function createProps(props: Partial<PropsType> = {}) {
  // Core fields
  const location = {
    ...window.location,
    state: null,
    pathname: '/random',
  };

  return {
    // Core fields
    data: null,
    location,
    pageContext: null,

    // Other stuff provided by Gatsby
    navigate: async () => Promise.resolve(),
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    pageResources: {} as any,
    path: '/random',
    uri: '/random',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/pages/404', module);

stories.add('Default', () => <NotFound {...createProps()} />);

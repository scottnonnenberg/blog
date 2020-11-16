import * as React from 'react';

import NotFound, { PropsType } from 'src/pages/404';

import { storiesOf } from '@storybook/react';

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
    navigate: async () => undefined,
    children: undefined,
    params: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageResources: {} as any,
    path: '/random',
    pathContext: {},
    uri: '/random',

    // Any passed-in props take precedence
    ...props,
  };
}

const stories = storiesOf('src/pages/404', module);

stories.add('Default', () => <NotFound {...createProps()} />);

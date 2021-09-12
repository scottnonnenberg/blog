import React, { ReactElement } from 'react';

import { markdown } from './Markdown.module.scss';

type PropsType = {
  html?: string;
};

export default function Markdown(props: PropsType): ReactElement {
  const { html } = props;
  if (!html) {
    throw new Error('html prop was not provided!');
  }

  return <div className={markdown} dangerouslySetInnerHTML={{ __html: html }} />;
}

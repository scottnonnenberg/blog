import React, { ReactElement } from 'react';

import styles from './Markdown.module.scss';

type PropsType = {
  html?: string;
};

export default function Markdown(props: PropsType): ReactElement {
  const { html } = props;
  if (!html) {
    throw new Error('html prop was not provided!');
  }

  return <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />;
}

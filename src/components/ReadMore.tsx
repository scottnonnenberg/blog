import React, { ReactElement } from 'react';

import TextPreview from './TextPreview';

import styles from './ReadMore.module.less';

import { PostType } from 'src/types/Post';

type PropsType = {
  previous?: PostType;
  next?: PostType;
};

export default function ReadMore(props: PropsType): ReactElement | null {
  const { previous, next } = props;

  if (!previous && !next) {
    return null;
  }

  return (
    <div>
      {renderItem('NEXT', next)}
      {renderItem('PREVIOUS', previous)}
    </div>
  );
}

function renderItem(label: string, post?: PostType): ReactElement | null {
  if (!post) {
    return null;
  }

  return (
    <div>
      <h5 className={styles.title}>{`${label}:`}</h5>
      <TextPreview post={post} />
    </div>
  );
}

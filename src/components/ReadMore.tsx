import type { ReactElement } from 'react';
import React from 'react';

import type { PostType } from 'src/types/Post';
import TextPreview from './TextPreview';

import { title } from './ReadMore.module.scss';

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
      <div className={title}>{`${label}:`}</div>
      <TextPreview post={post} />
    </div>
  );
}

import React from 'react';

import TextPreview from './TextPreview';

import { PostType } from 'src/types/Post';

type PropsType = {
  previous?: PostType;
  next?: PostType;
}


function renderItem(label: string, post?: PostType) {
  if (!post) {
    return null;
  }

  return <div>
    <h5
      style={{
        margin: 0,
        fontSize: '0.78615rem',
        lineHeight: '1.72222rem',
        letterSpacing: '-0.5px',
      }}
    >
      {label}:
    </h5>
    <TextPreview post={post} />
  </div>;
}

export default function ReadMore(props: PropsType) {
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

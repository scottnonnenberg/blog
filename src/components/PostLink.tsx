import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';

import { PostType } from 'src/types/Post';

const QUARTER = 0.25;

type PropsType = {
  post: PostType;
}

export default function PostLink(props: PropsType) {
  const post = props.post;

  return <div
    style={{
      marginBottom: rhythm(QUARTER),
    }}
  >
    <Link to={post?.fields?.slug!}>
      {post?.frontmatter?.title}
    </Link>
    <span className="date">
      {' '}
      {shortDate(post?.frontmatter?.date)}
    </span>
  </div>;
}

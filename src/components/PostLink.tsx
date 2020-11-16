import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';

import { PostType } from 'src/types/Post';

const QUARTER = 0.25;

type PropsType = {
  post: PostType;
};

export default function PostLink(props: PropsType): ReactElement | null {
  const post = props.post;

  const to = post?.fields?.slug;
  if (!to) {
    throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
  }

  return (
    <div
      style={{
        marginBottom: rhythm(QUARTER),
      }}
    >
      <Link to={to}>{post?.frontmatter?.title}</Link>
      <span className="date"> {shortDate(post?.frontmatter?.date)}</span>
    </div>
  );
}

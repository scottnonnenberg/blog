import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

import shortDate from 'src/util/shortDate';

import { PostType } from 'src/types/Post';

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
    <div className="post-link">
      <Link to={to}>{post?.frontmatter?.title}</Link>{' '}
      <span className="post-link__date">{shortDate(post?.frontmatter?.date)}</span>
    </div>
  );
}

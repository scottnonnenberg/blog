import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import { prune } from 'underscore.string';

import shortDate from 'src/util/shortDate';
import removeTags from 'src/util/removeTags';
import getPreFoldContent from 'src/util/getPreFoldContent';

import { PostType } from 'src/types/Post';

const MAX_TEXT_PREVIEW = 200;

type PropsType = {
  post: PostType;
};

export default function TextPreview(props: PropsType): ReactElement | null {
  const post = props.post;
  const html = post.html;
  const preFold = getPreFoldContent(html);
  const noTags = removeTags(preFold);

  if (!noTags) {
    throw new Error('No text available for text preview!');
  }
  const body = prune(noTags, MAX_TEXT_PREVIEW);

  const slug = post?.fields?.slug;
  if (!slug) {
    throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
  }

  const title = post?.frontmatter?.title;
  if (!title) {
    throw new Error(`Page had missing title: ${JSON.stringify(post)}`);
  }

  const postDate = post?.frontmatter?.date;
  if (!postDate) {
    throw new Error(`Page had missing post date: ${JSON.stringify(post)}`);
  }

  return (
    <div>
      <h3 className="text-preview">
        <Link to={slug}>{title}</Link>{' '}
        <span className="text-preview__date">{shortDate(postDate)}</span>
      </h3>
      <p>
        {`${body} `}
        <Link to={slug}>Read more&nbsp;»</Link>
      </p>
    </div>
  );
}

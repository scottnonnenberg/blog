import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

import shortDate from 'src/util/shortDate';
import getPreFoldContent from 'src/util/getPreFoldContent';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';

import { PostType } from 'src/types/Post';

type PropsType = {
  post: PostType;
};

export default function HTMLPreview(props: PropsType): ReactElement | null {
  const { post } = props;
  const preview = getHTMLPreview(post);

  const slug = post?.fields?.slug;
  if (!slug) {
    throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
  }

  return (
    <div>
      <h2 className="html-preview">
        <Link to={slug}>{post?.frontmatter?.title}</Link>{' '}
        <span className="html-preview__date">{shortDate(post?.frontmatter?.date)}</span>
      </h2>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: preview || '' }} />
    </div>
  );
}

function getHTMLPreview(post: PostType): string | undefined {
  const preFold = getPreFoldContent(post.html);
  const textLink = ` <a href="${post?.fields?.slug}">Read more&nbsp;»</a>`;
  return appendToLastTextBlock(preFold, textLink);
}

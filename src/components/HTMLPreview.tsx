import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';
import getPreFoldContent from 'src/util/getPreFoldContent';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';

import { PostType } from 'src/types/Post';

const QUARTER = 0.25;

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
      <h2
        style={{
          marginBottom: rhythm(QUARTER),
        }}
      >
        <Link to={slug}>{post?.frontmatter?.title}</Link>
        <span className="date"> {shortDate(post?.frontmatter?.date)}</span>
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

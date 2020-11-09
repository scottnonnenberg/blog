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

function getHTMLPreview(post: PostType): string | undefined {
  const preFold = getPreFoldContent(post.html);
  const textLink = ` <a href="${post?.fields?.slug}">Read more&nbsp;»</a>`;
  return appendToLastTextBlock(preFold, textLink);
}

export default function HTMLPreview(props: PropsType): ReactElement | null {
  const { post } = props;
  const preview = getHTMLPreview(post);

  return (
    <div>
      <h2
        style={{
          marginBottom: rhythm(QUARTER),
        }}
      >
        <Link to={post?.fields?.slug}>{post?.frontmatter?.title}</Link>
        <span className="date"> {shortDate(post?.frontmatter?.date)}</span>
      </h2>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: preview || '' }} />
    </div>
  );
}

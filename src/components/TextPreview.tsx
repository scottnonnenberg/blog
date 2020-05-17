import React from 'react';
import { Link } from 'gatsby';
import { prune } from 'underscore.string';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';
import removeTags from 'src/util/removeTags';
import getPreFoldContent from 'src/util/getPreFoldContent';

import { PostType } from 'src/types/Post';

const QUARTER = 0.25;
const MAX_TEXT_PREVIEW = 200;

type PropsType = {
  post: PostType;
}

export default function TextPreview(props: PropsType) {
  const post = props.post;
  const html = post.html;
  const preFold = getPreFoldContent(html);
  const noTags = removeTags(preFold);

  if (!noTags) {
    throw new Error('No text available for text preview!');
  }
  const body = prune(noTags, MAX_TEXT_PREVIEW);

  return <div>
    <h3
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
    </h3>
    <p>{body} <Link to={post?.fields?.slug!}>Read more&nbsp;»</Link></p>
  </div>;
}

// TextPreview.propTypes = {
//   post: React.PropTypes.object.isRequired,
// };

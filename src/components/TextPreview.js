import React from 'react';
import { Link } from 'gatsby';
import prune from 'underscore.string/prune';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';
import removeTags from 'src/util/removeTags';
import getPreFoldContent from 'src/util/getPreFoldContent';


const QUARTER = 0.25;
const MAX_TEXT_PREVIEW = 200;

export default function TextPreview(props) {
  const post = props.post;
  const html = post.html;
  const preFold = getPreFoldContent(html);
  const body = prune(removeTags(preFold), MAX_TEXT_PREVIEW);

  return <div>
    <h3
      style={{
        marginBottom: rhythm(QUARTER),
      }}
    >
      <Link to={post.fields.slug}>
        {post.frontmatter.title}
      </Link>
      <span className="date">
        {' '}
        {shortDate(post.frontmatter.date)}
      </span>
    </h3>
    <p>{body} <Link to={post.fields.slug}>Read more&nbsp;»</Link></p>
  </div>;
}

// TextPreview.propTypes = {
//   post: React.PropTypes.object.isRequired,
// };

import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';


const QUARTER = 0.25;

export default function PostLink(props) {
  const post = props.post;

  return <div
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
  </div>;
}

// PostLink.propTypes = {
//   post: React.PropTypes.object.isRequired,
// };


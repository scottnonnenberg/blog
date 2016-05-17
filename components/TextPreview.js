import React from 'react';
import { Link } from 'react-router';
import prune from 'underscore.string/prune';

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';
import removeTags from 'utils/removeTags';
import getPreFoldContent from 'utils/getPreFoldContent';


const QUARTER = 0.25;
const MAX_TEXT_PREVIEW = 200;

export default function TextPreview(props) {
  const post = props.post;
  const html = post.data.body;
  const preFold = getPreFoldContent(html);
  const body = prune(removeTags(preFold), MAX_TEXT_PREVIEW);

  return <div>
    <h3
      style={{
        marginBottom: rhythm(QUARTER),
      }}
    >
      <Link to={prefixLink(post.path)}>
        {post.data.title}
      </Link>
      <span className="date">
        {' '}
        {shortDate(post.data.date)}
      </span>
    </h3>
    <p>{body} <Link to={prefixLink(post.path)}>Read more&nbsp;»</Link></p>
  </div>;
}

TextPreview.propTypes = { // eslint-disable-line
  post: React.PropTypes.object.isRequired,
};

import React from 'react';
import { Link } from 'react-router';

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';


const QUARTER = 0.25;

export default function PostLink(props) {
  const post = props.post;
  const data = post.data;

  return <div
    style={{
      marginBottom: rhythm(QUARTER),
    }}
  >
    <Link to={prefixLink(post.path)}>
      {data.title || post.path}
    </Link>
    <span className="date">
      {' '}
      {shortDate(data.date)}
    </span>
  </div>;
}

PostLink.propTypes = { // eslint-disable-line
  post: React.PropTypes.object.isRequired,
};


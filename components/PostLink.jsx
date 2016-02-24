import React from 'react';
import { Link } from 'react-router';

import { link } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';

export default class PostLink extends React.Component {
  render() {
    const post = this.props.post;
    const data = post.data;

    return (
      <div
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(post.path)}>
          {data.title || post.path}
        </Link>
        <span className="date">
          {' ' + shortDate(data.date)}
        </span>
      </div>
    );
  }
}

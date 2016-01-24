import React from 'react';
import { Link } from 'react-router';
import { prune, include as includes } from 'underscore.string';

import find from 'lodash/collection/find';
import { link } from 'gatsby-helpers'

import { rhythm, fontSizeToMS } from 'utils/typography'
import shortDate from 'utils/shortDate';

export default class PostListEntry extends React.Component {
  render() {
    const post = this.props.post;
    const data = post.data;

    return (
      <li
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(post.path)}>{data.title || post.path}</Link>
        <span
          style={{
            color: 'lightgray'
          }}
        >{' ' + shortDate(data.date)}</span>
      </li>
    );
  }
}

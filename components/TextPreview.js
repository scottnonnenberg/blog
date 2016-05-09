import React from 'react';
import { Link } from 'react-router';
import prune from 'underscore.string/prune';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';
import removeTags from 'utils/removeTags';
import getPreFoldContent from 'utils/getPreFoldContent';


export default class TextPreview extends React.Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
  }

  render() {
    const post = this.props.post;
    const html = post.data.body;
    const preFold = getPreFoldContent(html);
    const body = prune(removeTags(preFold), 200);

    return <div>
      <h3
        style={{
          marginBottom: rhythm(0.25),
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
}

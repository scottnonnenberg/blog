import React from 'react';
import { Link } from 'react-router';

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';
import getPreFoldContent from 'utils/getPreFoldContent';
import appendToLastTextBlock from 'utils/appendToLastTextBlock';


const QUARTER = 0.25;

export default class HTMLPreview extends React.Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
  }

  render() {
    const post = this.props.post;

    if (!post) {
      return;
    }

    const html = post.data.body;
    const preFold = getPreFoldContent(html);
    const textLink = ` <a href="${prefixLink(post.path)}">Read more&nbsp;»</a>`;
    const callToAction = appendToLastTextBlock(preFold, textLink);

    return <div>
      <h2
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
      </h2>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: callToAction }}
      />
    </div>;
  }
}

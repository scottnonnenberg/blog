import React from 'react';
import { Link } from 'react-router';
import catchLinks from 'catch-links';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';
import getPreFoldContent from 'utils/getPreFoldContent';
import appendToLastTextBlock from 'utils/appendToLastTextBlock';


export default class HTMLPreview extends React.Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    catchLinks(this.refs.html, href => this.context.router.push(href));
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
      </h2>
      <div
        className="markdown"
        ref="html"
        dangerouslySetInnerHTML={{ __html: callToAction }}
      />
    </div>;
  }
}

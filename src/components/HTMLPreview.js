import React from 'react';
import { Link } from 'gatsby';

import { rhythm } from 'src/util/typography';
import shortDate from 'src/util/shortDate';
import getPreFoldContent from 'src/util/getPreFoldContent';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';


const QUARTER = 0.25;

export default class HTMLPreview extends React.Component {
  // static propTypes = {
  //   post: React.PropTypes.object.isRequired,
  // }

  getHTMLPreview(post) {
    const preFold = getPreFoldContent(post.html);
    const textLink = ` <a href="${post.fields.slug}">Read more&nbsp;»</a>`;
    return appendToLastTextBlock(preFold, textLink);
  }

  render() {
    const post = this.props.post;
    const preview = this.getHTMLPreview(post);

    return <div>
      <h2
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
      </h2>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>;
  }
}

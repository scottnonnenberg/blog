import React from 'react';
import { Link, Navigation } from 'react-router';
import catchLinks from 'catch-links';

import { link } from 'gatsby-helpers'

import { rhythm, fontSizeToMS } from 'utils/typography'
import shortDate from 'utils/shortDate';
import getPreFoldContent from 'utils/getPreFoldContent';
import appendToLastTextBlock from 'utils/appendToLastTextBlock';


export default React.createClass({
  displayName: 'HTMLPreview',

  mixins: [Navigation],

  componentDidMount() {
    var _this = this;

    catchLinks(this.refs.html, function(href) {
      _this.transitionTo(href);
    });
  },

  render() {
    const post = this.props.post;

    if (!post) {
      return;
    }

    const html = post.data.body;
    const preFold = getPreFoldContent(html);
    const textLink = ` <a href="${link(post.path)}">Read more »</a>`;
    const callToAction = appendToLastTextBlock(preFold, textLink);

    return <div>
      <h2
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(post.path)}>
          {post.data.title}
        </Link>
        <span className="date">
          {' ' + shortDate(post.data.date)}
        </span>
      </h2>
      <div
        className="markdown"
        ref="html"
        dangerouslySetInnerHTML={{__html: callToAction}}
      />
    </div>;
  }
});

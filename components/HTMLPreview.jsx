import React from 'react';
import { Link } from 'react-router';
import catchLinks from 'catch-links';

import { link } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';
import getPreFoldContent from 'utils/getPreFoldContent';
import appendToLastTextBlock from 'utils/appendToLastTextBlock';


export default React.createClass({
  displayName: 'HTMLPreview',

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    var _this = this;

    catchLinks(this.refs.html, function(href) {
      _this.context.router.push(href);
    });
  },

  render() {
    const post = this.props.post;

    if (!post) {
      return;
    }

    const html = post.data.body;
    const preFold = getPreFoldContent(html);
    const textLink = ` <a href="${link(post.path)}">Read more&nbsp;»</a>`;
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

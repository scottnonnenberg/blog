import React from 'react';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import { link } from 'gatsby-helpers';
import ReadMore from '../components/ReadMore';
import { rhythm, fontSizeToMS } from 'utils/typography'

import '../css/zenburn.css';

module.exports = React.createClass({
  render: function() {
    var post
    post = this.props.page.data;

    return (
      <DocumentTitle title={`${post.title} | ${this.props.config.blogTitle}`}>
        <div className="markdown">
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.body}}/>
          <em
            style={{
              display: 'block',
              marginBottom: rhythm(2)
            }}
          >
            Posted {moment(post.date).format('MMMM D, YYYY')}
          </em>
          <hr
            style={{
              marginBottom: rhythm(1)
            }}
          />
          <p>
            <img
              src={link("//www.gravatar.com/avatar/6d4e229c0d24e92a2d15499acab531d8?d=404")}
              style={{
                float: 'left',
                marginRight: rhythm(1/4),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2)
              }}
            />
            <strong>{this.props.config.authorName}</strong> lives and works in Seattle building useful things. <a href="https://twitter.com/scottnonnenberg">New entries are posted on Twitter!</a>
          </p>
          <hr
            style={{
              marginBottom: rhythm(2)
            }}
          />
          <ReadMore post={post} {...this.props}/>
        </div>
      </DocumentTitle>
    );
  }
});

import React from 'react';
import { Link } from 'react-router';
import { prune, include as includes } from 'underscore.string';

import find from 'lodash/collection/find';
import { link } from 'gatsby-helpers';

import { rhythm, fontSizeToMS } from 'utils/typography'

export default class Author extends React.Component {
  render() {
    return (
      <div className="author">
        <a href="https://scottnonnenberg.com"><img
          src="//www.gravatar.com/avatar/6d4e229c0d24e92a2d15499acab531d8?d=404"
          style={{
            float: 'left',
            marginRight: rhythm(1/4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2)
          }}
        /></a>
        Hi, I'm <a href="https://scottnonnenberg.com"><strong>{this.props.config.authorShortName}</strong></a>.
        I'm a <a href="http://calpoly.edu">Computer Science major</a> turned <a href="http://visualstudio.com">Visual Studio</a> program
        manager, now consultant and entrepreneur. <a href="mailto:scott@nonnenberg.com">Contact me</a> if
        you need some training, coding, or just an experienced outside perspective!
      </div>
    );
  }
};

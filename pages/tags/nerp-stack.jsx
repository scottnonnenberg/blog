import React from 'react';

import TagPage from 'components/TagPage';


export default class TaggedWithFun extends React.Component {
  render() {
    return <TagPage tag="nerp-stack" {...this.props} />
  }
}

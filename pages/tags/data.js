import React from 'react';

import TagPage from 'components/TagPage';


export default class TagPageHost extends React.Component {
  render() {
    return <TagPage tag="data" {...this.props} />;
  }
}

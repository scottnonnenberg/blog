'use strict';

import React from 'react';
import withSideEffect from 'react-side-effect';

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.state;
  }
}

function handleStateChangeOnClient() {
  // no-op; entirely to pass state up for top-level attributes
}

const CurrentState = React.createClass({
  displayName: 'CurrentState',
  propTypes: {
    state: React.PropTypes.object.isRequired
  },

  render: function() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(CurrentState);

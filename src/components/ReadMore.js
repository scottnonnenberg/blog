import React from 'react';

import TextPreview from './TextPreview';


export default class ReadMore extends React.Component {
  // static propTypes = {
  //   previous: React.PropTypes.object.isRequired,
  //   next: React.PropTypes.array.isRequired,
  // }

  renderItem(label, post) {
    if (!post) {
      return null;
    }

    return <div>
      <h5
        style={{
          margin: 0,
          fontSize: '0.78615rem',
          lineHeight: '1.72222rem',
          letterSpacing: '-0.5px',
        }}
      >
        {label}:
      </h5>
      <TextPreview post={post} />
    </div>;
  }

  render() {
    const { previous, next } = this.props;

    if (!previous && !next) {
      return null;
    }

    return (
      <div>
        {this.renderItem('NEXT', next)}
        {this.renderItem('PREVIOUS', previous)}
      </div>
    );
  }
}

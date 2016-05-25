import React from 'react';

import { config } from 'config';

import { rhythm } from 'src/util/typography';


const QUARTER = 0.25;

export default function Author() {
  const icon = config.authorIcon;
  const url = config.authorURL;
  const blurb = config.authorBlurb;

  return <div className="author">
    <a href={url}><img
      src={icon}
      style={{
        float: 'left',
        marginRight: rhythm(QUARTER),
        marginBottom: 0,
        width: rhythm(2),
        height: rhythm(2),
      }}
      alt="It's me!"
    /></a>
    <div dangerouslySetInnerHTML={{ __html: blurb }} />
  </div>;
}

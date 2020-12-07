import type { ReactElement } from 'react';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import {
  backupImage,
  container,
  image,
  padding,
  parent,
} from './AuthorImage.module.scss';

type ImgFixedQueryType = {
  file: {
    childImageSharp: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fixed: any;
    };
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export function AuthorImage(): ReactElement {
  const data: ImgFixedQueryType = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "me_2012_square_300px.jpg" }) {
        childImageSharp {
          fixed(width: 75, height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { fixed } = data.file.childImageSharp;

  return (
    <div className={parent}>
      <Img fixed={fixed} objectFit="cover" objectPosition="50% 50%" alt="It's me!" />
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

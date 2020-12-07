import React, { ReactElement } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import styles from './AuthorImage.module.scss';

type ImgFixedQueryType = {
  file: {
    childImageSharp: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fixed: any;
    };
  };
};

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
    <div className={styles.parent}>
      <Img fixed={fixed} objectFit="cover" objectPosition="50% 50%" alt="It's me!" />
    </div>
  );
}

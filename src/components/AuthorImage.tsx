import type { ReactElement } from 'react';
import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

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
      fixed: {
        base64: string;
        width: string;
        height: string;
        sizes: string;
        src: string;
        srcSet: string;
      };
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
    <div className={parent}>
      <div
        className={container}
        style={{
          width: `${fixed.width}px`,
          height: `${fixed.height}px`,
        }}
      >
        <div aria-hidden="true" className={padding} />
        <img
          aria-hidden="true"
          className={backupImage}
          src={fixed.base64}
          alt="Placeholder of me for page load"
        />
        <picture>
          <source srcSet={fixed.srcSet} sizes={fixed.sizes} />
          <img
            className={image}
            sizes={fixed.sizes}
            srcSet={fixed.srcSet}
            src={fixed.src}
            alt="It's me!"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
}

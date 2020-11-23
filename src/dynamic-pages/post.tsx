import React, { ReactElement } from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import moment from 'moment';
import map from 'lodash/map';

import intersperse from 'src/util/intersperse';
import shortDate from 'src/util/shortDate';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import ReadMore from 'src/components/ReadMore';
import EmailSignup from 'src/components/EmailSignup';

import styles from './post.module.less';

import { PostType } from 'src/types/Post';

type PageContextType = {
  previous?: PostType;
  next?: PostType;
};

type DataType = {
  markdownRemark: PostType;
};

export type PropsType = PageProps<DataType, PageContextType>;

export default function post({
  data,
  location,
  pageContext,
}: PropsType): ReactElement | null {
  const { previous, next } = pageContext;
  const post = data.markdownRemark;

  const title = post?.frontmatter?.title;
  if (!title) {
    throw new Error(`Page had missing title: ${JSON.stringify(post)}`);
  }

  const postDate = post?.frontmatter?.date;
  if (!postDate) {
    throw new Error(`Page had missing post date: ${JSON.stringify(post)}`);
  }

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} post={post} location={location} />
      <h1 className={styles.header}>{title}</h1>
      <h3 className={styles.subHeader}>{shortDate(postDate)}</h3>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html || '' }} />
      <EmailSignup callToAction="Enjoy this post? Sign up for free updates!" />
      <div className={styles.metadata}>
        <div>
          <em>Posted:</em>
          {` ${moment(postDate).format('MMMM D, YYYY')}`}
        </div>
        {renderTagLinks(post?.frontmatter?.tags)}
      </div>
      <hr className={styles.divider} />
      <ReadMore previous={previous} next={next} />
    </Wrapper>
  );
}

function renderTagLinks(tags?: Array<string>): ReactElement | null {
  if (!tags || !tags.length) {
    return null;
  }

  const tagLinks = map(tags, tag => (
    <Link key={tag} to={`/tags/${tag}/`}>
      {tag}
    </Link>
  ));

  return (
    <div>
      <em>Tags:</em> {intersperse(tagLinks, ', ')}
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;

import React, { ReactElement } from 'react';
import { graphql, Link, PageProps } from 'gatsby';

import { intersperse } from 'src/util/intersperse';
import { shortDate } from 'src/util/shortDate';
import { longDate } from 'src/util/longDate';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import EmailSignup from 'src/components/EmailSignup';
import ReadMore from 'src/components/ReadMore';

import Markdown from 'src/components/Markdown';

import styles from './post.module.scss';

import { PostType } from 'src/types/Post';

type PageContextType = {
  previous?: PostType;
  next?: PostType;
};

type DataType = {
  markdownRemark: PostType;
  site: {
    siteMetadata: {
      currentCommit: string;
      github: string;
    };
  };
};

export type PropsType = PageProps<DataType, PageContextType>;

export default function post({
  data,
  location,
  pageContext,
}: PropsType): ReactElement | null {
  const { previous, next } = pageContext;

  const currentCommit = data.site.siteMetadata.currentCommit;
  if (!currentCommit) {
    throw new Error(`post.tsx couldn't get currentCommit: ${JSON.stringify(data.site)}`);
  }

  const github = data.site.siteMetadata.github;
  if (!github) {
    throw new Error(`post.tsx couldn't get github: ${JSON.stringify(data.site)}`);
  }

  const post = data.markdownRemark;
  const title = post?.frontmatter?.title;
  if (!title) {
    throw new Error(`post.tsx had missing title: ${JSON.stringify(post)}`);
  }

  const postDate = post?.frontmatter?.date;
  if (!postDate) {
    throw new Error(`post.tsx had missing post date: ${JSON.stringify(post)}`);
  }

  const relativePath = post?.fields?.relativePath;
  if (!relativePath) {
    throw new Error(`post.tsx had missing relativePath: ${JSON.stringify(post)}`);
  }

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} post={post} location={location} />
      <h1 className={styles.header}>{title}</h1>
      <div className={styles.date}>{shortDate(postDate)}</div>
      <Markdown html={post.html} />
      <EmailSignup callToAction="Enjoy this post? Sign up for free updates!" />
      <div className={styles.metadata}>
        <div>
          <em>Posted:</em>
          {` ${longDate(postDate)}`}
        </div>
        {renderTagLinks(post?.frontmatter?.tags)}
        <div>
          <em>On GitHub:</em>{' '}
          <a href={`${github}/blob/${currentCommit}/${relativePath}`}>{relativePath}</a>
        </div>
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

  const tagLinks = tags.map(tag => (
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
    site {
      siteMetadata {
        currentCommit
        github
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      textPreview
      fields {
        slug
        relativePath
      }
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;

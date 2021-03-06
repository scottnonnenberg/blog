import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

import { shortDate } from 'src/util/shortDate';

import Markdown from './Markdown';

import styles from './HTMLPreview.module.scss';

import { PostType } from 'src/types/Post';

type PropsType = {
  post: PostType;
};

export default function HTMLPreview(props: PropsType): ReactElement | null {
  const { post } = props;

  const slug = post?.fields?.slug;
  if (!slug) {
    throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
  }

  const htmlPreview = post?.htmlPreview;
  if (!htmlPreview) {
    throw new Error(`Page had missing htmlPreview: ${JSON.stringify(post)}`);
  }

  const title = post?.frontmatter?.title;
  if (!title) {
    throw new Error(`Page had missing title: ${JSON.stringify(post)}`);
  }

  const postDate = post?.frontmatter?.date;
  if (!postDate) {
    throw new Error(`Page had missing post date: ${JSON.stringify(post)}`);
  }

  return (
    <div>
      <h2 className={styles.title}>
        <Link to={slug}>{title}</Link>{' '}
        <span className={styles.date}>{shortDate(postDate)}</span>
      </h2>
      <Markdown html={htmlPreview} />
    </div>
  );
}

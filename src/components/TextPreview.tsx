import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

import styles from './TextPreview.module.scss';

import { shortDate } from 'src/util/shortDate';

import { PostType } from 'src/types/Post';

type PropsType = {
  post: PostType;
};

export default function TextPreview(props: PropsType): ReactElement | null {
  const post = props.post;

  const slug = post?.fields?.slug;
  if (!slug) {
    throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
  }

  const textPreview = post?.textPreview;
  if (!textPreview) {
    throw new Error(`Page had missing textPreview: ${JSON.stringify(post)}`);
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
    <div className={styles.container}>
      <h3 className={styles.title}>
        <Link to={slug}>{title}</Link>{' '}
        <span className={styles.date}>{shortDate(postDate)}</span>
      </h3>
      <p>
        {`${textPreview} `}
        <Link to={slug}>Read more&nbsp;»</Link>
      </p>
    </div>
  );
}

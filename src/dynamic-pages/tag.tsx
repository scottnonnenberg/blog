import React, { ReactElement } from 'react';
import { PageProps } from 'gatsby';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';

import { getTextPreviews, getPostLinks } from '../pages/index';

import { PostType } from 'src/types/Post';

const TEXT_PREVIEW_POSTS = 5;

type PageContextType = {
  tag: string;
  postsWithTag: Array<PostType>;
};

export type PropsType = PageProps<null, PageContextType>;

export default function tag({ location, pageContext }: PropsType): ReactElement | null {
  const { tag, postsWithTag } = pageContext;
  const title = `Posts tagged '${tag}'`;

  const text = postsWithTag.slice(0, TEXT_PREVIEW_POSTS);
  const link = postsWithTag.slice(TEXT_PREVIEW_POSTS);

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      {getTextPreviews(text)}
      {getPostLinks(link)}
    </Wrapper>
  );
}

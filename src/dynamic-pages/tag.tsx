import React, { ReactElement } from 'react';
import { PageProps } from 'gatsby';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import { getTextPreviews, getPostLinks } from '../pages/index';

import { PostType } from 'src/types/Post';

type PageContextType = {
  tag: string;
  withText: Array<PostType>;
  justLink: Array<PostType>;
};

export type PropsType = PageProps<null, PageContextType>;

export default function tag({ location, pageContext }: PropsType): ReactElement | null {
  const { tag, withText, justLink } = pageContext;
  const title = `Posts tagged '${tag}'`;

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      {getTextPreviews(withText)}
      {getPostLinks(justLink)}
    </Wrapper>
  );
}

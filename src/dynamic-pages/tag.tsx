import type { ReactElement } from 'react';
import React from 'react';
import type { PageProps } from 'gatsby';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import type { PostType } from 'src/types/Post';
import { getTextPreviews, getPostLinks } from 'src/pages/index';

type PageContextType = {
  tag: string;
  withText: Array<PostType>;
  justLink: Array<PostType>;
};

export type PropsType = PageProps<null, PageContextType>;

export default function tag({ location, pageContext }: PropsType): ReactElement | null {
  const { tag: tagName, withText, justLink } = pageContext;
  const title = `Posts tagged '${tagName}'`;

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      {getTextPreviews(withText)}
      {getPostLinks(justLink)}
    </Wrapper>
  );
}

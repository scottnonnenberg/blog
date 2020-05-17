import React from 'react';
import { PageProps } from 'gatsby';

import map from 'lodash/map';

import { rhythm } from 'src/util/typography';

import SEO from 'src/components/SEO';
import Author from 'src/components/Author';
import Wrapper from 'src/components/Wrapper';

import TextPreview from 'src/components/TextPreview';
import PostLink from 'src/components/PostLink';

import { PostType } from 'src/types/Post';

const TEXT_PREVIEW_POSTS = 5;

type PageContextType = {
  tag: string;
  postsWithTag: Array<PostType>;
}

export function _getTextPreviews(posts: Array<PostType>) {
  const sliced = posts.slice(0, TEXT_PREVIEW_POSTS);
  return map(sliced, post => <TextPreview key={post?.frontmatter?.path} post={post} />);
}

export function _getPlain(posts: Array<PostType>) {
  const plainPosts = posts.slice(TEXT_PREVIEW_POSTS);
  return map(plainPosts, post => <PostLink key={post?.frontmatter?.path} post={post} />);
}

export default function Tag({ location, pageContext }: PageProps<null, PageContextType>) {
  const { tag, postsWithTag } = pageContext;
  const title = `Posts tagged '${tag}'`;

  return (
    <Wrapper location={location} >
      <SEO pageTitle={title} location={location} />
      <div>
        <h1>{title}</h1>
        {_getTextPreviews(postsWithTag)}
        {_getPlain(postsWithTag)}
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(2),
          }}
        />
        <Author />
      </div>
    </Wrapper>
  );
}

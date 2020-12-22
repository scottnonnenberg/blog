import { PostType } from './Post.d';
import { SiteMetadataType } from './SiteMetadata.d';

export type MarkdownRemarkResultType = {
  edges: Array<{
    node: PostType;
  }>;
};

export type AllPostsQueryType = {
  allMarkdownRemark: MarkdownRemarkResultType;
};

export type SplitPostsQueryType = {
  withHtml: MarkdownRemarkResultType;
  withText: MarkdownRemarkResultType;
  justLink: MarkdownRemarkResultType;
};

export type SiteMetadataQueryType = {
  site: {
    siteMetadata: SiteMetadataType;
  };
};

export type AllDataQueryType = AllPostsQueryType & SiteMetadataQueryType;

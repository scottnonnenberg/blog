import { PostType } from './Post.d';
import { SiteMetadataType } from './SiteMetadata.d';

export type AllPostsQueryType = {
  allMarkdownRemark: {
    edges: Array<{
      node: PostType;
    }>;
  };
};

export type SiteMetadataQueryType = {
  site: {
    siteMetadata: SiteMetadataType;
  };
};

export type AllDataQueryType = AllPostsQueryType & SiteMetadataQueryType;

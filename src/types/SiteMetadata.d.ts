export type SiteMetadataType = {
  blogTitle: string;
  tagLine: string;
  domain: string;

  favicon: string;

  currentCommit: string;
  github: string;

  author: {
    shortName: string;
    name: string;
    email: string;
    twitter: string;
    mastodon: string;
    url: string;
    image: string;
    blurb: string;
  };
};

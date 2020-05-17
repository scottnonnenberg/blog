export type PostType = {
  html?: string;
  path?: string;
  contents?: string;
  fields?: {
    slug?: string;
  };
  frontmatter?: PostAttributesType;
};

export type PostAttributesType = {
  title?: string;
  date?: string;
  path?: string;
  tags?: Array<string>;
  rank?: number;
};

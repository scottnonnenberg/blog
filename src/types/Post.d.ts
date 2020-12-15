export type PostType = {
  html?: string;
  htmlPreview?: string;
  textPreview?: string;
  path?: string;
  contents?: string;
  fields?: {
    slug?: string;
    relativePath?: string;
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

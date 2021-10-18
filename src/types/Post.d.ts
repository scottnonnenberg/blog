export type PostType = {
  html?: string;
  htmlPreview?: string;
  textPreview?: string;
  path?: string;
  fields?: {
    slug?: string;
    relativePath?: string;
  };
  frontmatter?: PostAttributesType;
};

export type PostAttributesType = {
  date?: string;
  path?: string;
  rank?: number;
  tags?: Array<string>;
  title?: string;
  updatedCommit?: string;
  updatedDate?: string;
};

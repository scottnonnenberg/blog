import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';

import { PostType, PostAttributesType } from 'src/types/Post.d';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: false,
});
const fileFilter = /.md$/;

type PostFrontMatterResultType = {
  attributes: PostAttributesType;
  body: string;
};

export default function loadPosts(
  options: {
    limit?: number;
    markdown?: boolean;
  } = {}
): Array<PostType> {
  const limit = options.limit || Infinity;
  const markdown = typeof options.markdown === 'undefined' ? true : options.markdown;

  const postsPath = path.join(__dirname, '../../pages/posts');
  const postFiles = fs.readdirSync(postsPath);

  return _.chain(postFiles)
    .filter(file => fileFilter.test(file))
    .sortBy()
    .reverse()
    .take(limit)
    .map(file => {
      const filePath = path.join(postsPath, file);
      const contents = fs.readFileSync(filePath).toString();
      const metadata: PostFrontMatterResultType = frontMatter(contents);

      return {
        path: filePath,
        contents,
        fields: {
          slug: metadata.attributes.path,
        },
        html: markdown ? md.render(metadata.body) : undefined,
        frontmatter: metadata.attributes,
      };
    })
    .value();
}

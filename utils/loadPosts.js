import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export default function loadPosts() {
  const postsPath = path.join(__dirname, '../pages/posts');
  const postFiles = fs.readdirSync(postsPath);

  const posts = _.map(postFiles, function(file) {
    const filePath = path.join(postsPath, file);
    const contents = fs.readFileSync(filePath).toString();
    const metadata = frontMatter(contents);

    return {
      path: filePath,
      contents: contents,
      body: md.render(metadata.body),
      data: metadata.attributes
    };
  });

  return _.sortBy(posts, page => page.data.date).reverse();
}


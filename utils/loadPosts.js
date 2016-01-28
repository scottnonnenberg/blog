import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import frontMatter from 'front-matter';

export default function loadPosts() {
  const postsPath = path.join(__dirname, '../pages/posts');
  const postFiles = fs.readdirSync(postsPath);

  return _.map(postFiles, function(file) {
    const filePath = path.join(postsPath, file);
    const contents = fs.readFileSync(filePath).toString();
    const metadata = frontMatter(contents);

    return {
      path: filePath,
      contents: contents,
      body: metadata.body,
      data: metadata.attributes
    };
  });
}

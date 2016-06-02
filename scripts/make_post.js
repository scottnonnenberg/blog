import './util/setupModulePath';

import fs from 'fs';
import path from 'path';
import _string from 'underscore.string';

import moment from 'moment';

import loadPosts from 'scripts/util/loadPosts';


const templatePath = path.join(__dirname, 'util/_postTemplate.md');
const template = fs.readFileSync(templatePath).toString();

const now = new Date();
const date = now.toJSON();

const title = process.argv[2];
const titleSlug = _string.slugify(title);
const postPath = `/${titleSlug}/`;

const posts = loadPosts({
  limit: 1,
  markdown: false,
});
const previous = posts[0];
const previousPath = previous.data.path;

const newContents = template
  .replace('TITLE', title)
  .replace('DATE', date)
  .replace('PATH', postPath)
  .replace('PREVIOUS', previousPath);

const filePathDate = moment(now).format('YYYY-MM-DD');
const newFilePath =
  path.join(__dirname, `../pages/posts/${filePathDate}-${titleSlug}.md`);

fs.writeFileSync(newFilePath, newContents);

const nextSearch = /^next:( \/[^\/]+\/)?$/m; // eslint-disable-line
const match = nextSearch.exec(previous.contents);

if (match && match[0]) {
  const next = `next: ${postPath}`;
  const previousContents = previous.contents.replace(nextSearch, next);

  fs.writeFileSync(previous.path, previousContents);
}

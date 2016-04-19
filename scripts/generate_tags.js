import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import loadPosts from '../utils/loadPosts';
import getTagCounts from '../utils/getTagCounts';
import writeIfDifferent from '../utils/writeIfDifferent';


const posts = loadPosts({
  markdown: false
});
const counts = getTagCounts(posts);

console.log(counts);

const templatePath = path.join(__dirname, '../components/_tagTemplate.js');
const template = fs.readFileSync(templatePath).toString();
const findTag = /"TAG"/m;

_.forEach(_.keys(counts), function(tag) {
  const filePath = path.join(__dirname, '../pages/tags', tag + '.js');
  const contents = template.replace(findTag, `"${tag}"`);

  writeIfDifferent(filePath, contents);
});

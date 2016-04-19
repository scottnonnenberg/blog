import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import loadPosts from '../utils/loadPosts';
import getTagCounts from '../utils/getTagCounts';


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

  try {
    const currentContents = fs.readFileSync(filePath).toString();
    if (currentContents === contents) {
      return;
    }
  }
  catch (err) {
    // file doesn't exist; need to write it
  }

  console.log('writing page for tag ' + tag);

  fs.writeFileSync(filePath, contents);
});

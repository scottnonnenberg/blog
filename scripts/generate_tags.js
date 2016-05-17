import './util/setupModulePath'; // eslint-disable-line

import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import getTagCounts from 'src/util/getTagCounts';

import writeIfDifferent from 'scripts/util/writeIfDifferent';
import loadPosts from 'scripts/util/loadPosts';


const posts = loadPosts({
  markdown: false,
});
const counts = getTagCounts(posts);

console.log(counts);

const templatePath = path.join(__dirname, '../components/_tagTemplate.js');
const template = fs.readFileSync(templatePath).toString();
const findTag = /"TAG"/m;

_.forEach(_.keys(counts), tag => {
  const filePath = path.join(__dirname, '../pages/tags', `${tag}.js`);
  const contents = template.replace(findTag, `"${tag}"`);

  writeIfDifferent(filePath, contents);
});

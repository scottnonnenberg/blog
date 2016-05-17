import './util/setupModulePath'; // eslint-disable-line

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import toml from 'toml';

import getPreFoldContent from 'src/util/getPreFoldContent';
import fixLocalLinks from 'src/util/fixLocalLinks';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';

import loadPosts from 'scripts/util/loadPosts';

const RECENT_LIMIT = 10;

const allPath = path.join(__dirname, '../public/all.json');
const recentPath = path.join(__dirname, '../public/recent.json');
const configPath = path.join(__dirname, '../config.toml');

const config = toml.parse(fs.readFileSync(configPath).toString());

const posts = loadPosts();

const json = _.map(posts, post => {
  const preFoldContent = fixLocalLinks(getPreFoldContent(post.body), config.domain);
  const url = config.domain + post.data.path;
  const readMore = ` <a href="${url}">Read more&nbsp;»</a>`;
  const withCallToAction = appendToLastTextBlock(preFoldContent, readMore);

  return {
    title: post.data.title,
    date: post.data.date,
    preview: withCallToAction,
    url,
    tags: post.data.tags,
  };
});

fs.writeFileSync(allPath, JSON.stringify(json, null, '  '));
fs.writeFileSync(recentPath, JSON.stringify(json.slice(0, RECENT_LIMIT), null, '  '));

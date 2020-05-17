import './util/setupModulePath';

import fs from 'fs';
import path from 'path';

import { map, compact } from 'lodash';

import * as globalConfig from 'gatsby-config';

import getPreFoldContent from 'src/util/getPreFoldContent';
import fixLocalLinks from 'src/util/fixLocalLinks';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';

import loadPosts from 'scripts/util/loadPosts';

const RECENT_LIMIT = 10;

const allPath = path.join(__dirname, '../public/all.json');
const recentPath = path.join(__dirname, '../public/recent.json');

const config = globalConfig.siteMetadata;

const posts = loadPosts();

const json = compact(map(posts, post => {
  if (!post.frontmatter) {
    console.error('Malformed post', post);
    throw new Error('Post was missing frontmatter!');
  }

  const preFoldContent = fixLocalLinks(getPreFoldContent(post.html), config.domain);
  const url = config.domain + post.frontmatter.path;
  const readMore = ` <a href="${url}">Read more&nbsp;»</a>`;
  const withCallToAction = appendToLastTextBlock(preFoldContent, readMore);

  return {
    title: post.frontmatter.title,
    date: post.frontmatter.date,
    preview: withCallToAction,
    url,
    tags: post.frontmatter.tags,
  };
}));

fs.writeFileSync(allPath, JSON.stringify(json, null, '  '));
fs.writeFileSync(recentPath, JSON.stringify(json.slice(0, RECENT_LIMIT), null, '  '));

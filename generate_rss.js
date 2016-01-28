import fs from 'fs';
import path from 'path';

import moment from 'moment';
import Feed from 'feed';
import _ from 'lodash';
import toml from 'toml';

import loadPosts from './utils/loadPosts';
import getPreFoldContent from './utils/getPreFoldContent';


const now = moment(new Date());

const configPath = path.join(__dirname, 'config.toml');
const config = toml.parse(fs.readFileSync(configPath).toString());

const posts = loadPosts();
const recentPosts = posts.slice(0, 20);

const author = {
  name: config.authorName,
  email: config.authorEmail,
  link: config.authorURL
};

const feed = new Feed({
  title: config.blogTitle,
  id: 'something?',
  description: config.tagLine,
  link: config.domain,
  copyright: `All rights reserved ${now.format('YYYY')}, Scott Nonnenberg`,
  updated: now.toJSON(),
  feed: config.domain + '/atom.xml',

  author
});

_.forEach(recentPosts, function(post) {
  const data = post.data;
  const preFoldContent = getPreFoldContent(post.body);

  feed.addItem({
    title: data.title,
    link: config.domain + data.path,
    description: preFoldContent,
    content: post.body,
    date: data.date,
    author: [author]
  });
});

fs.writeFileSync('public/rss.xml', feed.render('rss-2.0'));
fs.writeFileSync('public/atom.xml', feed.render('atom-1.0'));

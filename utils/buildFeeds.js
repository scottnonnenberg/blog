import fs from 'fs';
import path from 'path';

import Feed from 'feed';
import _ from 'lodash';
import moment from 'moment';
import toml from 'toml';

import getPreFoldContent from './getPreFoldContent';


const configPath = path.join(__dirname, '../config.toml');

export default function buildFeeds(posts) {
  const config = toml.parse(fs.readFileSync(configPath).toString());
  const now = moment(new Date());

  const author = {
    name: config.authorName,
    email: config.authorEmail,
    link: config.authorURL
  };

  const feed = new Feed({
    title: config.blogTitle,
    id: config.domain,
    description: config.tagLine,
    link: config.domain,
    copyright: `All rights reserved ${now.format('YYYY')}, Scott Nonnenberg`,
    updated: now.toJSON(),
    feed: config.domain + '/atom.xml',
    author
  });

  _.forEach(posts, function(post) {
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
}

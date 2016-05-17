import fs from 'fs';
import path from 'path';

import Feed from 'feed';
import _ from 'lodash';
import moment from 'moment';
import toml from 'toml';

import getPreFoldContent from 'src/util/getPreFoldContent';
import fixLocalLinks from 'src/util/fixLocalLinks';
import removeTags from 'src/util/removeTags';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';


const configPath = path.join(__dirname, '../../config.toml');

export default function buildFeeds(posts) {
  const config = toml.parse(fs.readFileSync(configPath).toString());
  const now = moment(new Date());

  const author = {
    name: config.authorName,
    email: config.authorEmail,
    link: config.authorURL,
  };

  const feed = new Feed({
    title: config.blogTitle,
    id: config.domain,
    description: removeTags(config.tagLine),
    link: config.domain,
    copyright: `All rights reserved ${now.format('YYYY')}, Scott Nonnenberg`,
    updated: now.toJSON(),
    feed: `${config.domain}/atom.xml`,
    author,
  });

  _.forEach(posts, post => {
    const data = post.data;
    const preFoldContent = fixLocalLinks(getPreFoldContent(post.body), config.domain);
    const url = config.domain + data.path;
    const readMore = ` <a href="${url}">Read more&nbsp;»</a>`;
    const withCallToAction = appendToLastTextBlock(preFoldContent, readMore);

    feed.addItem({
      title: data.title,
      link: url,
      description: withCallToAction,
      content: fixLocalLinks(post.body, config.domain),
      date: data.date,
      author: [author],
    });
  });

  fs.writeFileSync('public/rss.xml', feed.render('rss-2.0'));
  fs.writeFileSync('public/atom.xml', feed.render('atom-1.0'));
}

import fs from 'fs';

import { Feed } from 'feed';
import _ from 'lodash';
import moment from 'moment';

import getPreFoldContent from 'src/util/getPreFoldContent';
import fixLocalLinks from 'src/util/fixLocalLinks';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';

import globalConfig from 'gatsbyConfig';

import { PostType } from 'src/types/Post.d';

const config = globalConfig.siteMetadata;

export default function buildFeeds(posts: Array<PostType>): void {
  const now = moment(new Date());

  const author = {
    name: config.author.name,
    email: config.author.email,
    link: config.author.url,
  };

  const feed = new Feed({
    title: config.blogTitle,
    id: `${config.domain}/`,
    description: config.tagLine,
    link: config.domain,
    copyright: `All rights reserved ${now.format('YYYY')}, Scott Nonnenberg`,
    feed: `${config.domain}/atom.xml`,
    author,
  });

  _.forEach(posts, post => {
    if (!post.frontmatter) {
      console.error('Malformed post', post);
      throw new Error('Post was missing frontmatter!');
    }

    const data = post.frontmatter;
    if (!data.title || !data.date) {
      console.error('Malformed post', post);
      throw new Error('Post metadata was missing title or date');
    }

    const preFoldContent = fixLocalLinks(getPreFoldContent(post.html), config.domain);
    const url = config.domain + data.path;
    const readMore = ` <a href="${url}">Read more&nbsp;»</a>`;
    const withCallToAction = appendToLastTextBlock(preFoldContent, readMore);

    feed.addItem({
      title: data.title,
      link: url,
      description: withCallToAction,
      content: fixLocalLinks(post.html, config.domain),
      date: new Date(data.date),
      author: [author],
    });
  });

  fs.writeFileSync('public/rss.xml', feed.rss2());
  fs.writeFileSync('public/atom.xml', feed.atom1());
}

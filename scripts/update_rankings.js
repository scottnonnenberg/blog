/* eslint-disable camelcase */

import './util/setupModulePath';

import fs from 'fs';

import superagent from 'superagent';
import _ from 'lodash';

import piwikConfig from 'piwik';
import loadPosts from 'scripts/util/loadPosts';


const SUCCESS = 200;

const posts = loadPosts({
  markdown: false,
});

const lookup = _.chain(posts)
  .map(post => [post.data.path, post])
  .fromPairs()
  .value();

function getNewContents(rank, contents) {
  const existingRank = /^rank: [0-9]+$/m;
  // allows for blank newlines
  const newRank = /^[^-]*---/;

  if (existingRank.test(contents)) {
    return contents.replace(existingRank, `rank: ${rank}`);
  }

  return contents.replace(newRank, `---\nrank: ${rank}`);
}

superagent
  .get(`${piwikConfig.domain}/index.php`)
  .query({
    module: 'API',
    method: 'Actions.getPageUrls',
    format: 'JSON',
    idSite: piwikConfig.id,
    period: 'range',
    date: '2013-1-1,2017-2-10',
    expanded: 1,
    token_auth: piwikConfig.token,
    filter_limit: 100,
  })
  .end((err, res) => {
    if (err) {
      throw err;
    }
    if (res.status !== SUCCESS) {
      throw new Error(`non-200 response! ${res.text}`);
    }

    const items = _(res.body)
      .map(entry => ({
        ...entry,
        url: `/${entry.label}/`,
      }))
      .filter(entry => {
        // these get way too much search traffic
        if (entry.url === '/how-not-to-do-customer-service-credit-card-edition/'
          || entry.url === '/why-i-left-liffft/') {
          return false;
        }

        return Boolean(lookup[entry.url]);
      })
      .map(entry => {
        // accounting for moving these posts from business blog
        if (entry.url === '/the-dangerous-cliffs-of-node-js/') {
          entry.nb_hits += 631; // eslint-disable-line
        }
        if (entry.url === '/contract-teaching/') {
          entry.nb_hits += 10; // eslint-disable-line
        }

        return entry;
      })
      .sortBy('nb_hits')
      .reverse() // eslint-disable-line
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))
      .value();

    _.forEach(items, entry => {
      const target = lookup[entry.url];
      const previousRank = _.get(target, 'data.rank');

      if (previousRank === entry.rank) {
        return;
      }

      console.log(target.path, 'now has rank:', entry.rank, '; previous:', previousRank);

      const newContents = getNewContents(entry.rank, target.contents);

      fs.writeFileSync(target.path, newContents);
    });
  });


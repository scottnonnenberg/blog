import './util/setupModulePath';

import fs from 'fs';

import superagent from 'superagent';
import _ from 'lodash';

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
  const newRank = /^[^-]*---/;

  if (existingRank.test(contents)) {
    return contents.replace(existingRank, `rank: ${rank}`);
  }

  return contents.replace(newRank, `---\nrank: ${rank}`);
}

superagent
  .get('https://piwik.sinap.ps/index.php')
  .query({
    module: 'API',
    method: 'Actions.getPageUrls',
    format: 'JSON',
    idSite: 3,
    period: 'range',
    date: '2013-1-1,2016-05-16',
    expanded: 1,
    token_auth: '8c3e249277ac43852917552b63335dba', // eslint-disable-line
    filter_limit: 100, // eslint-disable-line
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
        if (entry.url === '/how-not-to-do-customer-service-credit-card-edition/'
          || entry.url === '/why-i-left-liffft/') {
          return false;
        }

        return Boolean(lookup[entry.url]);
      })
      .map(entry => {
        if (entry.url === '/the-dangerous-cliffs-of-node-js/') {
          entry.nb_hits += 631; // eslint-disable-line
        }
        if (entry.url === '/contract-teaching/') {
          entry.nb_hits += 10; // eslint-disable-line
        }

        return entry;
      })
      .sortBy('nb_hits')
      .reverse()
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


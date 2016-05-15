import './util/setupModulePath'; // eslint-disable-line

import fs from 'fs';

import superagent from 'superagent';
import _ from 'lodash';

import loadPosts from 'scripts/util/loadPosts';


const SUCCESS = 200;

const posts = loadPosts({
  markdown: false,
});

const lookup = Object.create(null);
_.forEach(posts, post => {
  lookup[post.data.path] = post;
});

superagent
  .get('https://piwik.sinap.ps/index.php')
  .query({
    module: 'API',
    method: 'Actions.getPageUrls',
    format: 'JSON',
    idSite: 3,
    period: 'range',
    date: '2013-1-1,2016-05-06',
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
      .filter(entry => {
        entry.url = `/${entry.label}/`;

        if (entry.url === '/how-not-to-do-customer-service-credit-card-edition/') {
          return false;
        }
        if (entry.url === '/why-i-left-liffft/') {
          return false;
        }

        if (entry.url === '/the-dangerous-cliffs-of-node-js/') {
          entry.nb_hits += 631; // eslint-disable-line
        }
        if (entry.url === '/contract-teaching/') {
          entry.nb_hits += 10; // eslint-disable-line
        }

        if (!lookup[entry.url]) {
          return false;
        }

        return true;
      })
      .sortBy('nb_hits')
      .reverse()
      .value();

    _.forEach(items, (entry, index) => {
      // console.log('checking', url);

      const rank = index + 1;
      const target = lookup[entry.url];
      let contents = target.contents;
      const existingRank = /^rank: [0-9]+$/m;
      const newRank = /^[^-]*---/;

      const previousRank = _.get(target, 'data.rank');

      if (previousRank === rank) {
        return;
      }

      console.log(target.path, 'now has rank:', rank, '; previous:', previousRank);

      if (existingRank.test(contents)) {
        contents = contents.replace(existingRank, `rank: ${rank}`);
      }
      else {
        contents = contents.replace(newRank, `---\nrank: ${rank}`);
      }

      fs.writeFileSync(target.path, contents);
    });
  });


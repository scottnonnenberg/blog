import fs from 'fs';

import superagent from 'superagent';
import _ from 'lodash';

import loadPosts from './utils/loadPosts';


const posts = loadPosts();

var lookup = Object.create(null);
_.forEach(posts, function(post) {
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
    date: '2013-1-1,2016-03-10',
    expanded: 1,
    token_auth: '8c3e249277ac43852917552b63335dba',
    filter_limit: 100
  })
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    if (res.status !== 200) {
      throw new Error('non-200 response! ' + res.text);
    }

    const items = _(res.body)
      .filter(function (entry) {
        entry.url = '/' + entry.label + '/';

        if (entry.url === '/how-not-to-do-customer-service-credit-card-edition/') {
          return false;
        }
        if (entry.url === '/why-i-left-liffft/') {
          return false;
        }

        if (entry.url === '/the-dangerous-cliffs-of-node-js/') {
          entry.nb_hits += 631;
        }
        if (entry.url === '/contract-teaching/') {
          entry.nb_hits += 10;
        }

        if (!lookup[entry.url]) {
          return false;
        }

        return true;
      })
      .sortBy('nb_hits')
      .reverse()
      .value();

    _.forEach(items, function(entry, index) {
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
        contents = contents.replace(existingRank, 'rank: ' + rank);
      }
      else {
        contents = contents.replace(newRank, '---\nrank: ' + rank);
      }

      fs.writeFileSync(target.path, contents);
    });
  });


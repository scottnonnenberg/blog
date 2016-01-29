import fs from 'fs';
import path from 'path';

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
    date: '2013-1-1,2016-01-21',
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

    _.forEach(res.body, function(entry) {
      var url = '/' + entry.label + '/';
      var hits = entry.nb_hits;

      if (url === '/how-not-to-do-customer-service-credit-card-edition/') {
        return;
      }
      if (url === '/why-i-left-liffft/') {
        return;
      }

      if (url === '/the-dangerous-cliffs-of-node-js/') {
        hits += 631;
      }
      if (url === '/contract-teaching/') {
        hits += 10;
      }

      // console.log('checking', url);

      var target = lookup[url];
      if (!target) {
        return;
      }

      var contents = target.contents;
      var existingHits = /^hits: [0-9]+$/m;
      var newHits = /^[^-]*---/;

      if (target.data && target.data.hits && target.data.hits === hits) {
        return;
      }

      console.log('updating', target.path, ' with ' + hits);

      if (existingHits.test(contents)) {
        contents = contents.replace(existingHits, 'hits: ' + hits);
      }
      else {
        contents = contents.replace(newHits, '---\nhits: ' + hits);
      }

      fs.writeFileSync(target.path, contents);
    });
  });


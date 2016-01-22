var superagent = require('superagent');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var frontMatter = require('front-matter');

var postsPath = path.join(__dirname, 'pages/posts');

var postFiles = fs.readdirSync(postsPath);
var posts = _.map(postFiles, function(file) {
  var filePath = path.join(postsPath, file);
  var contents = fs.readFileSync(filePath).toString();
  var metadata = frontMatter(contents);
  return {
    path: filePath,
    contents: contents,
    body: metadata.body,
    data: metadata.attributes
  };
});

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

      var target = lookup[url];
      if (!target) {
        return;
      }

      console.log('updating', target.path, ' with ' + hits);

      var contents = target.contents;
      var existingHits = /^hits: [0-9]+$/m;
      var newHits = /^[^-]*---/;

      if (existingHits.test(contents)) {
        contents = contents.replace(existingHits, 'hits: ' + hits);
      }
      else {
        contents = contents.replace(newHits, '---\nhits: ' + hits);
      }

      fs.writeFileSync(target.path, contents);
    });
  });


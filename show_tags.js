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
  _.forEach(post.data.tags, function(tag) {
    var list = lookup[tag] = lookup[tag] || [];
    list.push(post);
  });
});

var counts = _(lookup)
  .pairs()
  .map(function(array) {
    return [array[0], array[1].length];
  })
  .sortBy(function(array) {
    return array[1];
  })
  .reverse()
  .zipObject()
  .value();

console.log(counts);

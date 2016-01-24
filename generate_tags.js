import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import getTagCounts from './utils/getTagCounts';

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

var counts = getTagCounts(posts);

console.log(counts);

var templatePath = path.join(__dirname, 'components/_tagTemplate.jsx');
var template = fs.readFileSync(templatePath).toString();
var findTag = /"TAG"/m;

_.forEach(_.keys(counts), function(tag) {
  var filePath = path.join(__dirname, 'pages/tags', tag + '.jsx');
  var contents = template.replace(findTag, '"' + tag + '"');

  try {
    var currentContents = fs.readFileSync(filePath).toString();

    if (currentContents === contents) {
      return;
    }
  }
  catch (err) {}

  console.log('writing page for tag ' + tag);

  fs.writeFileSync(filePath, contents);
});

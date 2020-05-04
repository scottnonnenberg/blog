import './util/setupModulePath';

import fs from 'fs';
import path from 'path';
import _string from 'underscore.string';

import moment from 'moment';


function fixForYaml(title) {
  if (title.indexOf(':') !== -1) {
    return `"${title.split('"').join('\\"')}"`;
  }

  return title;
}

const templatePath = path.join(__dirname, 'util/_postTemplate.md');
const template = fs.readFileSync(templatePath).toString();

const now = new Date();
const date = now.toJSON();

const title = process.argv[2];
const titleSlug = _string.slugify(title);
const titleForYaml = fixForYaml(title);
const postPath = `/${titleSlug}/`;

const newContents = template
  .replace('TITLE', titleForYaml)
  .replace('DATE', date)
  .replace('PATH', postPath);

const filePathDate = moment(now).format('YYYY-MM-DD');
const newFilePath =
  path.join(__dirname, `../pages/posts/${filePathDate}-${titleSlug}.md`);

fs.writeFileSync(newFilePath, newContents);

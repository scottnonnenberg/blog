import './util/setupModulePath';

import fs from 'fs';
import path from 'path';
import _string from 'underscore.string';

function fixForYaml(title: string): string {
  if (title.indexOf(':') !== -1) {
    return `"${title.split('"').join('\\"')}"`;
  }

  return title;
}

const templatePath = path.join(__dirname, 'util/_postTemplate.md');
const template = fs.readFileSync(templatePath).toString();

const now = new Date();
const dateJSON = now.toJSON();

const title = process.argv[2];
const titleSlug = _string.slugify(title);
const titleForYaml = fixForYaml(title);
const postPath = `/${titleSlug}/`;

const newContents = template
  .replace('TITLE', titleForYaml)
  .replace('DATE', dateJSON)
  .replace('PATH', postPath);

const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const newFilePath = path.join(__dirname, `../posts/${dateString}-${titleSlug}.md`);

fs.writeFileSync(newFilePath, newContents);

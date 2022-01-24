import './util/setupModulePath';

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { slugify } from 'underscore.string';

const LARGEST_SINGLE_DIGIT = 9;

function fixForYaml(title: string): string {
  if (title.includes(':')) {
    return `"${title.split('"').join('\\"')}"`;
  }

  return title;
}

function padNumber(value: number): string {
  if (value <= LARGEST_SINGLE_DIGIT) {
    return `0${value}`;
  }

  return `${value}`;
}

const templatePath = join(__dirname, 'util/_postTemplate.md');
const template = readFileSync(templatePath).toString();

const now = new Date();
const dateJSON = now.toJSON();

const title = process.argv[2];
if (!title) {
  console.log('No title provided!');
  process.exit(1);
}

const titleSlug = slugify(title);
const titleForYaml = fixForYaml(title);
const postPath = `/${titleSlug}/`;

const newContents = template
  .replace('TITLE', titleForYaml)
  .replace('DATE', dateJSON)
  .replace('PATH', postPath);

const month = padNumber(now.getMonth() + 1);
const day = padNumber(now.getDate());
const dateString = `${now.getFullYear()}-${month}-${day}`;
const newFilePath = join(__dirname, `../posts/${dateString}-${titleSlug}.md`);

writeFileSync(newFilePath, newContents);

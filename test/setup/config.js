/* eslint-disable import/prefer-default-export */

import fs from 'fs';
import path from 'path';

import mock from 'mock-require';
import toml from 'toml';


const configPath = path.join(__dirname, '../../config.toml');
export const config = toml.parse(fs.readFileSync(configPath).toString());

mock('config', {
  config,
});

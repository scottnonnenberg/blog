import './util/setupModulePath';

import URL from 'url';

import chalk from 'chalk';
import notate from '@scottnonnenberg/notate';
import _ from 'lodash';
import async from 'async';
import superagent from 'superagent';
import { SiteChecker } from 'broken-link-checker';


const MAX_PARALLEL = 5;
const DOMAIN = 'http://localhost:8000';
const links = Object.create(null);
const cache = Object.create(null);


function verifyHash({ pathname, hash, contents }) {
  const id = hash.replace(/#/g, '');
  const goodPrefix = chalk.blue('GOOD:    ');
  const badPrefix = chalk.red('MISSING: ');

  if (contents.indexOf(` id="${id}"`) !== -1) {
    console.log(`${goodPrefix}${chalk.cyan(pathname)} contains '${chalk.blue(id)}'`);
    return true;
  }

  console.log(
    `${badPrefix}${chalk.cyan(pathname)} doesn't contain id '${chalk.red(id)}'`
  );
  return false;
}

function checkLink({ pathname, hash }, cb) {
  if (cache[pathname]) {
    return cb(null, verifyHash({ pathname, hash, contents: cache[pathname] }));
  }

  return superagent
    .get(DOMAIN + pathname)
    .end((err, res) => {
      if (notate(err, cb, { pathname })) {
        return;
      }

      cache[pathname] = res.text; // eslint-disable-line
      return cb(null, verifyHash({ pathname, hash, contents: res.text }));
    });
}

function checkLinks() {
  // try/catch is necessary because broken-link-checker swallows errors! :0(
  try {
    const deepLinks = _.chain(links)
      .keys()
      .filter(url => url.indexOf('#') !== -1)
      .sortBy()
      .map(url => URL.parse(url))
      .value();

    async.mapLimit(deepLinks, MAX_PARALLEL, checkLink, err => {
      if (err) {
        console.log(notate.prettyPrint(err));
        return;
      }

      console.log('\nAll Done!');
    });
  }
  catch (err) {
    console.log(notate.prettyPrint(err));
  }
}


const options = {
  excludeExternalLinks: true,
};
const handlers = {
  link: result => {
    links[result.url.resolved] = true; // eslint-disable-line
  },
  end: checkLinks,
};

const checker = new SiteChecker(options, handlers);

checker.enqueue(DOMAIN);


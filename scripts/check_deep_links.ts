import './util/setupModulePath';

import URL from 'url';

import chalk from 'chalk';
// @ts-ignore
import notate from '@scottnonnenberg/notate';
import _ from 'lodash';
import async from 'async';
import superagent from 'superagent';
// @ts-ignore
import { SiteChecker } from 'broken-link-checker';


const MAX_PARALLEL = 5;
const DOMAIN = 'http://localhost:8000';
const links = Object.create(null);
const cache = Object.create(null);


function verifyHash({ pathname, hash, contents }: {
  pathname: string;
  hash: string;
  contents: string;
}) {
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

type LinkType = {
  pathname: string;
  hash: string
};

function checkLink({ pathname, hash }: LinkType, cb: Function) {
  if (cache[pathname]) {
    return cb(null, verifyHash({ pathname, hash, contents: cache[pathname] }));
  }

  return superagent
    .get(DOMAIN + pathname)
    .end((err, res) => {
      if (notate(cb, err, { pathname })) {
        return;
      }

      cache[pathname] = res.text; // eslint-disable-line
      return cb(null, verifyHash({ pathname, hash, contents: res.text }));
    });
}

function checkLinks() {
  // try/catch is necessary because broken-link-checker swallows errors! :0(
  try {
    const deepLinks: Array<LinkType> = _.chain(links)
      .keys()
      .filter(url => url.indexOf('#') !== -1)
      .sortBy()
      .map(url => URL.parse(url))
      .compact()
      // We force it with 'any' because we know hash is truthy due to our previous check
      .value() as any;

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

type SiteCheckerResultType = {
  url: {
    resolved: string;
  }
}

const handlers = {
  link: (result: SiteCheckerResultType) => {
    links[result.url.resolved] = true; // eslint-disable-line
  },
  end: checkLinks,
};

const checker = new SiteChecker(options, handlers);

checker.enqueue(DOMAIN);


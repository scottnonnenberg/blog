import './util/setupModulePath';

import URL from 'url';

import chalk from 'chalk';
import notate from '@scottnonnenberg/notate';
import _ from 'lodash';
import async from 'async';
import superagent from 'superagent';
import { SiteChecker, SiteCheckerResultType } from 'broken-link-checker';

const MAX_PARALLEL = 5;
const DOMAIN = 'http://localhost:8000';
const links = Object.create(null);
const cache = Object.create(null);

function verifyHash({
  pathname,
  hash,
  contents,
}: {
  pathname: string;
  hash: string;
  contents: string;
}): boolean {
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
  pathname: string | null;
  hash: string | null;
};

function checkLink(
  { pathname, hash }: LinkType,
  cb: (error?: Error | null, broken?: boolean) => void
): void {
  if (!pathname || !hash) {
    console.error('Malformed link', { pathname, hash });
    cb(new Error('Malformed link!'));

    return;
  }

  if (cache[pathname]) {
    cb(null, verifyHash({ pathname, hash, contents: cache[pathname] }));
    return;
  }

  return superagent
    .get(DOMAIN + pathname)
    .set('user-agent', 'scripts/check-deep-links')
    .end((err, res) => {
      if (notate(cb, err, { pathname })) {
        return;
      }

      cache[pathname] = res.text;
      cb(null, verifyHash({ pathname, hash, contents: res.text }));
      return;
    });
}

function checkLinks(): void {
  // try/catch is necessary because broken-link-checker swallows errors! :0(
  try {
    const deepLinks: Array<LinkType> = _.chain(links)
      .keys()
      .filter(url => url.indexOf('#') !== -1)
      .sortBy()
      .map(url => URL.parse(url))
      .compact()
      .value();

    async.mapLimit(deepLinks, MAX_PARALLEL, checkLink, err => {
      if (err) {
        console.log(notate.prettyPrint(err));
        return;
      }

      console.log('\nAll Done!');
    });
  } catch (err) {
    console.log(notate.prettyPrint(err));
  }
}

const options = {
  excludeExternalLinks: true,
  excludeLinksToSamePage: false,
};

const handlers = {
  link: (result: SiteCheckerResultType): void => {
    links[result.url.resolved] = true;
  },
  end: checkLinks,
};

const checker = new SiteChecker(options, handlers);

checker.enqueue(DOMAIN);

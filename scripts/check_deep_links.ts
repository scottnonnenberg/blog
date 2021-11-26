import './util/setupModulePath';

import URL from 'url';

import chalk from 'chalk';
import notate from '@scottnonnenberg/notate';
import async from 'async';
import superagent from 'superagent';
import { SiteChecker } from 'broken-link-checker';
import type { SiteCheckerResultType } from 'broken-link-checker';

const MAX_PARALLEL = 5;
const DOMAIN = 'http://localhost:8000';
const links: Record<string, boolean> = {};
const cache: Record<string, string> = {};

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

  if (contents.includes(` id="${id}"`)) {
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
  callback: (error?: Error | null, broken?: boolean) => void
): void {
  if (!pathname || !hash) {
    console.error('Malformed link', { pathname, hash });
    callback(new Error('Malformed link!'));

    return;
  }

  const contents = cache[pathname];
  if (contents) {
    callback(null, verifyHash({ pathname, hash, contents }));
    return;
  }

  superagent
    .get(DOMAIN + pathname)
    .set('user-agent', 'scripts/check-deep-links')
    .end((error: Error | undefined, res) => {
      if (notate(callback, error, { pathname })) {
        return;
      }

      cache[pathname] = res.text;
      callback(null, verifyHash({ pathname, hash, contents: res.text }));
    });
}

function checkLinks(): void {
  // try/catch is necessary because broken-link-checker swallows errors! :0(
  try {
    const collator = new Intl.Collator();
    const deepLinks: Array<LinkType> = Object.keys(links)
      .filter(url => url.includes('#'))
      .sort(collator.compare.bind(collator))
      .map(url => URL.parse(url));

    async.mapLimit(deepLinks, MAX_PARALLEL, checkLink, error => {
      if (error) {
        console.log(notate.prettyPrint(error));
        return;
      }

      console.log('\nAll Done!');
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(notate.prettyPrint(error));
    } else {
      console.log('Something really went wrong:', error);
    }
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

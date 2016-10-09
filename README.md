# https://blog.scottnonnenberg.com

A [`gatsby`](https://github.com/gatsbyjs/gatsby)-based blog.

More on how to use this project: https://blog.scottnonnenberg.com/this-blog-is-now-open-source/

[![continous integration](https://img.shields.io/circleci/project/scottnonnenberg/blog/master.svg?maxAge=3600)](https://circleci.com/gh/scottnonnenberg/blog/tree/master) [![code coverage](https://img.shields.io/codecov/c/github/scottnonnenberg/blog/master.svg?maxAge=3600)](https://codecov.io/gh/scottnonnenberg/blog/branch/master) [![license](https://img.shields.io/github/license/scottnonnenberg/blog.svg?maxAge=2592000)](https://github.com/scottnonnenberg/blog#license)

## Key settings

`config.toml` contains key data you'll want to change first. The location of the blog, author name and details, and so on.

`piwik.js` is excluded from the repository, but is used by `html.js` (to generate piwik tracking tags) and `scripts/update_rankings.js` (to get popularity numbers for posts). These four keys are required to use those features:

```javascript
export default {
  domain: 'where your piwik server is',
  siteId: 'the site number',
  site: 'the site domain',
  token: 'your API access token, used by `update-rankings` npm script',
};
```

`mailchimp.js` is also excluded from the repository, used by the `<EmailSignup>` React component in displaying its form. It uses five keys:

```javascript
export default {
  account: 'your account name, the first part of your mailchimp links',
  shard: 'the second component of your mailchimp links - like "us12"',
  u: 'the "u" value in your embedded mailchimp form',
  id: 'the "id" value in your embedded mailchimp form',
  fakeField: 'the field for robots in the embedded mailchimp form',
};
```

_Note: if you don't want to use these features, put empty files at
`/piwik.js` and `/mailchimp.js` (like `export default {};`) to make things work until you take the unused code out._

## Develop

```bash
npm run develop
```

This runs `gatsby`'s hot-reloading development server on http://localhost:8000. It will have to be restarted if you rename, add, or remove files because [`webpack`](https://webpack.github.io/)'s watch mode doesn't handle those kinds of filesystem changes.

## Build

Generate files to `public/` folder. Will fail if there are outstanding `git` changes. Pre-gzips all files. Calls a shell script behind the scenes, so you might run into some problems on Windows.

```bash
npm run build-production # or npm run build-staging
npm run build-production -- --force # build even with outstanding git changes
```

## Test

Run `eslint` and the unit tests with `npm test`. All utility code and React components will be tested in Node.js. `npm run unit` will just run the tests, and `unit-watch` and `unit-coverage` are also available for active development. Once you've generated code coverage numbers, `npm run open-coverage` makes it easy to open [`istanbul`](https://github.com/gotwarlost/istanbul)'s HTML report.

You can use `npm run serve` to serve static files from `public/` at http://localhost:8000 for manual and automated tests. A manual test script is available at `tests/manual.txt` - it covers the parts of the user experience without automated tests.

Once you have the static server running you can check for broken links:

```bash
npm run check-local-links
npm run check-external-links
npm run check-deep-links
npm run check-links http://localhost:8000/
```

_Note: Due to the meta tags on each page, you'll get broken links until you've published all pages to production._

## Helper scripts

```bash
npm run make-post -- "The name of your post"
```

Creates a new markdown file from the template at `scripts/util/_postTemplate.md`. Sets the new post's `previous` URL to the last most-recent post's URL, and updates the previous post's markdown file with the newly-generated posts URL. That was annoying to do by hand. :0)

```bash
npm run clean-post
npm run clean-post -- 5
```

By default processes the most recent file. If a number is provided, it will process that many most-recent posts. Removes smart quotes, duplicate links (same text as URL), and all mentions of the blog's `domain` (taken from `config.toml`) to ensure that links are all of the relative form.

```bash
npm run generate-tags
```

Loads all posts from `pages/posts` and extracts all of their tags. Ensures that a file `pages/tags/TAG.js` exists for every tag found. Prints out a count for each.

```bash
npm run update-rankings
```

Goes to my stats system (which uses [Piwik](https://piwik.org/)), grabs the top URLs, massages the data a little bit, then updates the `rank` property of the frontmatter in each markdown file. If you use this, you'll want to periodically change the end date for the query.

```bash
npm run generate-rss
```

Generates `rss.xml` and `atom.xml` into `public/`. Runs as part of every build.

```bash
npm run generate-json
```

Generates `all.json` and `recent.json` into `public/`. Also runs as part of every build. I generate this file for easier syndication into other sites, like https://scottnonnenberg.com.

## Contributing

This project uses [`standard-version`](https://github.com/conventional-changelog/standard-version) to release new versions, automatically updating the version number and [changelog](https://github.com/scottnonnenberg/blog/blob/master/CHANGELOG.md) based on commit messages in [standard format](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md). [`ghooks`](https://github.com/gtramontina/ghooks) and [`validate-commit-msg`](https://github.com/kentcdodds/validate-commit-msg) are used to ensure all commit messages match the expected format (see [package.json](https://github.com/scottnonnenberg/blog/blob/master/package.json) for the configuration details).

It takes some getting used to, but this configuration is absolutely worthwhile. A changelog is way easier to understand than the chaos of a raw commit stream, especially with `standard-version` providing direct links to bugs, commits and [commit ranges](https://github.com/scottnonnenberg/blog/compare/v0.5.0...v0.6.0).

## TODO

* Remove pinned `punycode` dependency when `broken-link-checker` updates to pull in newer version of `bhttp` and `tough-cookie`: https://github.com/stevenvachon/broken-link-checker/issues/34
* Remove pinned `babylon` dependency when `eslint-plugin-import` works with its most recent version once more: https://github.com/babel/babylon/issues/139


## License

The files under `pages/posts` are Copyright 2016, All Rights Reserved.

The rest of the project is under the MIT license:

Copyright (c) 2016 Scott Nonnenberg <scott@nonnenberg.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

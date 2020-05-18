# https://blog.scottnonnenberg.com

A [`gatsby`](https://github.com/gatsbyjs/gatsby)-based blog.

## Key settings

`gatsbyConfig.ts` contains key data you'll want to change first. The location of the blog, author name and details, gatsby plugins, and so on.

`mailchimp.ts` is also excluded from the repository, used by the `<EmailSignup>` React component in displaying its form. It uses five keys:

```javascript
export default {
  account: 'your account name, the first part of your mailchimp links',
  shard: 'the second component of your mailchimp links - like "us12"',
  u: 'the "u" value in your embedded mailchimp form',
  id: 'the "id" value in your embedded mailchimp form',
  fakeField: 'the field for robots in the embedded mailchimp form',
};
```

_Note: if you don't want to connect to a mailchimp mailing list, delete the `<EmailSignup>` component. You put can a file at `/mailchimp.ts` (like `export default {};`) to make things work until you take it out._

## Develop

```bash
yarn develop
```

This runs `gatsby`'s hot-reloading development server on http://localhost:8000.

## Build

Generate files to `public/` folder. Will fail if there are outstanding `git` changes. Pre-gzips all files. Calls a shell script behind the scenes, so you might run into some problems on Windows.

```bash
yarn build-production # or yarn build-staging
yarn build-production -- --force # build even with outstanding git changes
```

## Test

Run `eslint` and the unit tests with `npm test`.

You can use `yarn serve` to serve static files from `public/` at http://localhost:8000 for manual and automated tests. A manual test script is available at `tests/manual.txt` - it covers the parts of the user experience without automated tests.

Once you have the static server running you can check for broken links:

```bash
yarn check-local-links
yarn check-external-links
yarn check-deep-links
yarn check-links http://localhost:8000/
```

_Note: Due to the meta tags on each page, you'll get broken links until you've published all pages to production._

## Helper scripts

```bash
yarn make-post -- "The name of your post"
```

Creates a new markdown file from the template at `scripts/util/_postTemplate.md`.

```bash
yarn clean-post
yarn clean-post -- 5
```

By default processes the most recent file. If a number is provided, it will process that many most-recent posts. Removes smart quotes, duplicate links (same text as URL), and all mentions of the blog's `domain` (taken from `gatsbyConfig.ts`) to ensure that links are all of the relative form.

```bash
yarn generate-rss
```

Generates `rss.xml` and `atom.xml` into `public/`. Runs as part of every build.

```bash
yarn generate-json
```

Generates `all.json` and `recent.json` into `public/`. Also runs as part of every build. I generate this file for easier syndication into other sites, like https://scottnonnenberg.com.

## Contributing

This project uses [`standard-version`](https://github.com/conventional-changelog/standard-version) to release new versions, automatically updating the version number and [changelog](https://github.com/scottnonnenberg/blog/blob/master/CHANGELOG.md) based on commit messages in [standard format](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md). [`ghooks`](https://github.com/gtramontina/ghooks) and [`validate-commit-msg`](https://github.com/kentcdodds/validate-commit-msg) are used to ensure all commit messages match the expected format (see [package.json](https://github.com/scottnonnenberg/blog/blob/master/package.json) for the configuration details).

It takes some getting used to, but this configuration is absolutely worthwhile. A changelog is way easier to understand than the chaos of a raw commit stream, especially with `standard-version` providing direct links to bugs, commits and [commit ranges](https://github.com/scottnonnenberg/blog/compare/v0.5.0...v0.6.0).

## License

The files under `posts/` are Copyright 2016, All Rights Reserved.

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

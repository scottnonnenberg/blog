# https://blog.scottnonnenberg.com

A fully-featured [`gatsby`](https://www.gatsbyjs.com/)-based blog.

## Quick start

Get this blog running locally ASAP!

```bash
git clone git@github.com:scottnonnenberg/blog.git
cd blog
npm install -g yarn # if you don't already have it
yarn install --offline --pure-lockfile
yarn develop
```

Now you've got my blog running on `http://localhost:8000`!

## A note about Javascript

I've decided to disable one of the key features of Gatsby for this blog: Javascript on the client side. It increases the download size for your site, but makes intra-site navigations faster. If you'd like your blog to have Javascript enabled, I have a `js` branch with all of that enabled: https://github.com/scottnonnenberg/blog/compare/main...js

You can also see for yourself what the experience is like with Javascript enabled here: https://blog-js.scottnonnenberg.com

## Key settings

`gatsbyConfig.ts` contains key data you'll want to change first. The location of the blog, author name and details, gatsby plugins, and so on.

`mailchimp.ts` is the next thing you'll want to change, since it's pointing at my mailing list. The simplest thing to do here is delete this file along with `EmailSignup.*` and re-add something like it when you're ready.

## Develop

This runs `gatsby`'s hot-reloading development server on `http://localhost:8000`:

```bash
yarn develop
```

To cover more permutations of a given component, [`Storybook`](https://storybook.js.org/) is a great tool. Start it up at `https://localhost:6006` like this:

```bash
yarn storybook
```

If you're implementing deeper changes in `gatsbyNode.ts`, you might want to take a look at the GraphQL schema, or do some test querying. The excellent [GraphiQL](https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme) tool is available while the development-mode side is active at `http://localhost:8000/__graphql`.

## Build

Generate production-ready files to `public/` folder:

```bash
yarn build
```

_Note: this will generate `rss.xml`, `atom.xml`, `all.json` and `recent.json` to the root `public/` directory along with the site._

## Test

Check types, run `eslint`, and the unit tests with `yarn test`.

You can use `yarn serve` to serve static files from `public/` at http://localhost:8000 for manual and automated tests. `tests/manual.txt` has some weird tests you might consider doing if you make some larger changes.

Once you have the static server running you can check for broken links:

```bash
# quick run
yarn check-local-links

# these can take some time
yarn check-deep-links
yarn check-links http://localhost:8000/
```

This project uses GitHub actions for CI. On every push, it will run tests, lint, check types, and check local and deep links: https://github.com/scottnonnenberg/blog/blob/main/.github/workflows/ci.yml

## Helper scripts

```bash
yarn make-post "The name of your post"
```

Creates a new markdown file from the template at `scripts/util/_postTemplate.md`.

```bash
yarn clean-post
yarn clean-post 5
```

By default processes the most recent file. If a number is provided, it will process that many most-recent posts. Removes smart quotes, duplicate links (same text as URL), and all mentions of the blog's `domain` (taken from `gatsbyConfig.ts`) to ensure that links are all of the relative form.

## Hosting

This blog is hosted on [Vercel](https://vercel.com/). It is deployed to production with every push to the `main` branch. You can see Vercel-specific configuration here, with redirects, cache settings, and forced trailing slashes: https://github.com/scottnonnenberg/blog/blob/main/vercel.json

## Contributing

`yarn ready` is the key thing to run to make sure things are in good shape. It checks types, runs tests, builds the site, and even checks for broken links.

But before you get there, you'll need to make some commits. And this project has some restrictions about how those commits need to be structured. This project uses [`standard-version`](https://github.com/conventional-changelog/standard-version) to release new versions, automatically updating the version number and [changelog](https://github.com/scottnonnenberg/blog/blob/master/CHANGELOG.md) based on commit messages in [standard format](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md). [`ghooks`](https://github.com/gtramontina/ghooks) and [`validate-commit-msg`](https://github.com/kentcdodds/validate-commit-msg) are used to ensure all commit messages match the expected format (see [package.json](https://github.com/scottnonnenberg/blog/blob/master/package.json) for the configuration details).

It takes some getting used to, but this configuration is absolutely worthwhile. A changelog is way easier to understand than the chaos of a raw commit stream, especially with `standard-version` providing direct links to bugs, commits and [commit ranges](https://github.com/scottnonnenberg/blog/compare/v0.5.0...v0.6.0).

## License

The files under `posts/` are Copyright 2013-2021, All Rights Reserved.

The rest of the project is under the MIT license:

Copyright (c) 2021 Scott Nonnenberg <scott@nonnenberg.com>

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

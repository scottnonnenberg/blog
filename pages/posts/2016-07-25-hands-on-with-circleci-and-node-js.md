---
rank: 12
title: Hands-on with CircleCI and Node.js
date: 2016-07-26T01:52:42.382Z
layout: post
path: /hands-on-with-circleci-and-node-js/
next: /modern-evidence-requirements/
previous: /better-changelogs-strings-and-paths/
tags:
  - open-source
  - nodejs
  - javascript
  - software
---

If you've been watching my [`@scottnonnenberg/notate` repo on Github](https://github.com/scottnonnenberg/notate), you might have noticed [quite a bit of churn related to setting up CircleCI](https://github.com/scottnonnenberg/notate/compare/7e60c65b287e64e186df1778e1908ae89c9c9d58...0a479118ef849cad739d984cc728a64439567fab). I learned quite a lot, and I'm passing all of that on to you. Let's talk about testing software built with [Node.js](https://nodejs.org/) on [CircleCI](https://circleci.com/).

<div class='fold'></div>

## Why CircleCI?

Before we dig in, let's answer that first very important question. Why use CircleCI? There are [a large number of options in the continuous integration space](https://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software)!

First, let's talk about the widely-used and totally free option, [Jenkins](https://jenkins.io/). If you want full customizability and zero cost, this option is for you. But it takes time to set up and maintain! Most people won't want to put that effort into it.

What's next on the list? In the world of open source, [TravisCI](https://travis-ci.org/) and [Github](https://github.com/) play together very well. Many, many node modules use it. Those [little badges](http://shields.io/) frequently link to TravisCI build results. If you play in that world, it's comfortable, perhaps even the default option. I used it for my [thehelp libraries](https://travis-ci.org/thehelp/cluster).

So, what advantages does CircleCI have over that that default option, TravisCI?

* I've found CircleCI to be quite a bit faster - less time is spent waiting for a container to spin up and start testing.
* You can [SSH into your CircleCI containers](https://circleci.com/docs/ssh-build/) to get the additional detail your build logs might be missing. Extremely useful in those particularly tricky situations.
* CircleCI maintains a detailed, up-to-date changelog detailing updates to the service: https://circleci.com/changelog/
* You can tell CircleCI about detailed test results by providing test metadata [via JUnit format XML files](https://circleci.com/docs/test-metadata/)
* CircleCI persists [custom build artifacts](https://circleci.com/docs/build-artifacts/) indefinitely (beyond the standard logs)

Put it all together and you have a quality tool!

And it's free for open source too!

## Setup

Like TravisCI, getting started is as easy as connecting to your GitHub account. Choose one of your organizations (you are considered an organization along with 'real' organizations), then click the _Build project_ button and you're off and running!

There are two options you'll likely want to change. Select _Project Settings_ in the top right:

* _[Ubuntu](https://en.wikipedia.org/wiki/Ubuntu_(operating_system)) version_ - by default you'll be building on Ubuntu Linux, version 12.04. That's  a bit old at this point. Select **Build Environment** on the left, then select **Ubuntu 14.04 (Trusty)** at the bottom of the page. _Note: CircleCI only supports Linux and OSX builds._
* _Building pull requests_ - by default, for security reasons, CircleCI will not build pull requests sourced from forks of your project. This is to protect any private environment variables you've set up, since a pull request could very easily print all environment variables to the console. But you'll likely want to turn this on, **Advanced Settings** on the left, then find **Permissive building of fork pull requests**. Be sure to think a little bit about who can fork your projects!

Now we're ready to go!

## Building Node.js

CircleCI supports Node.js out of the box, but it's not quite what you expect. If you jump in and start running commands, these are the default versions:

```text
node: "0.10.33"
npm: "2.13.5"
```

That is **quite** old! v0.10.33 was released in October 2014!

The recommended way to access the version you want (and [the only way support multiple versions in your build](https://discuss.circleci.com/t/testing-multiple-versions-of-node/542)) is via [`nvm`](https://github.com/creationix/nvm). You're already using a local node version manager, right? `nvm`, or perhaps [`n`](https://github.com/tj/n)?

CircleCI's containers do come with Node.js 4.x installed, but it's not the default. You'll need to explicitly request it. If you want something newer, say for example, the [now-necessary npm v3](https://www.reddit.com/r/javascript/comments/3u7gob/babels_poor_performance_what_im_doing_wrong/), you'll need to install it yourself. In your [`circle.yml`](https://circleci.com/docs/config-sample/):

```yaml
dependencies:
  override:
    - nvm install 6 && npm install
```

This is an 'override' because [the default is a raw `npm install` call](https://circleci.com/docs/language-nodejs/#dependencies).

```yaml
test:
  override:
    - nvm use 4 && npm run test-server-all
    - nvm use 6 && npm run ci
```

The 'test' section is similar. [The default is a raw `npm test` call](https://circleci.com/docs/language-nodejs/#testing).

Because each statement underneath the 'override' key will be run with their own environment variables, they'll use the default (very old) version of Node.js. To fix that you'll need to use the `nvm use 6 &&` syntax for every command or set the default with `nvm alias default 6`.

It's also worth noting that CircleCI will auto-detect your project type, so you don't even need a `circle.yml`. But you probably want to at least choose your Node.js version. To update the default `node` and `npm` available on the machine, you can set the default node version in your `circle.yml` like this:

```yaml
machine:
  node:
    version: 6.3.0
```

## Caching and ./node_modules

Out of the box, CircleCI is especially fast, because it [caches your project's `node_modules`](https://circleci.com/docs/how-cache-works) directory after doing that initial `npm install`. You can [manually request a cache-free build](https://circleci.com/docs/how-cache-works/#clearing-the-cache), but by default every build after the first for a given branch uses a cache provided by previous builds.

But this isn't a very good idea. Good tests should match the real user experience as closely as possible. Let's consider some scenarios:

* **Add a dependency** - No problem. The default `npm install` will install it.
* **Uninstall a dependency** - The cache means that the dependency will still be installed. `npm prune` would eliminate no-longer needed dependencies.
* **Change version of dependency** - It depends. If the version on disk already satisfies the version range specified (like `4.x` or `^3.2.0`) you'll need an `npm update` to get the version you expect.
* **New in-range version released** - Like the previous scenario, if you've specified a version range and already have a version installed matching that, `npm install` won't do anything. But `npm update` will.
* **New in-range version released of dependency's dependency** - Really?? Yes. Even if you use specific version numbers in your `package.json`, ranges inside your dependencies' `package.json` files mean that you need an `npm update` for this scenario. Basically you always need to be calling `npm update`.

Whew! All that to get the right versions of your dependencies!

We're trying to match the user experience, right? Well, users are installing from nothing all the time! Here are my changes to remove all of this complexity and get back to a basic, from-scratch `npm install`:

```yaml
dependencies:
  pre:
    - rm -rf ./node_modules
  cache_directories:
    - ~/.npm
```

This will remove the cache-provided `node_modules` directory when starting up, necessary because we can't stop CircleCI from caching that directory. What we can do is add directories to the cache. So we save the user-level `npm` cache to make installs a bit faster.

Personally, I think this should be the default.

## Linux differences

I had been successfully running the `@scottnonnenberg/notate` project on my MacBook Pro for quite some time, so I was surprised when some core infrastructure didn't work during my CircleCI builds.

### Moving to http-server

For a long time I've used [Python](https://www.python.org/) to run [a basic webserver](https://docs.python.org/2/library/simplehttpserver.html) in any directory:

```bash
python -m SimpleHTTPServer 8001
```

It's not hard to remember, and available on any machine that has Python. It's there on any OSX machine with no install required, and available on Windows with a quick install. I have run many successful [`mocha-phantomjs`](https://github.com/nathanboktae/mocha-phantomjs) runs on my machine with it. Even [`broken-link-checker`](https://github.com/stevenvachon/broken-link-checker) runs making many requests very quickly.

But sometimes `SimpleHTTPServer` would [hang my CircleCI build completely](https://circleci.com/gh/scottnonnenberg/notate/33). No timeout from [PhantomJS](http://phantomjs.org/), no warning at all. Just the end of build output, then the build would be cancelled after 10 minutes of no activity. It wasn't immediately obvious what the problem was, but I did find others [talking](http://osdir.com/ml/python.bugs/2000-05/msg00005.html) [about](http://www.psf.upfronthosting.co.za/issue26005) [hangs](http://stackoverflow.com/questions/31731772/python-simplehttpserver-hangs-after-several-requests).

And so, it was time to do what I should have done in the first place. Instead of using something based on Python in my Node.js project, I used something based on Node.js: the [`http-server`](https://github.com/indexzero/http-server) node module. It was a small change to my `npm serve` script:

```bash
http-server -p 8001 -a localhost
```

Voila! No more hangs during my `mocha-phantomjs` runs!

### Moving to npm-run-all

I had been using a [simple custom script](https://github.com/scottnonnenberg/notate/blob/3990719ccfa07d385270f1fda6de95d44d17046d/scripts/cli_client.js) to start my web server, then invoke `mocha-phantomjs` to test against it. It had originally been a fun little bit of coding.

But it wasn't fun anymore when [my builds started to hang because of it](https://circleci.com/gh/scottnonnenberg/notate/7). Coming back later, I now know that some of the hangs were due to `SimpleHTTPServer`. But that wasn't the only source of hangs. My script was attempting to start two different `npm` scripts, then kill them gracefully when complete.

But the killing wasn't going gracefully.

I tried a [few](https://github.com/scottnonnenberg/notate/commit/f7d4eae49b0992449a173962351d9ea405bd8967) [changes](https://github.com/scottnonnenberg/notate/commit/3990719ccfa07d385270f1fda6de95d44d17046d), SSHed into the container to mess around, and did quite a bit of research into [how `npm` manages its `npm run` child processes](https://github.com/npm/npm/issues/4603) on [Linux vs. other platforms](https://github.com/npm/npm/pull/10868#issuecomment-217124265). There were no clear answers here, and I didn't want to spend any more time on it. It was time to [move to a tried-and-true solution](https://github.com/scottnonnenberg/notate/commit/0eb51c29c2d89005b9604ac0412f4bf0feccb76d): [`npm-run-all`](https://github.com/mysticatea/npm-run-all).

I had seen this library used in other open-source projects in the past couple months, and it came up as I was researching `npm`'s behavior with child processes. My custom client test script became very simple:

```bash
npm-run-all --parallel --race serve test-client-all
```

It first runs `npm serve` to run the server, then keeps that running while it runs `npm run test-client-all` for the tests. The key is the `--race` command, which tells `npm-run-all` to kill all processes when the first one exits. It has been working smoothly thus far!

### No time command

Having used the [`time` command](https://en.wikipedia.org/wiki/Time_(Unix)) on Ubuntu VPS machines and OSX as a simple way to get performance stats, I was surprised to find it [causing errors when used in `npm` scripts on Linux](https://circleci.com/gh/scottnonnenberg/eslint-compare-config/1). Something about the way `npm` calls commands on Linux prevents you from calling `time`:

```text
> @scottnonnenberg/eslint-compare-config@1.0.0 mocha /home/ubuntu/eslint-compare-config
> NODE_ENV=test time mocha --recursive --require test/setup.js "-s" "15" "test/unit" "test/integration"

sh: 1: time: not found

npm ERR! Linux 3.13.0-91-generic
npm ERR! argv "/home/ubuntu/nvm/versions/node/v4.2.2/bin/node" "/home/ubuntu/nvm/versions/node/v4.2.2/bin/npm" "run" "mocha" "--" "-s" "15" "test/unit" "test/integration"
npm ERR! node v4.2.2
npm ERR! npm  v2.13.5
npm ERR! file sh
npm ERR! code ELIFECYCLE
npm ERR! errno ENOENT
npm ERR! syscall spawn
npm ERR! @scottnonnenberg/eslint-compare-config@1.0.0 mocha: `NODE_ENV=test time mocha --recursive --require test/setup.js "-s" "15" "test/unit" "test/integration"`
npm ERR! spawn ENOENT
```

I can do it when I SSH into CircleCI machines, but I can't do it from `npm`. Could be `/bin/sh` vs `/bin/bash`?

CircleCI keeps good statistics about the length of builds, so it's not a big deal. It just prevents me from seeing that information during local runs. Disappointing.

The good news is that all three of these changes will make my projects more likely to run on windows.

## Integrations

It's the modern era, and people want their systems to talk to each other. And as one of the leading players in the CI space, CircleCI talks:

* The [standard badge for status of the build](https://circleci.com/gh/scottnonnenberg/notate.svg?style=svg), with auto-generated embed code, including API token for private builds. Or you could use CircleCI badges from [shields.io](http://shields.io/).
* [Simple integration with code coverage services](https://circleci.com/docs/code-coverage/#using-a-code-coverage-service). For example, no token is required to send results to [codecov.io](https://codecov.io/) for GitHub-hosted open source projects.
* [Works with Bitbucket](https://circleci.com/integrations/bitbucket/) too, though it's still in beta.
* [CircleCI Enterprise](https://circleci.com/enterprise/) is an on-premise tool that works with [Github Enterprise](https://enterprise.github.com/home).
* [Slack](https://circleci.com/blog/slack-integration/) and [Gitter](https://gitter.zendesk.com/hc/en-us/articles/200176722-Integrations) integration to centralize communication and status for your team.
* Several options for automatic deployment along with successful builds: [AWS](https://circleci.com/docs/continuous-deployment-with-aws-ec2-container-service/) and [Heroku](https://circleci.com/docs/configuration/#deployment).
* [Custom notification webhooks](https://circleci.com/docs/configuration/#notify) specified in your `circle.yml`.

There's a whole lot to tweak, and nothing's stopping you from adding a new development dependency and doing whatever you need!

## Be continuous!

CircleCI is a great option for open source, private repositories on GitHub, and on-premise with GitHub and CircleCI Enterprise.

Get those builds running on every pull request and commit, track results and performance over time with ['build insights'](https://circleci.com/build-insights), improve build performance with [parallelization](https://circleci.com/docs/parallel-manual-setup/), then start deploying to staging and production!

It all adds up to easy continuous integration and deployment. Jump in!

---

Resources:

* The list of what's included in a CircleCI Ubuntu 14.04 image by default: https://circleci.com/docs/build-image-trusty/ (it's a whole lot - many databases, browsers, versions of languages, etc.)
* A good reference on what you can do in a CircleCI `circle.yml`: https://circleci.com/docs/config-sample/
* More on TravisCI vs. CircleCI from former [Wooters](/woot-shirts/): https://mediocre.com/forum/topics/a-tale-of-two-ci-tools-differentiating-travis-and-circleci


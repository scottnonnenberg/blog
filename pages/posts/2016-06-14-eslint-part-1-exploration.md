---
rank: 9
title: "ESLint Part 1: Exploration"
date: 2016-06-14T22:27:28.926Z
path: /eslint-part-1-exploration/
tags:
  - eslint
  - open-source
  - javascript
  - software
  - nodejs
  - reactjs
---

![eslint logo](https://static.sinap.ps/blog/2016/06_jun/eslint/eslint-logo-rev3.png)

I recently spent some time to review my [ESLint](http://eslint.org/) setup. It's got lots of rules, and a healthy ecosystem of plugins. It's intimidating! Maybe I can help you make some sense of it...

<div class='fold'></div>

## Why ESLint?

For a long time, [JSLint](http://www.jslint.com/), then [JSHint](http://jshint.com/) and [JSCS](http://jscs.info/) were the primary Javascript linting tools. They were important, because Javascript is such an easy language to make mistakes in. To wit, JSLint originally came from the author of [Javascript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do), which famously covers a small subset of the language. Of course, the rest is suggested to be 'the bad parts' - JSLint was designed to help you avoid them!

There are three major factors that caused ESLint to become the gold standard for linting:

### 1. Support for modern Javascript

[React](https://facebook.github.io/react/) was released in early 2013, and with it came a return to compiling something other than pure Javascript into its final browser-ready form. [CoffeeScript](http://coffeescript.org/) was popular for a while, but seemed more like unnecessary syntactic sugar. React, however, was substantially easier to use with [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html). To sweeten the pot, tools to translate JSX also included support for [ES2015](https://github.com/lukehoban/es6features). And none of the leading linters could handle JSX or modern Javascript syntax.

### 2. Plugin architecture

While the previous linting tools did have a large set of options to configure, adding something like JSX support required a fork of the project. In ESLint, however, support for something totally new could be added via plugin. [All sorts of plugins are available today](https://www.npmjs.com/search?q=eslint-plugin), vastly expanding upon ESLint's core value proposition.

### 3. No rules on by default

Of course, ESLint does have a substantial and very useful set of built-in rules. When [ESLint started out in June 2013](http://eslint.org/docs/about/) it was just like its predecessors in that it was quite opinionated, preloaded with a default set of enabled rules. But all rules are now off by default, as of the [version 1.0.0](http://eslint.org/docs/user-guide/migrating-to-1.0.0#all-rules-off-by-default), released [in mid-2015](https://github.com/eslint/eslint/releases?after=v1.4.0). ESLint is no longer an opinionated tool, but a blank slate, ready to be molded into something useful.

## Jumping in

I was a late adopter of ESLint. I got away with it because I didn't really like JSX when I was first using React, so JSHint and JSCS were good enough for me. Thus, ESLint was a big project for indeterminate gain. Eventually I gave in, took the plunge, and upgraded my standard approach: [Webpack](https://webpack.github.io/), [Babel](https://babeljs.io/), and ESLint instead of [RequireJS](http://requirejs.org/) and JSHint.

I figured that the easiest way to jump in was a preset. The [AirBnB ESLint configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) had a pretty good ethos: prefer the ES2015 way of doing things. What better way to jump into the new syntax with both feet?

This served me well for a while, but I slowly realized that I was being kept from detail I cared about. Yes, because of [ESLint's excellent support for building upon others' configurations](http://eslint.org/docs/user-guide/configuring), I could make any customization I wanted on top of the config I was _extending_. But it encouraged me to take what was given to me. And I was sure I was missing something.

## Making it my own

Recently, instead of upgrading to the latest AirBnB config, I embarked on my own odyssey of ESLint discovery. My first step was copying all of AirBnB's configuration into a single `.eslintrc.js` file. It felt really good having it all in front of me like that - I could clearly see how many rules were disabled!

And then I went, rule by rule, attempting to turn everything on. But I didn't do it in a vacuum; I used an existing project with a couple thousand lines of code to test each change. In some cases I absolutely changed a lot of code (`'comma-dangle': ['error', 'always-multiline']`) and in others I wanted to turn it on but the current codebase didn't really allow it (`'max-statements': 'off'`).

When I was done, I wanted to be sure. I went looking for something that would guarantee that I had made a decision for every rule, and found the [`find-eslint-rules`](https://github.com/sarbbottam/eslint-find-rules) node module. Once installed, I had a new `npm` script to tell me whether I had configured, one way or another, every available rule available.

## Expanding horizons with plugins

I felt good, but I wasn't done. A large amount of the value in the world of ESLint comes from its ecosystem. I needed to explore the world of ESLint plugins. I had encountered some via the AirBnB config, some via newsletters and social media, but I wanted to do a sweep myself.

And so, I went deep into the NPM registry with [a generic 'eslint-plugin' search](https://www.npmjs.com/search?q=eslint-plugin). Page after page, collecting plugins that looked interesting. Here are some I found notable...

### General

[`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import) is an amazing plugin, alerting you to missing or malformed `require()` or `import` statements. Before, you had to run your code to catch incorrect references! It made me realize the kinds of high-value things ESLint could do.

[`eslint-plugin-security`](https://github.com/nodesecurity/eslint-plugin-security) is similarly creative. The [Node.js Security Project](https://nodesecurity.io/) reviews node modules and their [`nsp` tool](https://www.npmjs.com/package/nsp) checks for vulnerable node modules in your dependencies. This plugin helps them do that job, and it can help you with your project as well. _Note: it will fire false positives!_

[`eslint-plugin-better`](https://github.com/idmitriev/eslint-plugin-better) draws from more [Douglas Crockford wisdom](https://www.youtube.com/watch?v=PSGEjv3Tqo0), attempting to limit you to the 'good parts' of Javascript. If you have some features of Javascript you want to avoid in your project, this plugin might be for you!

[`eslint-plugin-filenames`](https://github.com/selaux/eslint-plugin-filenames) makes filenames consistent across your project. It's about more than just consistency - incorrect casing can cause problems on different OSes, since some are case-sensitive, some aren't. You definitely don't want something that works locally to break only the server, right?

### React

[`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) is a must-have if you're using React with JSX. It will communicate that variables used inside of JSX are used globally, so ESLint's `no-unused-vars` rule stops firing. It can also push you towards simple [Stateless Components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d) when appropriate, and definitely helps with standardizing JSX formatting across your project.

[`eslint-plugin-jsx-a11y`](https://github.com/evcohen/eslint-plugin-jsx-a11y) helps you remember to include accessibility attributes in your JSX. It's so easy to forget about this stuff. I very much recommend using this plugin.

### Functional design

[`eslint-plugin-immutable`](https://github.com/jhusain/eslint-plugin-immutable) is a simple little plugin that keeps me honest when I'm trying to use [functional design](/a-functional-distinction/) in my projects. No `let` keyword, no mutation of objects, and no `this`. Sadly, it doesn't work very well with [CommonJS](https://webpack.github.io/docs/commonjs.html).

[`eslint-plugin-no-loops`](https://www.npmjs.com/package/eslint-plugin-no-loops) takes it even further, pushing you towards `map()` and `reduce()` instead of iteration. It's a great exercise to implement something without loops when you'd usually reach for a loop. Quite frequently I find that the logic gets simpler and easier to reason about.

### Testing

[`eslint-plugin-chai-expect`](https://github.com/Turbo87/eslint-plugin-chai-expect) is a tiny little plugin. It checks for common assertion mistakes. My favorite is `terminating-properties` which reminds you whether it should be `expect().to.exist` or `expect().to.exist()`. It's the former. :0)

[`eslint-plugin-bdd`](https://github.com/Nate-Wilkins/eslint-plugin-bdd), another plugin, protects against something I've accidentally included in pull requests a couple times. Without an easy way to `--grep` your tests runs, it's common to use `.skip()` or `.only()` to exclude or run a subset of your tests. Use it, but don't commit it!

### Funny

[`eslint-plugin-json`](https://github.com/azeemba/eslint-plugin-json) is not a plugin I'd recommend. I like [JSON format checking](https://github.com/zaach/jsonlint) as much as the next guy, but this one [pulls in all of JSHint](https://github.com/azeemba/eslint-plugin-json/blob/master/package.json#L25) just to [check for well-formed JSON](https://github.com/azeemba/eslint-plugin-json/blob/master/lib/index.js#L37)!

[`eslint-plugin-no-js`](https://github.com/chicoxyzzy/eslint-plugin-no-js) is very opinionated. It recommends that you dispense with Javascript entirely. As it says, "your code sucks." :0)

### Close, but not quite

[`eslint-plugin-graphql`](https://github.com/apollostack/eslint-plugin-graphql) was so close! I really like [GraphQL](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html) and I use it. I just don't use it in a way that would make using this plugin easy since I'm not using [Relay](https://facebook.github.io/relay/). I'll probably get there, especially if I submit a PR!

[`eslint-plugin-promise`](https://github.com/xjamundx/eslint-plugin-promise) is needed. I see [incorrect, error-swallowing use of promises](/the-trouble-with-promises/) all the time. But this plugin [has some key bugs](https://github.com/xjamundx/eslint-plugin-promise/issues/8#issuecomment-218793367). Again, I'll probably come back to this one later.

### So many!

I tried others that didn't make the cut, and there are certainly plugins I missed entirely. [Let me know](mailto:scott@nonnenberg.com) if there's one you find useful that's not in this list!

## Announcing: My Configuration!

After all my explorations, including tests in a number of projects, I decided to bring all that learning together into one core project: [`@scottnonnenberg/eslint-config-thehelp`](https://github.com/scottnonnenberg/eslint-config-thehelp), available via `npm` now! It greatly shrank my `.eslintrc.js` file in each project, and makes it far easy to start up a new project.

### One install

I wanted to make it a single install, so my configuration includes ESLint and all needed plugins. And this means, given ESLint plugin resolution rules, that you need `npm` version 3 and its flat `node_modules` directory structure. It seems like a reasonable tradeoff. [`peerDependencies` are messy](https://github.com/eslint/eslint/issues/3458).

### Principles

As I was coming up with my ruleset, I kept a couple key principles in mind. First:

> _Rules specify the 98% case. `eslint-disable` will cover the rest. I can periodically search for those exceptions and re-verify their need._

Additional more-specific principles emerged as I refined my approach:

* Always use 'error' or 'off' instead of 0 and 2. Numbers are for real config values.
* No warnings. Either disallow it completely, or don't worry about it at all.
* All 'off' rules must have a reason mentioned in comments.
* Don't include any configuration if that configuration is the same as the defaults.
* Rules are in alphabetical order: first core ESLint, then plugins sorted by name
* All rules from core and plugins must be included

### Multiple configurations

In my explorations I discovered a couple different types of configurations I'd need, so I included this set in the package:

* [`@scottnonnenberg/thehelp/core`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/core.js) - node modules targeting downlevel versions of Node.js, or without precompilation before the browser.
* [`@scottnonnenberg/thehelp/es2015`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/es2015.js) - modern Javascript, preferring new techniques when applicable.
* [`@scottnonnenberg/thehelp/functional`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/functional.js) - when I want to use functional design principles.
* [`@scottnonnenberg/thehelp`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/default.js) (default) - the combination of all three above configurations
* [`@scottnonnenberg/thehelp/react`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/react.js) - when writing React applications
* [`@scottnonnenberg/thehelp/scripts`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/scripts.js) - relaxed rules for a project's `scripts/` directory
* [`@scottnonnenberg/thehelp/test`](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/master/test.js) - additional and relaxed rules for a project's `test/` directory

With ESLint it's really easy to choose one or more of these to merge into your final configuration:

```javascript
{
  extends: [
    '@scottnonnenberg/thehelp/core',
    '@scottnonnenberg/thehelp/es2015',
    '@scottnonnenberg/thehelp/react',
  ],
}
```

### Testing

It's worth talking about my test strategy for the package. Sadly, I have had to release new versions because ESLint plugin resolution rules don't work with `npm link`. Thus it's a bit hard to test.

But I can do these things, and I'd recommend them for you too:

* _[Check for missing rules](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/3eaed6cda4e14c10df6609885361776c28691a70/package.json#L13-L16)_ - I include a `eslint-find-rules` run in my overall `npm test` command, which ensures that I've configured everything. When new rules are released, you'll be sure to catch them!
* _[Check for well-formed configuration](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/3eaed6cda4e14c10df6609885361776c28691a70/scripts/validate.js#L5-L11)_ - I discovered ESLint's built-in validator via [1000ch's `eslint-config` tests](https://github.com/1000ch/eslint-config/blob/1a0c65c452ae2bbdf35fab3da29164fb138bb55d/test/index.js). You'll at least be sure that your configuration loads successfully.

## Optimizations

While digging pretty deep into ESLint, I discovered a couple things I didn't know before. Maybe you'll find them useful?

### Hierarchical configuration

You probably have one `.eslintrc.js` or `eslintrc.yml` in your root project folder. But did you know that you can put one of these files in any folder, and `eslint` will pick it up? What's more, ESLint will **merge** configuration in parent directories with that for the current directory. That's why I added the `test` and `scripts` configurations to `@scottnonnenberg/eslint-config-thehelp`.

For example, in `test/.eslintrc.js` I can include this:

```javascript
{
  extends: [
    '@scottnonnenberg/thehelp/test',
  ],
}
```

All of my global project configurations will apply, and the changes in the `test` configuration will be merged in. Fancy!

### Editor Integration

I resisted adding a linter into my project for a long time, preferring to wait to do a test/lint run later. But the additional value ESLint provides over classic linting is useful real-time. And with [SublimeText 3](https://www.sublimetext.com/3), [SublimeLinter](http://sublimelinter.readthedocs.io/en/latest/), and its [ESLint plugin](https://github.com/roadhump/SublimeLinter-eslint) it's all very fluid, no configuration fuss or undue delays.

I love getting immediate feedback about incorrect paths in `require()` or `import`. The red everywhere when I start a new file can be annoying, but I think it's worth it.

### Gotchas with babel-eslint

[`babel-eslint`](https://github.com/babel/babel-eslint) is an alternate parser which can be useful if you're using bleeding edge Babel language constructs. In my case, I like to use [static properties](http://babeljs.io/docs/plugins/transform-class-properties/) in my React components for `propTypes`.

It doesn't always work smoothly, however. Sometimes bugs are [fixed for the default parser but not for `babel-eslint`](https://github.com/eslint/eslint/issues/6266#issuecomment-222557932).

I ran into some performance issues as well. If ESLint is slow for you with `babel-eslint`, first ensure you installed everything with `npm` 3.x, which automatically de-dupes modules. Then, double-check the versions of all your top-level Babel-related dependencies. I saw a big improvement when I made a couple key versions consistent:

**Before (17.8 seconds)**

```JSON
{
  "babel-cli": "6.7.7",
  "babel-eslint": "6.0.4",
  "babel-preset-es2015": "6.6.0",
}
```

**After (4.9 seconds)**

```JSON
{
  "babel-cli": "6.9.0",
  "babel-eslint": "6.0.4",
  "babel-preset-es2015": "6.9.0",
}
```

## Use it!

ESLint is an amazingly useful tool. If you're not using it today, I recommend that you start. If you already are, I hope this article helps you leverage it fully!

And you can use [`@scottnonnenberg/eslint-config-thehelp`](https://github.com/scottnonnenberg/eslint-config-thehelp) directly, submit pull requests to improve it, or fork it and make it your own!

But first check out the next post in the series: [ESLint Part 2: Contribution](/eslint-part-2-contribution/), about contributing back to the ESLint ecosystem. Or skip to the final post, [ESLint Part 3: Analysis](/eslint-part-3-analysis/)!

---
rank: 25
title: Better docs and static analysis
date: 2016-12-06T18:19:26.567Z
layout: post
path: /better-docs-and-static-analysis/
next: /six-books-for-greater-context/
previous: /be-a-scientist-dev-productivity-tip-3/
tags:
  - stack-improvements
  - reactjs
  - nodejs
  - javascript
---

Welcome to the third post in my [stack improvements](/tags/stack-improvements/) series! This time we'll be talking about [Flow](https://flowtype.org/), a static analysis tool which can improve your Javascript development no matter your choice of framework or platform.

<div class='fold'></div>

## Meaningless documentation

I was introduced to [Javadoc](https://en.wikipedia.org/wiki/Javadoc) in college, and it seemed like a reasonable idea. You could generate [a nicely-structured site with all sorts of program metadata](http://docs.oracle.com/javase/1.5.0/docs/api/index.html). All you needed was some [simple structured comments](https://en.wikipedia.org/wiki/Javadoc#Example). [JSDoc](http://usejsdoc.org/about-getting-started.html) is the same thing for the Javascript ecosystem. It's very well-supported - you can even turn on an [ESLint](http://eslint.org/) [rule which requires JSDoc](http://eslint.org/docs/rules/require-jsdoc) to be present and comprehensive.

But it was at Microsoft where I saw the potential downsides of this kind of documentation:

> "**GetType** - Gets the Type of the current instance." ([MSDN Library](https://msdn.microsoft.com/en-us/library/system.io.log.logrecord_members(v=vs.85).aspx))

So much wasted text. So often I would consult the MSDN documentation only after something was unintuitive, expecting to find a note to that effect. But I was almost always disappointed. It was shades away from insulting, especially after spending all that time and disk space to install the entire MSDN Library!

You see why open source is so interesting to me - when the docs are lacking, I just look at the code!

Really, this is the danger of asking people to document everything in a very structured way. You might get compliance, but it might end up as more of a form of protest. Structured but meaningless.

## Misleading documentation

As I wrote more production code, another problem became clear: documentation which might have started out with good intentions rapidly gets out of date.

The decay over time has a couple standard reasons:

1. Increased comfort with the codebase means that each developer is no longer referring to the JSDoc to figure out what a function does. This means it's not top of mind when making changes to the code.
2. During code reviews the diffs are great for showing that the changes made are appropriate, but not that all the necessary changes are made. Docs that aren't changed aren't ever reviewed.

Slowly but surely, code changes accumulate without the associated documentation changes.

At this point the documentation is actively harmful for a developer new to the codebase. At best, sprinkling doubt over hard-won conclusions made from reading the code itself. At worst, causing bugs when developers don't take the time to double-check what they read in the documentation.

## The goal

What's the goal, here, really? Why is documentation useful at all? Well, variable and function names aren't everything. Sometimes you do need to talk about the *why* of a function, what it's trying to achieve, why it exists in the first place. Or [perhaps its history of attempted optimizations](http://stackoverflow.com/questions/184618/what-is-the-best-comment-in-source-code-you-have-ever-encountered).

And in a language like Javascript, without stated types, documentation can bridge the gap: specifying a function's return type and the expected types for each parameter.

## Flow

Okay, so no tool will ever be able to tell whether developers have included a high-quality _why_ comment. But we can make some progress on the types.

The key with Flow is that, unlike JSDoc, the types specified aren't just for the next developer who comes along. They are consumed by the tool, and are used to help ensure your numbers aren't being used like strings - unless you really mean it.

## Getting started

The first step towards getting started with Flow is installing the tool itself. If you're on OSX, I'd recommend using [Homebrew](http://brew.sh/) to install it globally, for reasons we'll discuss later. Otherwise, the [`flow-bin`](https://www.npmjs.com/package/flow-bin) node module will work:

```bash
brew install flow
# or
npm install --save-dev flow-bin
```

Next, choose a project to experiment with. I jumped in with a 6000-line [Node.js](https://nodejs.org/)/[React.js](https://facebook.github.io/react/) personal project.

Because the `flow` command has a bit of an unusual return value scheme, the easiest way to run it is via a `package.json` script:

```json
{
  "scripts": {
    "flow": "flow; test $? -eq 0 -o $? -eq 2"
  }
}
```

Now you're ready to tell `flow` which parts of your project it should look at. Enable analysis of a given Javascript file with this comment at the top of the file:

```javascript
// @flow
```

Now you can see if Flow finds anything with this most minimal setup:

```bash
$ npm run flow

> application@0.0.1 flow /Users/username/application
> flow; test $? -eq 0 -o $? -eq 2

Launching Flow server for /Users/username/application
Spawned flow server (pid=25082)
Logs will go to /private/tmp/flow/zSUserszSusernamezSapplication.log

No errors!
```

This first time you run `flow` in a given session, you'll note that it spins up a server. This is the key optimization which ensures that Flow the fastest Javascript static analysis tool you've ever used.

## Configuration

The first thing you should know is that once you start adding type annotations to your code, it won't run anymore. You're no longer writing Javascript that runs natively in the browser or  Node.js. You'll need to use [Babel](https://babeljs.io/) to clean up your code before it runs. The good news is that if you're using [`babel-react-preset`](https://babeljs.io/docs/plugins/preset-react/) then your setup already removes type annotations with [`transform-flow-strip-types`](https://babeljs.io/docs/plugins/transform-flow-strip-types/). If not, time to [add this transform to your setup](https://babeljs.io/docs/plugins/transform-flow-strip-types/#usage).

Next, you probably didn't get a clean "No errors!" run like my example above. It's time to talk about [Flow configuration](https://flowtype.org/docs/advanced-configuration.html).

If you've got a good number of node modules installed, you might have seen some errors coming from your `node_modules` directory. My first `.flowconfig` entries were to remove a couple malformed JSON test files put on disk by node modules. Here's my `ignore` section:

```text
[ignore]
# these files don't parse!
&lt;PROJECT_ROOT>/node_modules/config-chain/test/broken.json
&lt;PROJECT_ROOT>/node_modules/conventional-changelog-core/test/fixtures/_malformation.json
&lt;PROJECT_ROOT>/node_modules/findup/test/fixture/config.json
&lt;PROJECT_ROOT>/node_modules/findup/test/fixture/f/e/d/c/b/a/top.json
&lt;PROJECT_ROOT>/node_modules/findup/test/fixture/f/e/d/c/config.json
```

With that out of the way, you might next see some 'Required module not found' errors. I know I did. Once more, [I pay for](/eslint-part-2-contribution/#1-thehelpabsolute-or-current-dir) [my absolute paths](https://github.com/scottnonnenberg/eslint-config-thehelp#key-configuration). Instead of providing additional search paths, I found that I needed to translate source paths to target paths. With `module.name_mapper`, you specify a regular expression and a replacement value using `\1`-style captures. Here I allow for absolute references to my `src` and `scripts` directories, as well as `package.json` in the root:

```text
[options]
# needed for absolute paths
module.name_mapper='^src\(.*\)$' -> '<PROJECT_ROOT>/src\1'
module.name_mapper='^scripts\(.*\)$' -> '<PROJECT_ROOT>/scripts\1'
module.name_mapper='^package.json$' -> '<PROJECT_ROOT>/package.json'
```

## Developer setup

It's great to get everything working from the command line, but we can do better. Let's make things more a little more productive for ourselves.

First, let's get those errors in the editor! I use [SublimeText](https://www.sublimetext.com/), so I installed [FlowIDE](https://github.com/tptee/FlowIDE) via [Package Control](https://packagecontrol.io/). It's a great little plugin! It shows Flow-produced errors right inline, along with autocomplete taken from the Flow server running in the background. And it updates surprisingly quickly after you change the code!

> "Using `flow-bin`'s binary will slow down editing features because it is wrapped in a Node script and starts an interpreter on each run." ([FlowIDE docs](https://github.com/tptee/FlowIDE#usage))

Sadly, if you're using `flow-bin` instead of a globally-installed `flow` binary, your FlowIDE experience will be slower. Don't say I didn't warn you!

Next, you probably still want to be able to lint your code. Because the default [ESLint](http://eslint.org/) parser chokes on type annotations, you'll need to move to [`babel-eslint`](https://github.com/babel/babel-eslint) as your parser. This one was easy; I was already using `babel-eslint` for [class properties](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-class-properties) support.

But there's more! [It's important to establish a consistent style](/eslint-part-3-analysis/#the-importance-of-tools), and that includes both type annotation and full type declarations. It's time to install [`eslint-plugin-flowtype`](https://github.com/gajus/eslint-plugin-flowtype). But be sure to start with this configuration, or you'll immediately have hundreds and hundreds of errors:

```javascript
module.exports = {
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
}
```

With this option enabled, only files which already have the file-level `// @flow` annotation will be processed by `eslint-plugin-flowtype`.

You may be wondering how to configure [the large set of rules provided by `eslint-plugin-flowtype`](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype). Here's what I used when starting out in my project. As usual, I kept [rules enabled unless I had good reason for a change](/eslint-part-1-exploration/#principles):

```javascript
{
  // not compatible with Flow typecasts
  'no-extra-parens': 'off',

  'flowtype/boolean-style': 'error',
  'flowtype/define-flow-type': 'error',
  'flowtype/delimiter-dangle': ['error', 'always-multiline'],
  'flowtype/generic-spacing': 'error',
  'flowtype/no-dupe-keys': 'error',
  // over time, you can transition from Object to named types
  'flowtype/no-weak-types': ['error', {
    any: true,
    Function: true,
    Object: false,
  }],

  'flowtype/object-type-delimiter': 'error',
  'flowtype/require-parameter-type': ['error', {
    excludeArrowFunctions: true,
  }],
  'flowtype/require-return-type': ['error', 'always', {
    excludeArrowFunctions: true,
  }],
  'flowtype/require-valid-file-annotation': ['error', 'always', {
    annotationStyle: 'line',
  }],
  'flowtype/semi': 'error',
  // the ability to organize conceptually is important
  'flowtype/sort-keys': 'off',
  'flowtype/space-after-type-colon': 'error',
  'flowtype/space-before-generic-bracket': 'error',
  'flowtype/space-before-type-colon': 'error',
  'flowtype/type-id-match': 'error',
  'flowtype/union-intersection-spacing': 'error',
  'flowtype/use-flow-type': 'error',
  // deprecated; warns on bad syntax accepted by babel-eslint
  'flowtype/valid-syntax': 'error',

}

```

At a high level, this will force you to annotate all (non-arrow) function parameters and return values. But you can't use `any`, since that's the same as no annotation. And, as you might expect, its whitespace rules match [my general ESLint config](https://github.com/scottnonnenberg/eslint-config-thehelp).

## Code changes

Now, it's finally time to start converting files! I went one file at a time in my 6000-line project, top to bottom. Here are some of the key code changes I made:

### Null checking

You can tell Flow that a given variable or parameter can be either a type or null with the question mark: `name: ?string`. If you do this, you'll get an error if you try to do something with the string (like `name.length`) before checking against null:

> "Property cannot be accessed on possibly null value"

Once you have a guard in place (like `if (name)`), Flow will stop complaining.

### Type checking

In Flow, you can specify that a given variable or parameter can be one of a few types, like `options: string | string[]` for either a string or an array of strings. Once you use this syntax, Flow will not let you treat that variable like either of those types until you have checked the type.

I was using [`lodash`](https://lodash.com/) to check types before, but Flow doesn't understand those calls. For example, I needed to convert `_.isString(options)` to `typeof options === 'string'`. And `_.isArray(options)` needed to be `Array.isArray(options)`.

### React propTypes

[`propTypes`](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) are a debugging tool to help you ensure that your React components are being used the way they are meant to be. Warnings fire at runtime in development mode when props are missing or the wrong type.

With Flow, we can take this experience into the editor. First, [specify the type of a React component's `props` as an object with keys of certain types](https://flowtype.org/docs/react.html#defining-components-as-reactcomponent-subclasses). When you use that component in JSX, Flow will analyze the values provided as props, and warn accordingly! It was surprising and satisfying to be told that I needed to change some of my tests to pass the right props!

### The escape valve

Sometimes you're doing weird things. It's not that you can't express it in Flow's type system, it's just that doing so isn't worthwhile. For example, I was adding random keys to an array - the union type required would have needed typecasts or code changes across the project.

You can create an escape valve with this entry in your `.flowconfig`:

```text
[options]
suppress_comment=^ flow-disable-next-line
```

Like [ESLint's escape valves](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments), you can put it in a comment on the line before any offending code:

```javascript
// flow-disable-next-line
x.doBadThings();
```

## Libraries

Once I had my own project's code converted, it was clear that I could get a whole lot more value out of Flow if I had type information for my dependencies. It was time for [`flow-typed`](https://github.com/flowtype/flow-typed).

With a couple commands I had definitions for eight node modules, and placeholders for the rest:

```bash
npm install -g flow-typed
flow-typed install
```

To get Flow to pick them up, my `.flowconfig` needed another entry:

```text
[libs]
<PROJECT_ROOT>/flow-typed/
```

Just like that, I had a whole lot more value out of my Flow runs. I did discover a couple issues with the definitions I had downloaded, but the fixes were easy and I [submitted a quick pull request to share the love](https://github.com/flowtype/flow-typed/pull/511). And yes, I did end up deleting all of the placeholders.

`flow-typed` isn't as comprehensive as [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), the [TypeScript](https://www.typescriptlang.org/) ecosystem's type repository. But it will hopefully get there. Alternately, [it's a growing trend](https://github.com/graphql/graphql-js/releases/tag/v0.8.0) [for libraries to](https://github.com/styled-components/styled-components/blob/17885676927849ebe417ed23398af50e866f6d9b/docs/flow-support.md) [ship their own definitions out of the gate](https://github.com/facebook/immutable-js/blob/c49cad6ce61fc6cab35d45b080e34f55e04101b7/type-definitions/immutable.js.flow). We'll see!

## Both correct documentation and static analysis!

With Flow, we get up-to-date type documentation because we get extra value from the tool if we give it the information it needs to analyze the code. Unlike JSDoc, it doesn't feel quite so pointless. It fits right into [that 'make it worthwhile' systems lesson I learned at Microsoft](/12-things-i-learned-from-microsoft/#11-you-can-and-should-be-entrepreneurial-inside-a-big-company). And when we do start to get lazy, the tool will let us know if the type doesn't match up with how we're using it.

Maybe now we'll have a little bit of extra time to write up that _why_ documentation!



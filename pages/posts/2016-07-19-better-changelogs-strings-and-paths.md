---
rank: 33
title: Better changelogs, strings, and paths
date: 2016-07-19T17:00:26.971Z
layout: post
path: /better-changelogs-strings-and-paths/
next: /hands-on-with-circleci-and-node-js/
previous: /private-node-js-modules-a-journey/
tags:
  - git
  - stack-improvements
  - open-source
  - nodejs
  - javascript
  - software
---

I'm always on the lookout for ways to do Node.js and Javascript development better, but I haven't found a good vehicle for these kinds of discoveries yet. [I briefly mentioned a few in a recent post](/the-state-of-thehelp/#lessons-learned), and [covered ESLint quite deeply in three full posts](/tags/eslint/).

Let's channel [Goldilocks](https://en.wikipedia.org/wiki/Goldilocks_and_the_Three_Bears) and see if we can hit the sweet spot with this one. Here are a few nice stack improvements from my last couple months...

<div class='fold'></div>

## standard-version + validate-commit-msg

Far too many package owners out there direct their users to a [raw commit log](https://github.com/scottnonnenberg/notate/commits/master) to figure out what's been happening lately. Yes, commits do track all changes in the project. But an explicit [`CHANGELOG.md`](https://github.com/scottnonnenberg/notate/blob/master/CHANGELOG.md) in your repository is so much clearer.

What if we could make changelog generation automatic?

[`standard-version`](https://github.com/conventional-changelog/standard-version) does just that. It will automatically update `CHANGELOG.md` based on your recent commits, bump version numbers automatically based on what kinds of changes were made, and even add a `git` tag.

What's the catch? You have to format your commit messages in a [certain 'conventional' way](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md), taken from the [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines). For example, this is a new 'parameters' feature, which will bump the minor version by itself, but the the breaking changes annotation in the body will cause this commit to force a major version bump instead:

```text
feat(parameters): cb parameter first, must be fn; new: justNotate()

BREAKING CHANGE: now `notate(cb, err, data)` instead of
`notate(err, cb, data`. Also, cb is required unless you are using
`justNotate(err, data)`.
```

How will you remember to follow this format? How will you ensure everyone working in a repository follows it?

Have no fear! The [`ghooks`](https://github.com/gtramontina/ghooks) node module allows you to set up `package.json`-defined [`git` hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) ([`husky`](https://github.com/massiveart/husky) works for this too), installed in a project at `npm install` time. And the [`validate-commit-msg`](https://github.com/kentcdodds/validate-commit-msg) node module is designed for the [`commit-msg` hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#committing-workflow-hooks-KpT2hQhaik), ensuring that commit messages are formatted properly! In your `package.json`:

```json
{
  "config": {
    "ghooks": {
      "commit-msg": "validate-commit-msg"
    },
    "validate-commit-msg": {
      "maxSubjectLength": 72
    }
  },
}
```

_(I have no idea why the default is 100 characters - any more than 72 characters [wraps on Github](https://github.com/conventional-changelog/standard-version/commit/026d84493de34b8bbe556bf177c51e1623c605ad)!)_

You have two options to handle pull requests:

1. Every commit inside of each pull request follows commit guidelines and can appear in your changelog.
2. By using [GitHub's squash merge](https://github.com/blog/2141-squash-your-commits) for pull requests, the changelog will point to the pull request for that item. [Each pull request should address just one thing](https://github.com/conventional-changelog/standard-version#should-i-always-squash-commits-when-merging-prs), since it will be able to have just one entry in the changelog. I prefer this approach.

You can even go further and use [the `commitizen` project](http://commitizen.github.io/cz-cli/) to generate commits of the right format. You might consider it to help out folks new to the syntax.

I'm a huge fan! I use it all of my projects now.

## Tagged template literals

Do you use the new [backtick](https://en.wikipedia.org/wiki/Grave_accent#Use_in_programming)-delimited strings introduced in [ES2015](https://github.com/lukehoban/es6features), now known as [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)? I like them a lot. I turned on ESLint's [`prefer-template` rule](http://eslint.org/docs/rules/prefer-template) to make me use them more!

But I did discover a frustration with them: they would quickly get too long for my 90-character lines. And unlike [normal string concatenation](https://github.com/scottnonnenberg/eslint-compare-config/blob/c2350af89a51bff9978f471260252120a0fa36cf/src/render_differences.js#L56-L63), I can't split up the line without getting both newlines and extra spaces (due to indentation) in the final string!

It turns out that we have a release valve. The ECMAScript spec for template literals allows for something called a [tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) to be prepended. And this function can do all sorts of interesting processing with the contents of that literal.

For example, removing newlines and indentation from a multiline template literal, very much needed in my code:

```javascript
const oldIndented =
  'one\n' +
  '  two\n' +
  'Three';
const newIndented = removeIndentTag`
  one
    two
  three
`;

const oldSingleLine =
  'one' +
  ' two' +
  ' three';
const newSingleLine = removeNewlinesTag`
  one
  two
  three
`;
```

I think we can agree that the old is a lot more painful to deal with than the new: remembering to include those spaces on the second and third lines of `oldSingleLine`, remembering to include `\n` and `+` in the right parts of `oldIndented`. The new is clean and simple.

And these tag functions are not hard to write yourself! The key is the `(strings, ...values)` function prototype, and the `reduce()` call to build the final string from the provided pieces:

```javascript
function assembleTag(strings, ...values) {
  return strings.reduce((result, item, i) => result + values[i - 1] + item);
}
```

After that, you can do whatever you want with the resultant string. Here's a simple method of composing serial 'processor` methods which each take and return a string:

```javascript
function composeTag(...processors) {
  return function tag(...args) {
    const value = assembleTag(...args);
    console.log('raw:');
    console.log(`'${value}'`);
    return processors.reduce((result, item) => item(result), value);
  };
}
```

We can now build the two tags show above, `removeIndentTag` and `removeNewlinesTag`:

```javascript
function trimNewlines(value) {
  return value
    .replace(/^\r\n|\n|\r/, '')
    .replace(/\r\n|\n|\r$/, '');
}

function removeNewlines(value) {
  return value
    .replace(/\r\n|\n|\r/g, ' ');
}

function removeIndent(value) {
  const matches = value.match(/^[ \t]*(?=\S)/gm);
  const lengths = matches.map(match => match.length);
  const minLength = Math.min(...lengths);

  if (!minLength) {
    return value;
  }

  const regexp = new RegExp(`^[ \\t]{${minLength}}`, 'gm');
  return value.replace(regexp, '');
}

const removeIndentTag = composeTag(trimNewlines, removeIndent);
const removeNewlinesTag = composeTag(trimNewlines, removeIndent, removeNewlines);
```

You have all the pieces now - you can do much more interesting things than this with your tag functions. Get creative! Return something other than a string! Do interesting transforms on the data before you assemble the final string!

And use this code, [in my blog-code project on GitHub](https://github.com/scottnonnenberg/blog-code/tree/master/better-strings), as your starting point!

## app-module-path

I touched on [`app-module-path`](https://github.com/patrick-steele-idem/app-module-path-node) in my [second ESLint article](/eslint-part-2-contribution/#1-thehelpabsolute-or-current-dir), but it's worth talking about it a bit further. Why? I strongly believe that we should completely eliminate `../` in all `require()` and `import` statements.

The importance of this becomes clear once a project grows to more than five or so directories. And certainly if you routinely need to pop up more than a level or two. Once I'm up to about four levels, I almost never get it right the first time. And most of my tests have that many levels to traverse when pulling in product code. It's a problem.

`app-module-path` fixes all that by letting you add more search paths to be used by your [Node.js](https://nodejs.org/) `require()` or `import` statements. By default in Node.js any path that doesn't start with `..` or `./` searches files and directories under your `node_modules` directory. Now you can make a path like `src/views/login` look at your own project's files!

Setting it up is extremely simple, with three options:

1. `require('app-module-path').addPath(targetDir);` to add `targetDir` as a new base path.
2. `require('app-module-path/register')` to add the directory of the requiring file as a new base path.
3. `require('app-module-path/cwd')` to add the current working directory as a new base path. Given that most lookups are from the root of the project and most apps don't change their working directory, this is a great option.

It should be noted, sadly, that node modules probably shouldn't do this. Sure, use it during testing to make the `require()` statements in your tests nicer, but don't force this behavior on your clients. Using something like this is a process-level decision. And it might make it hard to [Webpack](https://webpack.github.io/) or [Browserify](http://browserify.org/) your module.

And finally, do be aware that you can easily shadow installed node modules if you have files or directories in your own project with the same name. Your files will be loaded first in the case of a conflict.

## Always improving!

Well, those are the big ones. As you might expect, there lots of other recent small wins:

* [Combined istanbul coverage data from client and server runs](https://github.com/scottnonnenberg/notate/blob/0a479118ef849cad739d984cc728a64439567fab/package.json#L52) for the first time. Fancy!
* [Extracted code coverage from a mocha-phantomjs run](https://github.com/scottnonnenberg/notate/blob/0a479118ef849cad739d984cc728a64439567fab/package.json#L27) (lightweight compared to [`grunt-mocha`](https://github.com/kmiyashiro/grunt-mocha))
* [Moved to the excellent `config` node module](https://github.com/scottnonnenberg/notate/blob/0a479118ef849cad739d984cc728a64439567fab/scripts/sauce_platforms.js#L45) (instead of environment variables)
* [Wrote my own lightweight script to run Sauce Labs unit tests](https://github.com/scottnonnenberg/notate/blob/0a479118ef849cad739d984cc728a64439567fab/scripts/sauce_tests.js) (lightweight with no [Sauce Connect](https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect), saves full results locally)

Given that I'm always learning new things and refining techniques, I should be able to make a series out of these kinds of posts. Keep an eye out!

And of course, let me know if you come across anything interesting! :0)

---

There is a library out there that provides some useful tag functions like what I describe above, but [I wouldn't recommend it](https://github.com/declandewet/common-tags/issues/45).


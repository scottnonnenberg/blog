---
rank: 24
title: "ESLint Part 2: Contribution"
date: 2016-06-16T18:36:43.686Z
layout: post
path: /eslint-part-2-contribution/
next: /eslint-part-3-analysis/
previous: /eslint-part-1-exploration/
tags:
  - eslint
  - open-source
  - javascript
  - software
  - nodejs
  - reactjs
---

![eslint logo](https://static.sinap.ps/blog/2016/06_jun/eslint/eslint-logo-rev3.png)

[I recently wrote about](/eslint-part-1-exploration/) my [ESLint](http://eslint.org/) exploration and [configuration node module](https://github.com/scottnonnenberg/eslint-config-thehelp). But I went further than that - I contributed back to the ESLint community! I submitted several pull requests and released a [plugin of my own](https://github.com/scottnonnenberg/eslint-plugin-thehelp) - and you can too!

<div class='fold'></div>

## Pull Requests

I had a beginner's mind as I dug deep into ESLint for the first time. I discovered, tried, and then contributed back to a number of projects:

### [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)

It was pleasure to have [Adam Baldwin](https://github.com/evilpacket) of the [Node.js Security Project](https://nodesecurity.io/) [speak at Seattle Node.js in April](http://www.meetup.com/Seattle-Node-js/events/229425709/). And I saw him [talk about evil regular expressions at CascadiaJS](http://2015.cascadiajs.com/speakers/adam-baldwin) last summer. So I was happy to discover a security-focused ESLint plugin written by the man himself!

I was confused when I got so many errors for my simple code, so I took a trip to the readme. Sadly, there wasn't a lot of documentation. Looking further, I did get what I was looking for at the [^Lift Security blog](https://blog.liftsecurity.io/). So I [submitted a pull request improving the documentation](https://github.com/nodesecurity/eslint-plugin-security/pull/2). Doesn't [my updated readme](https://github.com/scottnonnenberg/eslint-plugin-security/blob/28b01f708f0dd6b51da5b07a492a74f5b639ac12/README.md) look more helpful?

Sadly, the project hasn't seen much movement lately. Maybe if you add a &#128077; you can help convince them to merge it? :0)

### [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames)

Exploring the rules offered by this plugin, I was happy to see custom regular expressions available, because the default is `camelCase.js`. Call me old-school, but I like my `snake_case_file_names.js`.

But then I encountered its `match-exports` rule. I wanted to use it as well, but it was doing a plain comparison between the filename and the exported variable. And I'm definitely not about to `var snake_case;`. So, time for [a pull request introducing a `transform` option](https://github.com/selaux/eslint-plugin-filenames/pull/9) allowing for '[snake](https://www.npmjs.com/package/lodash.snakecase)', '[kebab](https://www.npmjs.com/package/lodash.kebabcase),' and '[camel](https://www.npmjs.com/package/lodash.camelcase)' casing.

Still looking for a merge on this one too.

### [eslint-plugin-immutable](https://github.com/jhusain/eslint-plugin-immutable)

I spent a bunch of time exploring true [Functional Design](https://en.wikipedia.org/wiki/Functional_design) with the help of this plugin and [`eslint-plugin-no-loops`](https://github.com/buildo/eslint-plugin-no-loops). No changing values, just creating new values based on them. [Lodash](https://lodash.com/) [`.chain()`](https://lodash.com/docs#chain) and [`fp`](https://github.com/lodash/lodash/wiki/FP-Guide) FTW!

But I ran into a couple problems. First, if you're using [CommonJS](https://webpack.github.io/docs/commonjs.html), you need to modify `module.exports` at least once per file. That's a whole lot of `// eslint-disable-line`. Second, [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) [pushes you](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md) to use [Stateless Components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d) if your component is really simple. But then its [`prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md) rule will fire unless you add a `propTypes` key. And that's mutation of an object, once more.

So I [submitted a pull request for the `no-mutation` rule](https://github.com/jhusain/eslint-plugin-immutable/pull/15). It allows you to specify exceptions to the rule, appropriate for your project. Sadly, there's been no movement on that pull request either. I really think they should merge it! It includes comprehensive test coverage for the whole project!

### [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

This is such a useful plugin. I've started using named import statements (`import { name } from 'thing';`) because this plugin can verify that there's a corresponding export on the other side (`export name;`).

I was getting false positives for the [`prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md) rule, so I [submitted a pull request to fix it](https://github.com/benmosher/eslint-plugin-import/pull/343). Updates to my code caused a regression, so I [submitted another pull request](https://github.com/benmosher/eslint-plugin-import/pull/359). It was a pleasure to work on an actively maintained project!

### [eslint-find-rules](https://github.com/sarbbottam/eslint-find-rules)

While preparing my packages for public release, I discovered that `eslint-find-rules` didn't properly handle [scoped plugins](https://docs.npmjs.com/misc/scope)! Yes, it is a relatively new feature ([a little over a year old](http://blog.npmjs.org/post/116936804365/solving-npms-hard-problem-naming-packages)) but if ESLint supports scoped packages, so should associated tools!

Yet again, [time for a pull request](https://github.com/sarbbottam/eslint-find-rules/pull/104). This was another active project, and I got quite a few comments and merge less than day after my submission. Much appreciated!

## Announcing: My Plugin!

You knew I was leading up to this. After all those pull requests, I decided to put my own plugin out there: [`@scottnonnenberg/eslint-plugin-thehelp`](https://github.com/scottnonnenberg/eslint-plugin-thehelp). It has just three rules:

### 1. [thehelp/absolute-or-current-dir](https://github.com/scottnonnenberg/eslint-plugin-thehelp/blob/master/doc/absolute_or_current_dir.md)

I've come to hate `require()` or `import` statements with relative paths navigating up the directory hierarchy. The dreaded `../`. How many times have you seen this: `require('../../../../src/util/fn')`?

Not only is it error-prone when first writing it (it rarely works the first time), that path format makes it far harder to move files around in a project. Given the need for repeated `npm test` and fix cycles, it creates an incentive to keep the directory structure how it is. [Good architecture enables change](http://www.meetup.com/seattle-software-craftsmanship/events/159240012/).

This rule mandates just two ways of pulling in dependencies - via absolute path or a local path to the same directory only. Absolute paths allow for easy search and replace. Allowing local paths is convenient while also localizing the potential impact of a change:

```javascript
// these are valid
var app = require('lib/app');
import app from 'lib/app';

var peer = require('./sibling');
import peer from './sibling';

// these are invalid
var app = require('./child/grand');
import app from './child/grand';

var app = require('../aunt');
import app from '../aunt';
```

If you aren't using absolute paths today, this might seem impossible. But it can be done! First, let's talk about the browser. [Webpack makes it very easy to set up additional search paths](http://webpack.github.io/docs/resolving.html). In your `webpack.config.js`:

```javascript
{
  resolve: {
    // enable absolute path references at the root of the project
    root: __dirname,
  },
}
```

On the server side, it's a little more involved. Before doing any dependency loads from absolute paths, you'll need to change the dependency lookup path with the [`app-module-path`](https://github.com/patrick-steele-idem/app-module-path-node) node module. Say you created `src/setup_module_path.js` in your project and you wanted to set up a lookup at the root of the project:

```javascript
import path from 'path';
import modulePath from 'app-module-path';

modulePath.addPath(path.join(__dirname, '..'));
```

Now in other files in the project, just pull this in first:

```javascript
import '../src/setup_module_path';
import thing from 'src/modules/thing';
```

You may notice that the first line will throw an error! Fear not, you can [configure a set of exceptions](https://github.com/scottnonnenberg/eslint-plugin-thehelp/blob/master/doc/absolute_or_current_dir.md#configuration).

### 2. [thehelp/no-mutation](https://github.com/scottnonnenberg/eslint-plugin-thehelp/blob/master/doc/no_mutation.md)

Sadly, I don't expect my [`eslint-plugin-immutable`](https://github.com/jhusain/eslint-plugin-immutable) [pull request](https://github.com/jhusain/eslint-plugin-immutable/pull/15) to be approved any time soon. This is where you'll be able to use my changes in the near term. As with [its predecessor](https://github.com/jhusain/eslint-plugin-immutable#no-mutation), this rule is designed to help you write methods which don't modify the data available to them. It makes programs far, far easier to reason about.

```javascript
obj.x = 4; // invalid
module.exports = fn; // invalid
this.name = 'name'; // invalid
```

But some kinds of mutation are required. Like the first issue I describe above, needing to mutate `module.exports` in CommonJS. To enable this without per-instance exceptions, you can use the `exceptions` key:

```javascript
{
  'thehelp/no-mutation': ['error', {
    exceptions: [{
      object: 'module',
      property: 'exports',
    }, {
      property: 'propTypes',
    }]
  }]
}
```

You can also provide a more generic rule by providing just `object` or `property`. That second exception will allow you to set `propTypes` on any object, solving the second issue I describe above.

### 3. [thehelp/no-array-mutation](https://github.com/scottnonnenberg/eslint-plugin-thehelp/blob/master/doc/no_array_mutation.md)

Did you know that a large set of [standard `Array` methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) mutate the underlying array? Do you know which ones? [Another pull request](https://github.com/jhusain/eslint-plugin-immutable/pull/5) is waiting to be added to `eslint-plugin-immutable`, which flags these mutating methods.

```javascript
const subset = arr.slice(1);
arr.sort(compareFn); // mutating!
arr.splice(1, 2); // mutating!
```

Any code of the form `thing.call()` will be inspected, and the name of the method will be matched against this list of methods:

  - `copyWithin`
  - `fill`
  - `push`
  - `pop`
  - `reverse`
  - `shift`
  - `sort`
  - `splice`
  - `unshift`

This rule may very easily cause false positives, however it's likely that whatever method does expose these methods will involve a mutation of that target object.

## Lessons

I enjoyed jumping in and getting my hands dirty, and I even learned a few things!

### It's not hard

ESLint rules are surprisingly simple to write. You can provide a whole lot of value really quickly, and you also have the power to go far beyond that. The [Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) provided to you by ESLint's parser can be confusing, but you'll learn over time.

The excellent [AST Explorer](https://astexplorer.net/) web application will speed that along nicely - give it some code and it will show you the associated AST nodes, with two-way subselection. Hover over or click something on either side and learn! :0)

### Test early, often and comprehensively!

You might initially shy away from trying to test your ESLint rules. But the bootstrap work is already done for you! ESLint's [`RuleTester`](http://eslint.org/docs/developer-guide/working-with-plugins#testing) makes it very easy:

```javascript
var RuleTester = require('eslint').RuleTester;
var rule = require('src/rules/absolute_or_current_dir');

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('absolute-or-current-dir with require() calls', rule, {
  valid: [
    'require("fs");',
    'require("./current");',
    'require("root/child/grand");',
    'fn("../peer");',
    'fn("./child/grand");',
  ],
  invalid: [{
    code: 'require("../peer");',
    errors: [{
      message: 'Found .. in require() dependency path: "../peer"',
    }],
  }],
});
```

_Note: I had some trouble with [Mocha's `--watch` when using the `RuleTester`](https://github.com/mochajs/mocha/issues/2088)._

### It can be a bit tricky

Sometimes the AST is structured in a completely unexpected way for certain code constructs. This can be especially frustrating when your rule fires in seemingly random places because you didn't think to test those things. What, you expected all of the various `export` statements to look similar in the AST??

The lesson is to test way more than you expect. This is another one of those situations where code coverage metrics mean just about nothing. Go beyond what you think is natural! Then go beyond that! Then test it on real projects - especially projects you didn't write yourself.

Then, finally, you can relax a bit. Until the first bug comes in.

## Whatcha got?

Maybe you have some ESLint rules lurking in that head of yours? Maybe you've seen a common mistake made in a project you're working on? Maybe you don't like the way an existing rule works?

Fork, modify, extend! Use [my plugin](https://github.com/scottnonnenberg/eslint-plugin-thehelp)! Use it for the rules themselves, or as a template for building your own rules! :0)

Don't miss the last installment in my series: [ESLint Part 3: Analysis](/eslint-part-3-analysis/), about the reasons for style tools, and my new configuration comparison tool!


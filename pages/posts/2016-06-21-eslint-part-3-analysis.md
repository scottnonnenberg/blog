---
rank: 22
title: "ESLint Part 3: Analysis"
date: 2016-06-21T16:35:10.133Z
layout: post
path: /eslint-part-3-analysis/
next: /carrots-not-sticks/
previous: /eslint-part-2-contribution/
tags:
  - eslint
  - open-source
  - javascript
  - nodejs
  - software
---

![ESLint Logo](https://static.sinap.ps/blog/2016/06_jun/eslint/eslint-logo-rev3.png)

I've already spoken about my initial [ESLint](http://eslint.org/) [explorations (Part 1)](/eslint-part-1-exploration/) and [contributions (Part 2)](/eslint-part-2-contribution/). For Part 3, let's get a little deeper. Why use ESLint in the first place? Why is it so hard for a group of people to agree on one style guide? Can we at least make it easier to compare configurations?

<div class='fold'></div>

## Trying to adapt

When I was on my [Walmart Labs contract in 2014](https://scottnonnenberg.com/work/#walmart-labs-2014-q-1-to-q-2), I was working with the people behind [Hapi](http://hapijs.com/) and its [collection of associated modules](https://github.com/hapijs). They had their own approach to formatting Javascript. In some cases it matched up with what I had seen before in the wild, and in others their approach was totally unique. A few examples:

* [Four spaces of indentation](http://hapijs.com/styleguide#whitespace)
* [Result of a `require()` or `import` must always be uppercase](http://hapijs.com/styleguide#require)
* [Space between `function` and `()`](http://hapijs.com/styleguide#spaces)
* [A blank line after every `function()` declaration](http://hapijs.com/styleguide#newlines)

They knew they had a strange style, so they put some good time into assembling a [comprehensive style guide](http://hapijs.com/styleguide). I took a look, was quickly overwhelmed, then went back to the code. The existing code would be a good enough guide, right? And it was simple enough to tell my editor to switch to four space indentation.

But I struggled with the new format. If asked to say what the rules were I could tell you, but muscle memory took over when I wrote code. I kept leaving out that empty first line of every function. And I had to resist my instinct that uppercase variables were always a class that I would use with `new`. I knew I was having difficulty, so I checked before commit with [GitX](https://rowanj.github.io/gitx/), then re-checked the whole pull request diff with [Github Enterprise](https://enterprise.github.com/) before submit.

When I did submit my pull requests, even after all that, I got a lot of feedback about style. Lots of missing empty lines, missing spaces between `function` and `()`. I got better over time, but just about all of my pull requests had some sort of style feedback. I addressed the feedback quickly, but it slowed down my approvals.

I believe that the style distraction reduced the amount of review time spent on the actual problem domain, the features I had implemented.

What's wrong with this picture?

## The importance of tools

I strongly believe that something as simple as code formatting should never be discussed in a pull request. That's not the time for it! The official project style should be discussed and ratified at the beginning of the project, then tools put in place to enforce it. Then the team has more time to focus on their business impact!

That's why I like ESLint. I was planning to release an open-source project recently, and I dug up my old release checklist from when I [released eight projects in 2014](/the-state-of-thehelp/). It had some file/project/variable naming guidance on it, and I realized that I could simplify if I found a plugin to check it for me. That's how I discovered  [`eslint-plugin-filenames`](https://github.com/selaux/eslint-plugin-filenames). I installed the right '[snake case](https://en.wikipedia.org/wiki/Snake_case)' regular expression, and I had one less manual check!

The sky's the limit for additional checks! There are lots of plugins out there, or you could write your own. The point is that these kinds of things can make a team substantially more efficient. [Instant feedback in the editor](https://github.com/roadhump/SublimeLinter-eslint) instead of diff comments.

## Preferences and controversy

Even with the tools, the challenge is getting to that initial agreement. I have to say, I was surprised when that [Silicon Valley clip about Tabs vs. Spaces](https://twitter.com/ThePracticalDev/status/737185546020126720) made the rounds recently. Truly, I thought the issue already had been decided in favor of spaces. [This survey](https://twitter.com/ThePracticalDev/status/737298133055643648) drove home that it really isn't.

How was I so mistaken? Maybe it's because I'm pretty deep in the Javascript community? Or I'd been burned too many times with horrible creative tab width rendering and lack of configurability?

I was similarly surprised when I recently discovered some big differences between me and my friends. For example, should braces be formatted like this:

```javascript
if (something) {
  doSomething();
}
else {
  doElse();
}
```

Or like this?

```javascript
if (something) {
  doSomething();
} else {
  doElse();
}
```

Based on my conversations it was about evenly split, perhaps leaning a little more towards the second brace style. You can tell how divisive this is just by looking at the [names for these styles in the ESLint documentation](http://eslint.org/docs/rules/brace-style): the first is called _Stroustrup_ and the second is called the _one true brace style_. I sense some bias. At least there's an option. :0)

You can see other, more Javascript-specific arguments happening all the time. Should your code [include semicolons](https://github.com/twbs/bootstrap/issues/3057#issuecomment-5135512)? Indent two or [four spaces](https://github.com/hapijs/hapi/blob/9e5c889594f95ef470b2eb4d7d3e5c95fd2c96f5/lib/auth.js#L15-L17)? [Multiple var statements or just one](http://benalman.com/news/2012/05/multiple-var-statements-javascript/)?

How can there be so much disagreement in one language? I can see how there might be big differences between different languages, but within the same community? And I know there's absolutely no objectivity with these kinds of things. Neither of those those brace formats is objectively easier to read.

But it might be easier to read for an individual.

## Your fingerprint

I've come to believe that it all has to do with an individual's unique history. You came from somewhere before Javascript, and then when you started with Javascript, you read code written by people who had come from somewhere. You are colored by all of these experiences. Your code quality intuitions and ability to absorb the meaning behind code quickly has been trained by all the code you've seen in the past.

I acknowledge that my preference for `function()` over `function ()` probably comes from my history of language use. From the beginning:

1. Pascal
2. A little bit of Javascript
3. VBScript
4. C++
5. Java
6. A little bit of Javascript
7. C# and a bit of Visual Basic .NET
8. Ruby and a little bit of Javascript
9. Objective C
10. CoffeeScript
11. Lots of Javascript

That's my fingerprint. Everything I see is filtered through all of my previous experiences. You can see why I feel right at home with curly braces. I often appeal to objective readability when discussing my dislike of [Ruby's paren-less function calls](http://stackoverflow.com/questions/340624/do-you-leave-parentheses-in-or-out-in-ruby), but it has more to do with my history.

What's your fingerprint? What if we could quantify it?

## Announcing: My comparison tool!

Imagine that you're about to start a project. Or you're about to join a new company or contract. You were using ESLint before, with all your own preferences, and the people you'll soon be working with have their own configuration. You both pull in different plugins, and started from a different comprehensive configuration like [AirBnB](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) or ["Standard"](https://github.com/feross/eslint-config-standard).

Maybe the resultant behavior is similar, or maybe not! It's very hard to tell! How do you start to talk about the differences?

Introducing [`@scottnonnenberg/eslint-compare-config`](https://github.com/scottnonnenberg/eslint-compare-config)! It's a simple node module with a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) and an API. You can install it and see the differences between two projects' ESLint configurations:

```bash
npm install -g @scottnonnenberg/eslint-compare-config
eslint-compare-config yourProjectDir/ theirProjectDir/
```

This is not a simple load and diff of each project's `.eslintrc.js`. It takes into account all of ESLint's sophisticated configuration behaviors:

1. _Lookup scheme for loading plugins_ - given a plugin name, ESLint attempts to load the `eslint-plugin-NAME` node module, which means that Node.js dependency lookup rules come into play.
2. _Extending one configuration from another_ - a final configuration can be built from many recursive loads and merges. Take look at all the merging ESLint has to do to load a [Walmart ESLint config](https://github.com/walmartlabs/eslint-config-defaults/blob/master/configurations/eslint.js)!
3. _Hierarchical merging_ - To figure out the ESLint configuration for a given file, ESLint will look up the directory hierarchy for parent configuration files, then merge it all together.

Why rewrite all that? I just tell ESLint to load the configuration for me! I put [a configuration-loading Node.js script](https://github.com/scottnonnenberg/eslint-compare-config/blob/9c93a29884176d0aebb53945e33e70e207cca19d/src/_get_config.js) in the target directory, run it, then delete it afterwards:

```javascript
try {
  var result = childProcess.execFileSync('node', [target], options).toString();
  return JSON.parse(result);
}
finally {
  fs.unlinkSync(target);
}
```

Here's what it looks like in a minimal scenario. I've added code to my [`blog-code` project](https://github.com/scottnonnenberg/blog-code) for this post, in the `eslint-comparison/` directory:

```bash
git clone git@github.com:scottnonnenberg/blog-code.git
cd blog-code/eslint-comparison/thehelp
npm install
eslint-compare-config . one-rule/
```

And that produces:

```text
Plugins shared: 8
  filenames
  import
  security
  @scottnonnenberg/thehelp
  immutable
  no-loops
  jsx-a11y
  react

Plugins missing from left: None

Plugins missing from right: None

Extends shared: 3
  @scottnonnenberg/thehelp
  @scottnonnenberg/thehelp/react
  @scottnonnenberg/thehelp/functional

Extends missing from left: None

Extends missing from right: None

Rules matching: 278
  [full list omitted for brevity]

Rules missing from left: None

Rules missing from right: None

Rule configuration differences: 1
  max-nested-callbacks:
    left: [ 'error', { max: 3 } ]
    right: [ 'error', { max: 4 } ]

Differences in other configuration: None
```

## A little bit of fun

I just released [my own configuration](https://github.com/scottnonnenberg/eslint-config-thehelp). How does it compare with some of the big players? I just happen to have included a similarity score in my tool to boil all the differences down into one number. It [takes rule settings into account](https://github.com/scottnonnenberg/eslint-compare-config/blob/57c2db25f3c01970466cfeb826d305fbb3e0c812/src/get_score.js), nothing else.

I pulled down a number of the most well-known configurations, then used my tool to generate the matrix of similarity scores:

<table>
  <tr>
    <td></td>
    <td><a class="plain" href="https://github.com/feross/eslint-config-standard">"Standard"</a></td>
    <td><a class="plain" href="https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb">AirBnB</a></td>
    <td><a class="plain" href="https://github.com/google/eslint-config-google">Google</a></td>
    <td><a class="plain" href="https://github.com/walmartlabs/eslint-config-defaults">defaults</a></td>
    <td><a class="plain" href="https://github.com/walmartlabs/eslint-config-defaults/blob/a464fed3c0d13e10b3c1f2f8a49298966658b325/configurations/walmart/es6-react.js">Walmart</a></td>
    <td><a class="plain" href="https://github.com/indentline/eslint-config-indent">indent</a></td>
  </tr>
  <tr>
    <td><a class="plain" href="https://github.com/scottnonnenberg/eslint-config-thehelp">thehelp</a></td>
    <td>28%</td>
    <td>42%</td>
    <td>38%</td>
    <td>10%</td>
    <td>38%</td>
    <td>72%</td>
  </tr>
  <tr>
    <td>indent</td>
    <td>29%</td>
    <td>41%</td>
    <td>43%</td>
    <td>10%</td>
    <td>38%</td>
    <td>&crarr;</td>
  </tr>
  <tr>
    <td>Walmart</td>
    <td>39%</td>
    <td>39%</td>
    <td>39%</td>
    <td>21%</td>
    <td>&crarr;</td>
    <td></td>
  </tr>
  <tr>
    <td>defaults</td>
    <td>22%</td>
    <td>14%</td>
    <td>17%</td>
    <td>&crarr;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Google</td>
    <td>52%</td>
    <td>40%</td>
    <td>&crarr;</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AirBnB</td>
    <td>39%</td>
    <td>&crarr;</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>


A few notes:

* Where possible, I chose the ES6/React configuration available with the system. _"Standard"_, _Defaults_, _Google_ did not have the option.
* _Default_ and _Walmart_ both pursue minimalism in their ruleset: turning rules on with default configuration, and leaving quite a few rules off. This results in lower, more consistent scores.
* You can see the details behind these numbers by omitting the `--score` option. Go grab [the project with everything set up for this](https://github.com/scottnonnenberg/blog-code/tree/master/eslint-comparison)!

It's no surprise that `thehelp` and `indent` are similar - my friend [Jamie Hoover](https://github.com/uipoet) is behind `indent`, and we've had some good conversations going over our rules in detail. Facilitated by my comparison tool, of course! :0)

## Use the tools!

Use [`@scottnonnenberg/eslint-compare-config`](https://github.com/scottnonnenberg/eslint-compare-config) to compare configurations, quantify differences, even stimulate conversation! You can also use its [`getConfigSync()` API method](https://github.com/scottnonnenberg/eslint-compare-config#api) or [ESLint config load script](https://github.com/scottnonnenberg/eslint-compare-config/blob/bf8d6ec0f52b368573dc278b5bdb0cf5331d51d0/src/_get_config.js) directly to figure out exactly what all of your `extends` finally resolve to.

Just remember to put coding style rules in place when starting a new project, and use the tools at your disposal to automate it all. Then move on and be done with it! You'll be able to better focus on the customer!


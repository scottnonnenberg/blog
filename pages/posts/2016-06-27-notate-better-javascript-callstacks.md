---
rank: 40
title: "Notate: Better Javascript callstacks"
date: 2016-06-28T18:40:17.484Z
layout: post
path: /notate-better-javascript-callstacks/
next: /this-blog-is-now-open-source/
previous: /carrots-not-sticks/
tags:
  - open-source
  - javascript
  - nodejs
  - software
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/bMHB6zb9AXY?start=1497" frameborder="0" allowfullscreen></iframe>

_[Originally covered in Part 4 of [my talk at the Seattle Node.js meetup on 7/24/2015](http://www.meetup.com/Seattle-Node-js/events/222999198/). [Direct link to original screencast](https://youtu.be/bMHB6zb9AXY?t=15m4s). [My original Dangerous Cliffs of Node.js post](/the-dangerous-cliffs-of-node-js/).]_

You might not have noticed it yet, but the [async event loop in Javascript](/node-js-is-not-magical/#3-evented-async) truncates the `stack` provided with your `Error` objects. And that makes it harder to debug both in the browser and in [Node.js](https://nodejs.org/). [My new library](https://github.com/scottnonnenberg/notate) helps you work around this.

<div class='fold'></div>

## The problem

Say you're making a number of asynchronous calls all in parallel. Something like this ([full code available in my `blog-code` GitHub repo](https://github.com/scottnonnenberg/blog-code/tree/master/notate)):

```javascript
function fiveSteps(cb) {
  async.series([
    step1,
    step2,
    step3,
    step4,
    step5,
  ], function afterFiveSteps(err) {
    if (err) {
      return cb(err);
    }

    // do domain-specific stuff

    return cb();
  });
};
```

In each of those steps you call a low-level API, going to a database or to a server. What if an error happens in one of those steps? What information would we have to try to debug the problem?

Here's some code to simulate that - it uses probability to throw errors only sometimes:

```javascript
function callRemoteService(url, cb) {
  setTimeout(function() {
    if (_.random(0, 10) < 3) {
      return cb(new Error('Incorrect arguments supplied'));
    }

    return cb();
  });
};
```

Running this, we get a truncated callstack:

```text
Error: Incorrect arguments supplied
    at Timeout._onTimeout (/path/to/project/notate/1_five_steps.js:12:17)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
```

You might expect a number of calls starting from the invocation of the app, leading to the initial `setTimeout()` call. But those aren't present. All we see are the entries coming from the low level system kicking off the timer event in `timers.js`, then the line which had the `new Error()`. This also happens when going to the filesystem or to the web - try it out by replacing `setTimeout()` with an [`fs.readFile()`](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfile_file_options_callback).

With this minimal information, we know the specific line the error came from. But we don't know how we got there! We can't tell which of those five steps failed!

## Announcing: Notate

I've just released [`@scottnonnenberg/notate`](https://github.com/scottnonnenberg/notate), a library to solve this problem. In the above video I use its old incarnation, the [`Breadcrumbs`](https://github.com/thehelp/core/blob/master/src/both/thehelp-core/breadcrumbs.js) component of my [now-deprecated](/the-state-of-thehelp/) library [`thehelp-core`](https://github.com/thehelp/core/). I've learned some lessons since then. :0)

To start:

```bash
npm install --save-dev @scottnonnenberg/notate
```

## Feature: Stack augmentation

The first thing `@scottnonnenberg/notate` will do for you is augment your callstacks with enough information to debug tricky async situations. Let's add it to the `stepN()` functions listed above:

```javascript
var notate = require('@scottnonnenberg/notate');

function step2(cb) {
  callRemoteService(url, function afterStep2(err, result) {
    if (notate(cb, err)) {
      return;
    }

    return cb(null, result);
  });
}
```

Instead of the standard `if (err) { return cb(err); }` we use the default `notate()` function. It takes care of calling `cb` with the provided `err` if the `err` is truthy. Now we can be sure that our code won't crash the first time an error happens, no mis-typed or missing `cb()` call!

When an error happens, the `err.stack` gets an additional item for the `notate()` call:

```text
Error: Incorrect arguments supplied
    at **notate: afterStep2 (/path/to/project/notate/2_five_steps_with_notate.js:32:9)
    at Timeout._onTimeout (/path/to/project/notate/2_five_steps_with_notate.js:13:17)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
```

Now we can tell which step failed! But wait - there's more!

## Feature: Error metadata and pretty printing

Imagine what you might have done in the past to help debug this kind of error. I know what I did: I added more logging. The details of the arguments going into the API method, for example. When an error happened, I would dig through the rest of the log to figure out what might have caused the error.

I've come to believe that logging frequently ends up being counterproductive. You end up logging in too many places, repeating at every level: the server, the business logic, utility methods, the data access layer, and so on. With all that noise it gets harder and harder to find what you're looking for.

I have a solution for you. Instead of manually logging additional debugging data, add it to the error. Wherever you end up logging the error, you'll have the data you need.

To add data to an error, use the third parameter to `notate()`:

```javascript
var notate = require('@scottnonnenberg/notate');

function step2(url, cb) {
  callRemoteService(url, function afterStep2(err, result) {
    if (notate(cb, err, { url: url })) {
      return;
    }

    return cb(null, result);
  });
}
```

That `url` key will be merged into the error. Now that we have the data, we can log it out at the top level. This might be your [Express error handler](http://expressjs.com/en/guide/error-handling.html), or the top-level call in a CLI program:

```javascript
fiveSteps(function(err) {
  console.log(notate.prettyPrint(err));
});
```

Now you get more information with your error:

```text
{ [Error: Incorrect arguments supplied] url: 'https://someplace.com' }
    at **notate: afterStep2 (/3_five_steps_with_metadata.js:32:9)
    at Timeout._onTimeout (/3_five_steps_with_metadata.js:13:17)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
```

_Note: [`prettyPrint()`](https://github.com/scottnonnenberg/notate#api) will also limit the callstack to 10 entries by default, and remove the current working directory from the file paths._

## A word on browsers

This works nicely and predictably in Node.js. But what if you [`browserify`](http://browserify.org/) it or create a [Webpack](https://webpack.github.io/) build?

First I should warn that you will run into difficulty with minified code. The reported line numbers and function names won't mean much. However, the data you add to the error will still be present on the outputs of `prettyPrint()`, so I think it's worthwhile.

In development mode, you'll get an experience similar to the Node.js experience. The challenge is that modern module loaders put everything in one file. Naming your functions will really help here.

Notes on specific browser support:

* iOS down to version 7.0 passes all tests. Safari 6 and above pass all tests. Firefox and Chrome pass tests - nobody is using really old versions of these, right? :0) Check out [what all of the various callstacks look like](https://github.com/scottnonnenberg/notate/blob/master/examples.md).
* Internet Explorer 10 and 11 both work, but you'll need to keep in mind that [`new Error()` doesn't give you a callstack](https://msdn.microsoft.com/en-us/library/hh699850(v=vs.94).aspx). You need to `throw` the error after that to get the `stack` property you expect.
* IE9 and Safari 5 lack callstacks entirely, as do browsers older than that.
* IE9 and below require [`es3ify`](https://github.com/spicyj/es3ify) to ensure that un-quoted keywords like `default` don't prevent the javascript from running at all! Beyond that, my library uses [Babel's 'loose' mode](http://www.2ality.com/2015/12/babel6-loose-mode.html) to eliminate the use of `Object.defineProperty()` (broken in IE8 and below).

Lastly, I will say that [Sauce Labs](https://saucelabs.com/) was useful tool in verifying functionality across a wide variety of configurations. In particular, their [built-in support for Javascript unit tests](https://wiki.saucelabs.com/display/DOCS/JavaScript+Unit+Testing+Methods) made it easier, and the project has a [quick little script to schedule unit test jobs](https://github.com/scottnonnenberg/notate/blob/master/scripts/sauce_tests.js).

## Stability

Now, you may have started worrying:

> _"What? Some random third-party code in my error codepaths? What if it crashes?"_

It's a fair point. That's why I spent so much time investigating browser support, and used `try`/`catch` liberally in all three entrypoints. If something goes wrong, these are the worst case situations:

* `notate(cb, err, data, level)` - it will throw if `cb` is not a function, but that's a programming error which should be caught the first time the code is run. Beyond that, your provided `cb()` might be called with an `err` without modifications, or with incorrect modifications.
* `justNotate(err, data, level)` - it might not modify the error, or modify the error incorrectly.
* `prettyPrint(err, options)` - If not provided something other than an `Error`, it will simply return the result of `util.inspect()`. In the absolute worse case, it will return an empty string.

## Use it!

Install it and try it out! Annotate errors and print all required information easily! Stop scattershot logging at every level, just log the error once!

And feel free to [let me know](https://github.com/scottnonnenberg/notate/issues) if you have any suggestions or feedback. :0)

---

_A little bit extra:_

* Using promises? Bluebird's `longStackTraces` feature gives you the full async stack trace you would expect: http://bluebirdjs.com/docs/api/promise.config.html
* `console.trace()` gives you a quick message and stack in Node.js and most browsers: https://nodejs.org/api/console.html#console_console_trace_message
* Capturing and reporting client-side errors:
  * https://errorception.com/
  * http://www.muscula.com/
* It's hard to get detailed errors from javascript loaded from another domain, even a sibling subdomain! http://blog.getsentry.com/2016/05/17/what-is-script-error.html
* Related:
  * A library to get stack traces even on downlevel browers: https://www.stacktracejs.com/#!/docs/stack-generator
  * Deep analysis of v8 stack traces: https://github.com/watson/stackman


---
rank: 11
title: The trouble with promises
date: 2016-01-12T18:07:21.000Z
layout: post
path: /the-trouble-with-promises/
next: /the-why-of-agile/
previous: /four-books-for-greater-understanding/
tags:
  - javascript
  - software
---

[Javascript Promises](https://www.promisejs.org/). In my mind I have an uneasy truce with them. The war ended primarily because I've been forced to use promises on contracts. Since then, [standards bodies seem to have agreed to make them the one true asynchronous programming method](https://www.w3.org/2001/tag/doc/promises-guide). And if you're writing code between layers [which provide](http://knexjs.org/) and [expect promises](https://github.com/graphql/graphql-js/blob/fee4fe322f982c9f1b8d5c2e2eb9137d1fcba74a/src/execution/execute.js#L277), I suppose it's time to [do as the Romans](https://en.wiktionary.org/wiki/when_in_Rome,_do_as_the_Romans_do).

I'm still uneasy. Why, you ask?

<div class='fold'></div>

## An Exercise

First, an exercise based on [this recent tweet](https://twitter.com/ryanflorence/status/685535261883682817) showing [code using the new promise-based](https://gist.github.com/ryanflorence/927ef8266fdd5525bf8e) [standard fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```javascript
function fetchJSON(options, cb) {
  fetch(options)
    .then(res => res.json())
    .then(json => cb(null, json), err => cb(err));
}
```

In your mind, tell me about this code. What is it trying to do? Is it correct? In all scenarios? Go ahead, take some time.

![waiting...](https://static.sinap.ps/blog/2016/01_jan/promises/waiting.gif)

It is sound code, but only for the success case. If no exceptions are thrown by the success-case `cb()` call tree before it next defers to the event loop, everything will be fine.

However, if, deep into the synchronous call tree started by that success-case `cb()`, an exception is thrown, it will not hit any registered [top-level window](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror) or [node.js error handlers](https://nodejs.org/api/process.html#process_event_uncaughtexception). It will be captured by the try/catch statement inside the implementation of `then().` And because nothing is handling errors past that second `then()` statement, the promise library will emit something like [Bluebird's 'possibly unhandled exception'](http://bluebirdjs.com/docs/api/promise.onpossiblyunhandledrejection.html) to the console.

What's the right solution? This code will fully break out of promises, putting all of your code back into a callback-only context. It defers to the event loop with `setTimeout`, escaping all lingering Promise-provided try/catch blocks:

```javascript
function fetchJSON(options, cb) {
  fetch(options)
    .then(res => res.json())
    .then(function(json) {
      setTimeout(() => cb(null, json), 0)
    })
    .catch(function(err) {
      setTimeout(() => cb(err), 0);
    });
}
```

Ugly? Yes. Don't write this code if you don't have to. If you're using [Bluebird](https://github.com/petkaantonov/bluebird) (which I would recommend), use [its built-in to-](http://bluebirdjs.com/docs/api/ascallback.html) and [from-callback conversions](http://bluebirdjs.com/docs/working-with-callbacks.html#automatic-vs.-manual-conversion). Sadly, the [new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) [standard Promise](http://www.html5rocks.com/en/tutorials/es6/promises/) implementations don't include these helper methods, which will make these kinds of mistakes more common. Which brings me to...

## The Problem

Promises are billed as a simplification of asynchronous programming. Callbacks are painful, promises are the solution. But really promises layer complexity on top of a relatively simple initial system.

There's no way around it. You need to understand the [event loop and callback style](/node-js-is-not-magical/#3-evented-async) if you're using javascript. Just about all APIs are still written this way - all low-level Node.js APIs, for example. And you need to know how to do it right. If you don't use callbacks properly, your web app or [node.js application could crash immediately on a programming error](/the-dangerous-cliffs-of-node-js/#crashes). You'll always have `err` passed as the first parameter to these callbacks, so you'll be watching for that kind of method signature.

Now we add promises to our application. Maybe long chains of promises are marginally easier to reason about than deep [`async.waterfall()`](https://github.com/caolan/async#waterfall) or [`async.series()`](https://github.com/caolan/async#seriestasks-callback) constructs. But now we have more complexity and new failure modes. As we saw above, though it looked like the code was error-handling properly, [errors can be swallowed completely](http://jamesknelson.com/are-es6-promises-swallowing-your-errors/) and your reporting systems won't hear about it. Errors are propagated differently with promises, and you'll need to add these new behaviors as a new mode in your mind.

## The Tradeoff

I prefer to think of promises as a powerful but complex tool for composability. Callback style requires the client callback to be available when the async operation finishes. Now imagine the code you'd have to write to allow time-shifting of that asynchronous result. That's promises. It's a more complex system bolted on top of callbacks, so a result can be passed around and used by multiple clients whenever they are ready for it.

When architecting systems, we must ask ourselves: is the additional complexity worth it? I think things like [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) are pretty cool. Passing promises around can allow for more declarative versus imperative design, and that makes for cleaner, more predictable architecture.

## Some Tips for Promises

Say you've decided to go with promises in your app. Here are a few tips to make that experience a bit nicer:

* **Be clear with documentation** - jsdoc generation will push you towards documenting only parameters and return value. Yes, the return value is a 'Promise' but what exactly can it resolve to? Consider specifying whether a function is async/sync in the name - with callbacks, `cb` in the argument list made it clear.
* **Be consistent with `.spread()`** - Determine a standard approach for your project and stick with it. Either multiple parameters with `spread()` or manually handling of resolved values. Consider using 'named parameters' via objects, avoiding `spread()` entirely.
* **`reject()` real `Error` objects only** - Just like callback-style, rejections should always be real error objects.
* **Pay close attention to your `return` statements** - Where with callbacks you could just `cb()` anywhere, now return statements should be in every function. Methods no longer take callbacks, so they must return promises. Inside a `then()`, you can return plain objects and that becomes the final resolved value for the promise, no need for a `Promise.resolve(x)` wrapper.
* **Always end with `catch()`, only at the top-level** - Say you're calling a Promise-based API from an [Express](http://expressjs.com/) endpoint handler. Your error handling will look like this: `.catch(next)` to call the registered [express error handler](http://expressjs.com/en/guide/error-handling.html). Unless you have a very good reason, there should *only* be one `catch()` call in the entire call tree, at the top. It's very easy to make mistakes here once your error-handling gets any more complex.
* **Keep it simple, no long chains** - Promises are not a panacea. Resist the urge to build mega functions with many chained `.then()` calls. Refactor into small units. Also: take a look at [my post on async composition](/a-modest-async-proposal/).
* **Consider debuggability** - Design your code such that when errors happen, they can be tracked down. If an error propagates through too much promise infrastructure at once, will key information be lost? [Some example code here from my talk last July](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/tree/master/src/demos/4.%20Error%20from%20async%20call).
* **Know your library, use its helpers** - As discussed above, Bluebird has some really nice helpers on top of [the standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Use them. Adding a handler to [possiblyUnhandledException](http://bluebirdjs.com/docs/api/promise.onpossiblyunhandledrejection.html) takes some of the key failure modes off the table, and [longStacktraces](http://bluebirdjs.com/docs/api/promise.config.html) gives you great debugging information.

## Go forth!

Now, go forth and be a productive engineer without any Holy Grail pretense. No library will solve all of your problems. Every new dependency simply means some level of benefit combined with costs to understand and maintain it over time. Better make sure the tradeoff is worth it.

---

Additional reading:

* Can you solve these puzzles? http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
* A nice illustrated deep explanation of how promises work: http://robotlolita.me/2015/11/15/how-do-promises-work.html
* A bit more theoretical exploration: https://medium.com/@isntitvacant/observations-on-promises-2b08a0d0c27#.vk3vv5egm
* `async`/`await` in ES2016 requires you to understand promises. Also, another example of code not properly converting back to pure callbacks... https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.yh55d1790
* Bluebird source:
    * You can see how Bluebird decides how it ensures async operations in its various environments here: https://github.com/petkaantonov/bluebird/blob/7a39370ba1b98da0aaef1fa9d85b2fd5daaba4ee/src/schedule.js.
    * You can see how Bluebird implements `asCallback()` here: https://github.com/petkaantonov/bluebird/blob/7a39370ba1b98da0aaef1fa9d85b2fd5daaba4ee/src/nodeify.js. Interesting that it still calls your node-style callback in a try/catch then throws it later.

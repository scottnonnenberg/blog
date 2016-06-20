---
rank: 37
title: A functional distinction
date: 2016-05-10T19:43:36.238Z
layout: post
path: /a-functional-distinction/
next: /from-tech-person-to-people-person/
previous: /the-state-of-thehelp/
tags:
  - refactoring
  - javascript
  - software
---

I had a moment of testing/architecture clarity recently while working on a new [Node.js](https://nodejs.org/) module which works with [PostgreSQL](http://www.postgresql.org/). Previous leanings and intuitions became concrete. Maybe you're wondering how best to structure Node.js code involving callbacks? Or how to test it? I've got some ideas for you!

<div class='fold'></div>

## How to test this?

First, take a look at this code. How you would you [unit test](https://en.wikipedia.org/wiki/Unit_testing) it?

```javascript
Grator.prototype.list = function(cb) {
  const _this = this;

  this._init(function(err) {
    if (breadcrumbs.add(err, cb)) {
      return;
    }

    _this._getMigrations(function(err, scripts) {
      if (breadcrumbs.add(err, cb)) {
        return;
      }

      _this._getMigrationsStatus(scripts, null, function(err, migrations) {
        if (breadcrumbs.add(err, cb)) {
          return;
        }

        const list = _this._mergeFilesAndDB(scripts, migrations);

        return cb(null, list);
      });
    });
  });
};
```

_Note: this code uses [breadcrumbs functionality](https://github.com/thehelp/core/blob/master/src/both/thehelp-core/breadcrumbs.js#L46) from my [thehelp-core](https://github.com/thehelp/core) library to make it easier to debug async errors. It's just a better way to write `if (err) return cb(err)`._

Go ahead, I'll wait...

![cookie monster is waiting](https://static.sinap.ps/blog/2016/04_apr/functional/cookie-monster-waiting.gif)

So what do you think? Maybe bring in [Sinon.js](http://sinonjs.org/) to stub out the three calls on `this` so we could cover the `_mergeFilesAndDB()` call without going to the database? Refactor `list()` to use [Async.js](https://github.com/caolan/async) primitives? Refactor it to reduce the [callback depth](http://eslint.org/docs/rules/max-nested-callbacks)?

My answer? None of the above.

## A heuristic

First, let's talk about a heuristic I've had in the back of my mind for a while now:

> _If your tests must use Sinon.js, it's a [code smell](https://en.wikipedia.org/wiki/Code_smell)._

Put another way: If you can't test certain code any other way than Sinon.js stubs or mocks, you might have some refactoring to do. Or you have an opportunity to be a little bit more creative with your test approach. Interesting logic buried inside a nest of callbacks? You could pull that logic into a separate method.

You can see where I've already done that refactoring in the code above. `_mergeFilesAndDB()` contains non-trivial logic which was previously inline, deep in `list()`. I couldn't unit test it without using Sinon.js. When I pulled it out into its own method I could test it very fast, covering lots of scenarios, with no stubs required.

And, with `list()` newly simplified, I had a new approach available to me.

## The role of unit tests

Unit tests are valuable because they run very quickly and focus like a laser on your core logic. But that strength becomes a weakness with what I like to call 'workflow' logic. In `list()` above, it calls three methods in order, and then sends the results of the last two methods to another method, finally returning the result.

What value would a unit test provide in its coverage of `list()`? It could perhaps could verify that values are properly flowed from one step to the next. But it doesn't validate that the contracts between each of these component match up with each other. A unit test could still pass even if the entire application is broken.

Another approach to validate the kind of code shown in `list()` is a [integration test](https://en.wikipedia.org/wiki/Integration_testing). Because this type of test involves real dependencies like the database and filesystem, it will require more setup and run more slowly. But that tradeoff allows you to validate real user scenarios and real customer value.

So my initial question was a bit of a trick.

I'm not covering `list()` with unit tests at all. Just integration tests.

## A clear distinction

I like to think of my apps as a combination of two very different types of functions.

_Data transformation functions_ are simply described: data of a certain structure in, and data of a different structure out. The are _[deterministic](https://en.wikipedia.org/wiki/Deterministic_system)_, always returning the same result for the same inputs, and _[pure](https://en.wikipedia.org/wiki/Pure_function)_, with no _side effects_ (no modification of data in the application or outside of it). This makes them very easily unit tested. These functions might be analyzing or summarizing data, or generating/modifying the data which will be used to render a user interface.

_Workflow functions_ tie my applications together, flowing data through the app. Like `list()` above they might do some async operations, or they might call a number of _data transformation_ functions in a row, assembling from them the final result. Integration tests ensure that these functions fulfill their promise of a cohesive unit built of a number of subcomponents: the filesystem, a database, an API, or the screen, along with _data transformations_.

Two types of functions, two types of test approaches.

Unit testing for data transformations. Integration testing for workflow.

## Practice

In my ["A modest async proposal"](/a-modest-async-proposal/) post, I described a different way to structure asynchronous workflow code in Node.js. But it can be refactored further.

How might you split [this `getUser` function](https://github.com/scottnonnenberg/blog-code/blob/2b76dc92c817b1b4a69c3bababdef007b1466c03/a-modest-async-proposal/05.%20promise%20refactored.js#L48) into one _workflow function_ and one _data transformation function_?

```javascript
NewReferencesProcess.prototype.getUser = function getUser() {
  var _this = this;

  return this.db.getUser(this._userId)
    .then(function(user) {
      if (!user) {
        return Bluebird.reject(new Error('Could not find user! ' + _this._userId));
      }

      _this._user = user;

      return user;
    });
};
```

You'll note that you can't be _pure_ with this function, since it's changing a value on `this`. We made that sacrifice to simplify data sharing across the asynchronous workflow. It's the exception, rather than the rule, in my code. I've mostly discarded [Object-Oriented design](https://en.wikipedia.org/wiki/Object-oriented_programming) principles in favor of _[functional design](https://en.wikipedia.org/wiki/Functional_design)_:

* Plain data instead of classes. Classes would combine logic and data in one package.
* _Pure functions_ which operate on that data. No side effects, always returning the same result for the same inputs.
* Application state stored in very few places, instead of every instance of a class.

_Functional design_, in my experience, makes everything easier to reason about. It's easier to determine how a given change happened, even if only part of an application is using these principles.

## A clearly separated future?

I know I've found some good benefits with this preference for _functional design_, and this _workflow_ vs. _data transformation_ distinction. How might you separate the two types of functions in your code? Would it make things easier? Harder? Are there tricky parts which aren't easily split up?

I'd love to hear about your experiences with these techniques!

---

Bringing _functional design_ to Javascript:

* Immutable data types to ensure that objects really cannot be modified: https://facebook.github.io/immutable-js/
* A lesser-known immutable data type library, but this one doesn't require you to access your objects any differently: https://github.com/rtfeldman/seamless-immutable
* Side-effect-free [lodash](https://lodash.com/)-style helper functions: http://ramdajs.com
* An eslint plugin to drastically limit your data mutation without libraries: https://github.com/jhusain/eslint-plugin-immutable
* Redux.js reducers are meant to be pure functions: http://redux.js.org/docs/basics/Reducers.html#handling-actions
* React component `render()` methods are meant to be pure functions, if we treat `this.props` and `this.state` as parameters: https://facebook.github.io/react/docs/component-specs.html#render


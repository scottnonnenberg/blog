---
rank: 22
title: A modest async proposal
date: 2016-01-25T19:14:19.547Z
layout: post
path: /a-modest-async-proposal/
next: /n-for-node-js-nerp-stack-part-1/
previous: /open-source-and-feelings-the-challenge/
tags:
  - refactoring
  - javascript
  - software
---

When discussing async in the world of Javascript, you find a lot of zealots. Promises fix [callback hell](http://callbackhell.com/)! Promises are a crutch for those who can't hack it with callbacks! [I try to take a more balanced perspective](/the-trouble-with-promises/): Both of them have their place, and a lot of people are confused about it all.

One key point of confusion really frustrates me. The solution to 'callback hell' is not promises. It's refactoring.

<div class='fold'></div>

## Hell

The [pundits](http://stackabuse.com/avoiding-callback-hell-in-node-js/) [are](https://www.google.com/search?q=callback+hell&oq=callback+hell&aqs=chrome.0.69i59j69i60j69i57j69i60l2.1282j0j1&sourceid=chrome&es_sm=91&ie=UTF-8) [right](https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/). The [callback pyramid of doom](http://tritarget.org/blog/2012/11/28/the-pyramid-of-doom-a-javascript-style-trap/) [is a problem](https://www.terlici.com/2015/10/28/solving-node-callback-hell-asyncjs.html). Take a look at this code ([also available via github](https://github.com/scottnonnenberg/blog-code/tree/master/a-modest-async-proposal)). What is it trying to do? Is it successfully doing it?

```javascript
var saveUserNewPostReferences = function(id, cb) {
  lib.db.getUser(id, function(err, user) {
    if (err) {
      return cb(err);
    }

    if (!user) {
      return cb(new Error('Could not find user! ' + id));
    }

    lib.db.getPosts(user.id, function(err, posts) {
      if (err) {
        return cb(err);
      }

      var check = lib.twitter.checkForNewReferences.bind(lib.twitter);

      async.map(posts, check, function(err, references) {
        if (err) {
          return cb(err);
        }

        references = _.flatten(references);

        async.map(references, lib.db.saveReference.bind(lib.db), function(err) {
          if (err) {
            return cb(err);
          }

          if (references.length) {
            return lib.email.send(user.email, 'You have new mentions!', function(err) {
              if (err) {
                return cb(err);
              }

              return cb(null, true); // true for new references
            });
          }

          return cb();
        });
      });
    });
  });
};
```

Yep, it works. We first pull a user's information, then all of their posts. Then we go look for any references to those posts, save all those new references, and finally send an email to the user if we found any new references. Pretty hard to understand, huh? Look at at those last nine lines!

But this problem is not at all unique to callbacks. You can be in the same hellish state with promises:

```javascript
var saveUserNewPostReferences = function(id) {
  var user, references;

  return lib.db.getUser(id)
    .then(function(result) {
      user = result;

      if (!user) {
        return Bluebird.reject(new Error('Could not find user! ' + id));
      }

      return lib.db.getPosts(user.id);
    })
    .then(function(posts) {
      var checks = _.map(posts, function(post) {
        return lib.twitter.checkForNewReferences(post);
      });

      return Bluebird.all(checks);
    })
    .then(function(result) {
      references = result;

      var saves = _(references)
        .flatten()
        .map(function(reference) {
          return lib.db.saveReference(reference);
        })
        .value();

      return Bluebird.all(saves);
    })
    .then(function() {
      if (references.length) {
        return lib.email.send(user.email, 'You have new mentions!')
          .then(function() {
            return true;
          });
      }
    });
};
```

The same process implemented with promises is not as deeply nested, so perhaps it is a little easier to read. And it's easier to see what information is passed from step to step: it's either returned from each step, or it is stored in one of the two variables declared at the top (`user` and `references`). This is in contrast to the callback style, where inner functions have access to any outer function's variables via closures: a source of confusion and bugs.

But it really doesn't matter what async system technique we use, we still have the same problem. You can't test any of these steps independently or rearrange them without pain. Nor is it easy to figure out what each step is trying to do. Naming can help, but it's just too much happening in one function.

Let's do something about that: let's refactor.

## Creative purgatory

It's good to see that a lot of the articles talking about this problem show solutions in callbacks, promises, and even [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators). There seems to be less zealotry on this topic than there used to be. But these attempts at refactoring are all still a bit weak.

First, let's define our terms. Many discussions of async just talk about 'get' operations. They simply make a number of requests to back-end services. Sure, this is exciting the first time you parallelize a set of calls, but it's not really very interesting. Full asynchronous workflows, on the other hand, with intermediate values, transformations, and potentially even branching, are far more interesting. And reflective of real application needs.

Now let's take a look at some approaches to asynchronous workflows. This technique makes every step its own independent, accessible function with individual names:

```javascript
function step1(id, cb) {
  doSomething(function(err, result) {
    if (err) {
      return cb(err);
    }

    return step2(result.param1, cb);
}
```

But it still tightly couples each step to the next step. Not only does `step1` need to know the exact signature of `step2`, it also needs to have direct access to it.

We can do better, by removing each step's knowledge about the other steps via  [`async.waterfall()`](https://github.com/caolan/async#waterfall):

```javascript
function step1(id, cb) {
  doSomething(function(err, result) {
    if (err) {
      return cb(err);
    }

    return cb(null, result.param1);
}

function step2(param1, cb) {
  doSomethingElse(function(err, result) {
    if (err) {
      return cb(err);
    }

    return cb(null, result);
}

async.waterfall([
  _.partial(step1, userId), // first step gets no params
  step2
], function(err, result) {
   console.log('final result: ', result);
});
```

Better, but each step still needs to know about the next step's required signature, so it is difficult to rearrange items. And if `step4` needs a value from `step1`, that `step3` didn't already need, we'll have to pass extra data along via function parameters.

We can do better.

## A modest proposal

Here's my attempt at a clean async composition system. First, let's take a look at the overall coordination function, what you'd call to kick off the process. You can see each of the individual steps and then the call to [`async.series()`](https://github.com/caolan/async#seriestasks-callback):

```javascript
NewReferencesProcess.prototype.go = function(cb) {
  var steps = [
    this.getUser,
    this.getPosts,
    this.getAllNewReferences,
    this.saveReferences,
    this.emailUserIf
  ];

  async.series(steps, function(err, results) {
    if (err) {
      return cb(err);
    }

    return cb(null, _.last(results));
  });
};
```

Now, what do the individual steps look like?

```javascript
NewReferencesProcess.prototype.getUser = function(cb) {
  var _this = this;

  this.db.getUser(this._userId, function(err, user) {
    if (err) {
      return cb(err);
    }

    if (!user) {
      return cb(new Error('Could not find user! ' + _this._userId));
    }

    _this._user = user;
    return cb(null, user);
  });
};
```

You can see that we're operating in the context of a class. `getUser` is a member function of that class, and when it calls its target async function `this.db.getUser()` you can see that it stores the result of that call at `this._user`. The value at  `this`, an instance of the `NewReferencesProcess` class, is the shared state used to pass values down the workflow and enable dependency injection of target libraries (by replacing `this.db`).

The first two examples use both closures and direct return values to pass values down the workflow. We simplify things here by using `async.series()`, which does not pass the result of one step to the next step. The only way we share information is via `this`.

To run the whole thing, we create an instance, passing it the target `userId`:

```javascript
var refProcess = new NewReferencesProcess({userId: 3});

refProcess.go(function(err, newReferences) {
  if (err) {
    return console.log(err.stack);
  }

  console.log('newReferences:', newReferences);
});
```

## Heaven?

Take a look at [my example code, with working example files](https://github.com/scottnonnenberg/blog-code/tree/master/a-modest-async-proposal). Clone it and play with it. You'll find the complete callback-style version of my async pattern as well as a version implemented with promises. Thanks to [a friend](https://twitter.com/rphillips), you'll also see a version based on [`async.auto`](https://github.com/caolan/async#autotasks-concurrency-callback) which is about as flexible as what I've described above. What do you think?

I like it. Each step is far easier to test and reason about, and you can rearrange the steps as long as each step has the information it needs on `this`. Speaking of `this`, you can print the whole object out at any time and see all the data you need to debug the workflow.

Maybe you'll use this pattern in your applications, or maybe it'll just sow seeds of creativity in your mind. As long as you're refactoring, I'm happy.

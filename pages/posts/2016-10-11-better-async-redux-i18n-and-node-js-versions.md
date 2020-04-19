---
rank: 24
title: Better async Redux, i18n, and Node.js versions
date: 2016-10-11T17:49:25.493Z
layout: post
path: /better-async-redux-i18n-and-node-js-versions/
next: /the-technology-side-of-agile/
previous: /systems-for-collaboration/
tags:
  - stack-improvements
  - reactjs
  - open-source
  - nodejs
  - javascript
  - software
---

It's time for another edition of [recent stack improvements](/tags/stack-improvements/)! This time we're primarily focused on [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/redux). But if you use [Node.js](https://nodejs.org/) at all, my comparison of Node.js version managers should be interesting!

<div class='fold'></div>

## redux-loop

In Redux, _actions_ are passed through _middleware_, then _reducers_, then the new state resulting from those _reducers_ is passed to your React components. [It's a single source of truth](/r-for-react-nerp-stack-part-3/#flux), and a single unidirectional update path through the system. Beautiful. But that entire process is synchronous!

Because there's nothing in the core system addressing asynchronous actions, quite a few libraries have been released to try to address it:

* [`redux-thunk`](https://github.com/gaearon/redux-thunk) gives every _action creator_ direct access to `dispatch()`, and has no concept of when an async task is 'done.' But this is important for ensuring everything is ready for server rendering.
* [`redux-promise-middleware`](https://github.com/pburtchaell/redux-promise-middleware) gives you the power of promises, but chained async behavior gets very painful.
* [`redux-saga`](https://github.com/yelouafi/redux-saga) is designed specifically to handle chained async behavior. But it again has the 'done' problem, and [is probably too complex](https://github.com/yelouafi/redux-saga/blob/5a6db57c77141b85b82aa097933ad687aacff8dc/src/internal/channels-trans-table.png).

So each of the well-known libraries attempting to help have limitations. Is there a better way? Well, [Redux was originally inspired by Elm](http://redux.js.org/docs/introduction/PriorArt.html). How does [Elm](http://elm-lang.org/) do it? Let's take a look at [its 'http' example](http://elm-lang.org/examples/http):

```text
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (model, getRandomGif model.topic)

    FetchSucceed newUrl ->
      (Model model.topic newUrl, Cmd.none)

    FetchFail _ ->
      (model, Cmd.none)
```

First, note that the signature of the `update` function is `Msg -> Model -> (Model, Cmd Msg)`. Like a Redux _reducer_, it mutates the `Model` (_state_) based on an incoming `Msg` (_action_). The difference is that instead of returning a plain `Model` it returns a [tuple](https://dennisreimann.de/articles/elm-data-structures-record-tuple.html) of `Model` and `Cmd Msg`.

In the `MorePlease` case, `getRandomGif model.topic` is the `Cmd Msg`. It's not a function call, but the function and arguments which will be assembled into a function call. [`Cmd` is a generic Elm operation](http://package.elm-lang.org/packages/elm-lang/core/4.0.5/Platform-Cmd) and the `Msg` is its return type. When `getRandomGif` succeeds, it returns a `FetchSucceed` (a variant of `Msg`), which is then sent through the `update` function:

```text
getRandomGif : String -> Cmd Msg
getRandomGif topic =
  let
    url =
      "https://api.giphy.com/v1/gifs/random?api_key=KEY&tag=" ++ topic
  in
    Task.perform FetchFail FetchSucceed (Http.get decodeGifUrl url)
```

Elegant, right?

Enter [`redux-loop`](https://github.com/redux-loop/redux-loop), a Javascript project which describes itself like this:

> _A port of elm-effects and the Elm Architecture to Redux that allows you to sequence your effects naturally and purely by returning them from your reducers._

Let's reimplement the above example in `redux-loop`:

```javascript
import { loop, Effects } from 'redux-loop';
import { fromJS } from 'immutable';

// action creators
const morePlease = () => ({
  type: 'MORE_PLEASE',
});
const fetchSucceed = (url) => ({
  type: 'FETCH_SUCCEED',
  payload: url,
});

const fetchFail = () => ({
  type: 'FETCH_FAIL',
});

const getRandomGif = (topic) =>
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=KEY&tag=${topic}`)
    .then(decodeUrl)
    .then(fetchSucceed)
    .catch(fetchFail);

const initialState = fromJS({
   topic: 'cats',
   url: null,
});

function reducer(state, action) {
  if (!state) {
    return initialState;
  }

  switch(action.type) {
    case 'MORE_PLEASE': {
      return loop(state, Effects.promise(getRandomGif, state.get('topic')))
    }

    case 'FETCH_SUCCEED': {
      return state.set('url', action.payload);
    }

    case 'FETCH_FAILED': {
      return state;
    }

    default: {
      return state;
    }
}
```

The user clicks a button and the `MORE_PLEASE` event is fired, which kicks off the `fetch()`. When that succeeds, the UI is updated because `state.url` has a new image location.

I like it! It allows for composition via chained tasks, expressed very clearly, in a [very easy-to-test way](https://github.com/redux-loop/redux-loop#easily-test-reducer-results). And [the library itself isn't much code](https://github.com/redux-loop/redux-loop/tree/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules)!

### Integrating it into your app

Having used `redux-loop` a good bit, there are some challenges with it:

* The 'initial effect' [returns a Promise that is not flowed back to the initial caller](https://github.com/redux-loop/redux-loop/blob/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules/install.js#L64), so there's no way to know when it is done. Important when server rendering.
* [Since every `Effect` must resolve to a Redux _action_](https://github.com/redux-loop/redux-loop/blob/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules/errors.js#L4), [errors are effectively swallowed](http://jamesknelson.com/are-es6-promises-swallowing-your-errors/). This leads to two problems. [On the server, you might want to return a totally different error page](https://github.com/redux-loop/redux-loop/issues/70#issuecomment-231609166). On the client, you probably want to capture and log the error centrally, not in every _action creator_.
* Say a number of your reducers return an `Effect` from one incoming _action_. [All must resolve before any resultant _action_ is provided to `dispatch()`](https://github.com/redux-loop/redux-loop/blob/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules/install.js#L43-L45). This means that the shortest async operation must wait on the longest operation before any of it hits your `reducers`.

Happily, you can fix all of these by reimplementing [this method](https://github.com/redux-loop/redux-loop/blob/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules/install.js#L24-L72). You don't even need a fork. :0)

On the other hand, if you have any Redux _middleware_ which calls `dispatch()`/`next()` multiple times, like [`redux-api-middleware`](https://github.com/agraboso/redux-api-middleware) or `redux-promise-middleware`, things get a little more complicated.

* First, be aware of ordering. By default, _store enhancers_ and _middleware_ cannot `dispatch()` before their natural order. So, either the [`redux-loop` extra `dispatch()` call for an `Effect`](https://github.com/redux-loop/redux-loop/blob/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules/install.js#L45) will miss your `redux-promise-middleware`, or the [`redux-promise-middleware` extra call to `dispatch()` when a promise resolves](https://github.com/pburtchaell/redux-promise-middleware/blob/cecbc62dd56ffcc185565f6bcd4aed7470127f20/src/index.js#L90-L109) will not go through `redux-loop`. You can solve this by putting the [`install()` of  `redux-loop`](https://github.com/redux-loop/redux-loop#install-the-store-enhancer) after your _middleware_, then providing that `install()` method with access to the top-level `store.dispatch` method, grabbing it after the [_store_ is created](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md).
* Second, pay attention to the flow of promises in your _middleware_. For example, `redux-promise-middleware` does not [return the promise that results from its `*_PENDING` ](https://github.com/pburtchaell/redux-promise-middleware/blob/cecbc62dd56ffcc185565f6bcd4aed7470127f20/src/index.js#L75-L79)action - so `Effects` generated from that action won't be waited on like you would expect. You might need a fork here, to add a `Promise.all()`.

Making these components play nicely takes some work but allows for more declarative _action creators_, even changing behavior client/server with different _middleware_. You'll have to dig in and see what feels right for you and your team.

Finally, be aware that [`redux-loop` uses `Symbol`](https://github.com/redux-loop/redux-loop/blob/0da84e946e2b262f98c836ad310fcd0d80bee94d/modules/effects.js#L3), a new Javascript feature not present in PhantomJS or older browsers. You'll need [a polyfill](https://babeljs.io/docs/usage/polyfill/) [of some kind](https://github.com/medikoo/es6-symbol).

## react-intl

[Internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization) (i18n) is painful. As a programmer, whenever I think about it, I think back to horrible [string tables stored outside the code](https://msdn.microsoft.com/en-us/library/windows/desktop/aa381050(v=vs.85).aspx), with nothing but brittle IDs in the code itself. One typo in the ID and it breaks. Incorrectly reference any string interpolation hints in the separate string table file, and it breaks. Forget to update the string table when updating the code, and at minimum the UI is broken.

[`react-intl`](https://github.com/yahoo/react-intl) is the first i18n library I've used that feels right, feels natural. First, with the magic of [Babel](https://babeljs.io/) code analysis, your default language strings are in the code:

```javascript
<FormattedMessage
  id="inbox.welcome"
  defaultMessage={`Hello {name}! Messages unread: {unreadCount, number}`}
  values={{
    name,
    unreadCount,
  }}
/>
```

The `<FormattedMessage>` React component will only use the `defaultMessage` (and warn on the console) if you haven't provided any locale-specific translations.

Next, the [`babel-plugin-react-intl`](https://github.com/yahoo/babel-plugin-react-intl) package will extract all strings for your default language dictionary file. In your `.babelrc`:

```JSON
{
  "plugins": [
    ["react-intl", {
        "messagesDir": "./build/messages/"
    }]
  ]
}
```

Now you have simple JSON files with all your strings! Ready to send to localizers, and ready to use as locale data in your app. [The `react-intl` repo has a working example of all of this](https://github.com/yahoo/react-intl/tree/master/examples/translations).

### The ICU format

Okay, now that we're managing our strings well, it's time to do i18n right. `react-intl` does a lot for you regarding [date](https://github.com/yahoo/react-intl/wiki/Components#date-formatting-components) and [number](https://github.com/yahoo/react-intl/wiki/Components#number-formatting-components) formatting. But as you can start to see with the [`<FormattedPlural>` react component](https://github.com/yahoo/react-intl/wiki/Components#formattedplural), pluralization is where it gets really tricky. What are the `zero`, `two`, and `few` props for?

It turns out that each language has different rules for pluralization. Not just different words for `item` versus `items`, but more words and thresholds where they apply! [FormatJS](http://formatjs.io/) is the parent project of `react-intl`, and has this example on its homepage:

> "Annie took 3 photos on October 11, 2016."

In English there are two required states for this: '1 photo', and 'N photos.' But [FormatJS decided to make it nicer](https://github.com/yahoo/formatjs-site/blob/d13655d69acb016818ddf792688a62745011a9aa/i18n/en-US.yaml) with a better option for zero: 'no photos':

```text
{name} took {numPhotos, plural,
  =0 {no photos}
  =1 {one photo}
  other {# photos}
} on {takenDate, date, long}.
```

This is the [International Components for Unicode (ICU) message format](http://userguide.icu-project.org/formatparse/messages). Not only does it specify the translations, but it specifies the thresholds for where they should apply. This means that we can now, in the string itself, handle Polish properly. [For that simple string, Polish has four possible states](https://github.com/yahoo/formatjs-site/blob/d13655d69acb016818ddf792688a62745011a9aa/i18n/cs-CZ.yaml):

```text
{takenDate, date, long} {name} {numPhotos, plural,
  =0 {nevyfotila}
  other {vyfotila}
} {numPhotos, plural,
  =0 {žádnou fotku}
  one {jednu fotku}
  few {# fotky}
  other {# fotek}
}.

```

The old ways aren't adequate. Simple string interpolation (`%s`) isn't enough because different languages might need the components in different orders, like the date first in Polish. Named string interpolation (`{itemName}`) isn't enough because the pluralization rules themselves change by language, along with the words.

The ICU message format is what `react-intl` uses, and it's the right way to do i18n. Use it! You don't even have to use it with React, calling [`defineMessages()`](https://github.com/yahoo/react-intl/wiki/API#definemessages) directly, along with the [`intl-messageformat`](https://github.com/yahoo/intl-messageformat) node module.

## nvm instead of n

You can't necessarily upgrade all of your Node.js apps at once. Or perhaps a contract has locked its version to something older than what you generally use. Or perhaps you just want to try out the latest releases without a permanent commitment. You need a version manager.

When I was looking for a Node.js version manager a couple years ago, I seized upon [`n`](https://github.com/tj/n). It didn't mess with environment variables, and it always installed binaries. No long builds from source. It replaced `/usr/local/bin/node` whenever I switched, so nothing else had to change. Nothing else needed to worry about different paths. It worked well.

That is, until I started upgrading [`npm`](https://docs.npmjs.com/cli/npm) beyond the default installed with Node.js. In particular, as soon as my projects required `npm` version 3, `n` became very painful. Every time I switched, `n` would replace `npm` with the default for that version of Node.js. And sometimes it [would](https://github.com/npm/npm/issues/9659) [break](https://github.com/npm/npm/issues/9720) `npm`, so I'd have to blow away `/usr/local/lib/node_modules/npm` manually.

I took another look, and realized that `nvm` had some distinct advantages:

* It keeps a unique set of globally-installed node modules for each version of Node.js! That meant I could keep `npm` at whatever version I wanted. This also applies for every other command-line node module I installed.
* It understands the concept of [LTS builds](https://github.com/nodejs/LTS) and other shorthand aliases. `nvm install 6` installs the latest `6.x.x` available. `nvm install lts/*` installs the most recent LTS build.
* It allows you to use different versions, at the same time, in different terminal windows. This allowed me to run my [`thisDayInCommits`](https://github.com/scottnonnenberg/thoughts-system/blob/master/thisDayInCommits) node script again, which has been [broken by `node-git`](https://github.com/christkv/node-git/issues/43#issuecomment-146938131) for quite some time now.

There is one disadvantage, though. Anything that doesn't run your shell setup script (like `~/.profile.sh` or `~/.bash_profile`) won't have a `node` command in its path. For example, a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) [git](https://git-scm.com/) application combined with [`ghooks`/`validate-commit-msg`](/better-changelogs-strings-and-paths/#standard-version-validate-commit-msg) will give you a 'node: command not found' error. Here's a fix for OSX or Linux: for a machine-wide `node` command to be used when `nvm` is not set up:

```bash
ln -s /user_home/.nvm/versions/node/vX.X.X/bin/node /usr/local/bin/node
```

### moving from n to mvn

Okay, so maybe you're convinced, but you're currently using `n`. How to switch? Here are the steps I used to clean up:

```bash
# get rid of n binary
rm /usr/local/bin/n

# get rid of installed node versions
rm -rf /usr/local/n/

# get rid of n-managed commands
rm /usr/local/bin/iojs
rm /usr/local/bin/node
rm /usr/local/bin/npm

# get rid of headers
rm -rf /usr/local/include/node
```

Now you're ready to [install `nvm!`](https://github.com/creationix/nvm#install-script)

## Small improvements every X

I'm always discovering better ways of doing things every day, every week, every month, every year. Hopefully you've found these useful. Watch for more!

Have you found anything interesting lately? Let me know!



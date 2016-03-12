---
rank: 18
title: R for React (NERP stack part 3)
date: 2016-02-15T19:38:29.637Z
layout: post
path: /r-for-react-nerp-stack-part-3/
next: /p-for-postgres-nerp-stack-part-4/
previous: /e-for-express-nerp-stack-part-2/
tags:
  - nerp-stack
  - javascript
  - reactjs
  - nodejs
  - software
---

Welcome to Part 3 of my series ([Part 1](/n-for-node-js-nerp-stack-part-1/), [Part 2](/e-for-express-nerp-stack-part-2/)) about a new, more-fun-than-[MEAN](http://mean.io/), more-illuminating-than-[LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) development stack. Today we take a look at the Pros and Cons of [React](https://facebook.github.io/react/).

<div class='fold'></div>

Remember, NERP is:

* **N** = [Node.js](https://nodejs.org/)
* **E** = [ExpressJS](http://expressjs.com/)
* **R** = [ReactJS](https://facebook.github.io/react/)
* **P** = [PostgreSQL](http://www.postgresql.org/)

Today we finally move beyond the letters we share with MEAN. The first of these is React. It’s [pretty hot](https://www.quora.com/Is-ReactJS-overtaking-AngularJS-as-the-most-popular-front-end-web-framework) [right now](https://www.quora.com/Is-React-killing-Angular), but we’ll be sure to cut through the hype.

## Apples? Oranges?

First, some terminology. React is frequently used in the same breath as [Angular](https://angularjs.org/), [Ember](http://emberjs.com/), [Knockout](http://knockoutjs.com/), [Backbone](http://backbonejs.org/), and other [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) web frameworks. But the truth is that React can’t be compared directly with these frameworks, as it says on the React homepage:

> *"Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project." (https://facebook.github.io/react/)*

So React isn’t a complete solution by itself. You give it data and it renders or re-renders HTML. And will emit events on user interaction. But that’s it. So, when I talk about React, I assume that you’ve selected a [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation to go along with it.

## Flux

You may have heard this nebulous term in connection with React. In a phrase, it is *the data flow for your application*. When the user makes a change in a textbox, where does that new data go? How does overall application state change? What exactly is the overall application state?

The old model ([jQuery](https://jquery.com/) and most frameworks), is to make some local UI change to the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) then emit an event. Other components listening for that event can make their local DOM changes, then emit yet more events, and so on. In a large app, it gets hard to track the cascade of changes both to DOM and application state. Especially since they can easily get out of sync!

Flux dictates that the user’s change must first affect the central application state, before attempting to do anything with that change locally. When application state changes, the app re-renders, finally changing the DOM. Cascading data changes are explicitly disallowed, greatly simplifying already-complex large applications.

This means that all application state is entirely separate from the DOM. On save of user settings, for example, we don’t extract data from the form on the page - we use the current application state. Want to know what the UI should look like? Just look at the current application state.

## Redux

[Redux](https://github.com/rackt/redux) is one of the primary players in the world of Flux implementations. In contrast to the majority, it has just one central object (the [*store*](http://rackt.org/redux/docs/basics/Store.html)) as its application state.

I has a very constrained data flow. Small objects ([*actions*](http://rackt.org/redux/docs/basics/Actions.html)) are passed through a central chain of [*middleware functions*](http://rackt.org/redux/docs/advanced/Middleware.html) (not the same as [Express middleware](http://expressjs.com/en/guide/using-middleware.html)) which can modify those actions, then the actions are passed through a set of [*reducer* functions](http://rackt.org/redux/docs/basics/Reducers.html) which are the only thing which can change the central *store*. Finally, when the *store* changes, your [React view components are re-rendered with its new data](https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

It’s the simplicity, and ultimately the restrictions, inherent to this architecture which make it worth using. Extremely useful functionality can be built on top of it:

* [Easily-implemented undo](http://rackt.org/redux/docs/recipes/ImplementingUndoHistory.html)
* [Dev tools showing every change to application state](https://github.com/gaearon/redux-devtools)
* [Saving complete application state to localStorage](https://github.com/elgerlambert/redux-localstorage)
* [Copying all application state from one browser tab to another](https://www.youtube.com/watch?v=5yHFTN-_mOo)
* [Implementing HTTP calls declaratively](https://www.npmjs.com/package/redux-api-middleware)

## R for React

So now we know a little bit more about what React provides, and what people generally mean when they talk about it. Should we use it?

## The Pros

If some of the stuff above already seemed pretty great to you, there’s more!

1. Just re-render!
2. Build-time errors with JSX
3. Flexible rendering
4. Lightweight
5. You will conform!

### 1. Just re-render!

The techniques of manually tuned incremental DOM updates were appropriate in the beginning, when we were using jQuery to target slower devices/browsers. Each change to the DOM was expensive, and JavaScript code was slow to execute. Everything had to be deliberate. But it was costly. A lot of development time was spent manually synchronizing application state with the DOM. *Have we rendered the template yet? If yes, don’t call render again - you’ll have to change things inside it manually!*

All that goes away with React. Instead of direct DOM manipulation, your `render()` functions produce an intermediate data structure which represents the DOM as you’d like it to look. React diffs that with the existing DOM, and then makes only the necessary changes. Your app no longer has to think about synchronizing DOM state and application state.

This simplicity allows initial naive development, no or minimal performance concerns. Most of the time, this is fine. When performance optimizations are later needed, the [tools are available](https://facebook.github.io/react/docs/perf.html). [Re-use of DOM nodes via the `key` prop](https://facebook.github.io/react/docs/multiple-components.html#dynamic-children) can provide a nice boost in some scenarios. And you can even do a little bit of extra work to [tell React that a given subtree of your component graph doesn’t need a re-render at all](https://facebook.github.io/react/docs/advanced-performance.html).

### 2. Build-time errors with JSX

Developing for the web has long required near-constant refreshes of your HTML page. It made sense; you couldn’t really tell if your markup was well-formed until it hit the browser. This got worse with a framework like Angular or Ember: now you load the page, which load the library, and then the library processes the HTML to find your directives. Typo in your directive name? [Malformed](https://guides.emberjs.com/v1.10.0/templates/displaying-a-list-of-items/) [loop syntax](https://docs.angularjs.org/api/ng/directive/ngRepeat)? The only way to know is to try it! Click the button and see if your logic fires!

Now, [with JSX](https://babeljs.io/docs/plugins/transform-react-jsx/), a missing or mismatched `</div>` tag results in a [build error](https://facebook.github.io/react/docs/tooling-integration.html#productionizing-precompiled-jsx)! And because React components are Javascript code with JSX sprinkled about, [linting](http://eslint.org/) can tell you if your attempt at a loop will run. Generally, there’s minimal magic involved here - JSX is a straightforward code translation, from `<Tag></Tag>` to `React.createElement(Tag)`. It makes the whole thing easier to reason about.

Beyond that, [basic unit testing of your React components](https://facebook.github.io/jest/docs/tutorial-react.html) gives you more confidence than with Ember or Angular, because you’re not missing the markup/directives half of your functionality!

Of course, there are still many scenarios where loading the page is required. Here React provides  [specific friendly error messages in development mode](http://stackoverflow.com/questions/22118915/how-to-turn-on-off-reactjs-development-mode). And when you use a React component, the component’s [specified `propTypes`](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) can warn you about missing or malformed props.

### 3. Flexible rendering

Your first experience with React will likely be in the browser - an initial render, and then a lot of small updates the DOM as the user interacts with the application. But React has two key additional forms of rendering available:

* **Node.js** - you can render your React components on the server side with Node.js. With this, you can generate a [page ready to use before client JavaScript is even downloaded](http://techblog.netflix.com/2015/08/making-netflixcom-faster.html), making the site seem that much faster. React uses checksums so that, given the same data, the DOM doesn’t need to be torn down and re-rendered on the client. And it doesn’t have to be rendered realtime - you can just use it to generate static files for easy caching. There’s a clear trend in this direction: [Ember has experimented with it](http://emberjs.com/blog/2014/12/22/inside-fastboot-the-road-to-server-side-rendering.html), and [Angular 2 will support it natively](https://github.com/angular/universal).

* **iOS/Android** - [React-Native](https://facebook.github.io/react-native/) allows you to use write applications for mobile devices, retaining much of your JavaScript-based application logic. Instead of generating HTML elements with your JSX, you [generate controls native to the mobile platform](https://facebook.github.io/react-native/docs/native-components-ios.html#content).

[Extremely innovative](https://github.com/gaearon/react-blessed-hot-motion) [things are happening](https://facebook.github.io/react-native/showcase.html) in both of these spaces. It’s quite exciting to see.

### 4. Lightweight

Some of the most [performance-minded lately have started to question whether frameworks are worthwhile](http://www.thedotpost.com/2015/12/henrik-joreteg-pocket-sized-javascript), especially in the mobile space. In particular, [Android devices seem to run javascript quite slowly](https://meta.discourse.org/t/the-state-of-javascript-on-android-in-2015-is-poor/33889). It’s not the latency or download time - it’s the parsing and running. We’ve assumed that things are always getting faster, and they may still, but we need to give today’s customers a good experience.

So, what we need for mobile (and performance in general) are smaller downloads, faster boot-up time, and intelligent use of resources. React [has a smaller download and faster boot-up versus other frameworks](https://aerotwist.com/blog/the-cost-of-frameworks/#the-results). Take a look at the numbers - there’s a clear difference (via [this gist](https://gist.github.com/Restuta/cda69e50a853aa64912d)):

<table>
  <tr>
    <th>Name</th>
    <th>GZipped</th>
    <th>Size</th>
  </tr>
  <tr>
    <td>Angular 2 + RxJS</td>
    <td>143K</td>
    <td>766K</td>
  </tr>
  <tr>
    <td>Ember 1.13.8</td>
    <td>123K</td>
    <td>486K</td>
  </tr>
  <tr>
    <td>Angular 2</td>
    <td>111K</td>
    <td>566K</td>
  </tr>
  <tr>
    <td>Ember 2.2.0</td>
    <td>111K</td>
    <td>435K</td>
  </tr>
  <tr>
    <td>Angular 1.4.5</td>
    <td>51K</td>
    <td>143K</td>
  </tr>
  <tr>
    <td>React 0.14.5 + React DOM + Redux</td>
    <td>42K</td>
    <td>139K</td>
  </tr>
  <tr>
    <td>React 0.14.5 + React DOM</td>
    <td>40K</td>
    <td>133K</td>
  </tr>
</table>


### 5. You will conform!

As we explored above, React has a very specific way of doing things. There are different Flux implementations, but the core data flow is the same. This consistency reduces the number of architecture decisions required for a given project, and decreases ramp-up time for a developer who has previously used React.

Additionally, everyone I’ve spoken to says that this is not just another hot library - it’s a radical rethinking of the way user interface is done. And it doesn’t just feel warm and fuzzy. When features are reimplemented with Flux, longstanding tricky bugs just go away.

## The Cons

As always we need to temper all the excitement with a little bit of reality.

1. You will conform!
2. Breaking changes
3. Batteries not included
4. It’s new

### 1. You will conform!

Yes, it is a double-edged sword. It’s not necessarily easy to re-train yourself in the way of React. The longer you’ve been writing web applications, the harder it is wrap your mind around it all.

The old is gone - you can no longer sprinkle jQuery around for the odd tricky situation. And the new is uncomfortable. When I last taught Flux, my students struggled with how much code it took just to update one textbox. I didn’t like JSX when I first encountered it.

Once you’ve internalized all that, it’s time to start thinking about your existing functionality and third-party libraries. What do you reimplement, what do you keep in place? You’ll need to pay particular attention to [anything that attempts to modify the DOM itself](http://stackoverflow.com/questions/23530716/react-how-much-can-i-manipulate-the-dom-react-has-rendered). React is very jealous about the parts of the DOM it manages.

### 2. Breaking changes

React is not yet at version one. I’ll say it again - all version numbers still start with zero! In the world of [semver](http://semver.org/), that means breaking changes can happen at any time. And they do. For example, with the [recent release of 0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html), React split in two: the core [`react`](https://www.npmjs.com/package/react) library and the web-specific [`react-dom`](https://www.npmjs.com/package/react) library. Big changes like this are still happening, because the project is evolving quickly. [`react-native` was first released less than a year ago](https://github.com/facebook/react-native/releases/tag/v0.1.0)!

The good news is that React is being used in production by Facebook. And not as a toy. They claim that they have 15,000 React components in their codebase. Therefore, the community understands the cost of breaking API changes, and does its best to help out. Deprecation warnings show up in versions prior to the change, and when the changes are in place, so are [codemods, which can help migrate a codebase](https://github.com/reactjs/react-codemod/blob/master/README.md).

### 3. Batteries not included

Angular comes with a [component for making AJAX requests](https://docs.angularjs.org/api/ng/service/$http), React doesn’t. Angular comes with an [implementation of promises](https://docs.angularjs.org/api/ng/service/$q), React doesn’t. Angular has [logging](https://docs.angularjs.org/api/ng/service/$log), React doesn’t. Angular has [built-in routing](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider). React doesn’t. Yes, a Flux implementation gets you closer to a web application framework, but you’ll still need to select you preferred library for all of these scenarios.

But that’s [nothing](/n-for-node-js-nerp-stack-part-1/#2-too-much-choice) [new](/e-for-express-nerp-stack-part-2/#1-not-production-ready-out-of-the-box) in the world of NERP, right? By now you’ve started to realize that the NERP stack is not all you need, it’s the backbone of the app you end up building - a place to start. You have the power to round out your application with whatever it needs: [heavyweight](https://github.com/rackt/react-router) or [lightweight](https://slides.joreteg.com/dotjs/#71) solutions.

### 4. It’s new

React was [first released a little less than three years ago](https://github.com/facebook/react/releases/tag/v0.3.0). It only broke through to the mainstream in 2015, and [its search volumes still lag behind angular](http://www.google.com/trends/explore#cat=0-5&q=react.js%20%2B%20reactjs%20%2B%20%22react%20js%22%2C%20angular.js%20%2B%20angularjs%20%2B%20%22angular%20js%22%2C%20ext.js%20%2B%20%20extjs%2B%20%22ext%20js%22%2C%20backbone.js%20%2B%20%20backbonejs%20%2B%20%22backbone%20js%22%2C%20ember.js%20%2B%20emberjs%20%2B%20%22ember%20js%22%2C%20knockout.js%20%2B%20knockoutjs%20%2B%20%22knockout%20js%22&cmpt=q). Can you trust it? Will it just go away? Will you be able to find developers who know it well?

It seems to be getting more popular every day, but we can’t be sure. There is one thing we do know: React will eventually be replaced with the next hot thing. You’ll have to decide if you can get enough value out of it in the near term.

## Conclusion: Jump in!

React is an innovative tool for building user interfaces in the browser, on the server, and on mobile devices. It’s not another framework that tries to provide the most value out of the box, or twist itself to work the way you work. *You will conform!*

But, like a strict personal trainer who has your best interests at heart, your applications will end up better off. Instead of spending time on syncing application state and the DOM, you can focus on features!

## Full NERP ahead!

R is looking great! You can feel the momentum building - just one letter left to complete this new technology stack! Surely it will become one of the classics, known by all even if only the the lucky few can fully embrace it!

Next up: [*Part 4: P for Postgres*](/p-for-postgres-nerp-stack-part-4/)...

---

*Fun fact:* As of Feb 2016, this blog is a React/React-Router single-page web app. It’s also statically generated at build time with Node.js, so pages render before javascript is ready. And for users without javascript!

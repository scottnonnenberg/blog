---
title: Don't write Javascript
date: 2021-11-14T18:43:23.080Z
path: /dont-write-javascript/
tags:
  - typescript
  - javascript
  - software
  - nodejs
---

Yes, I've written a lot of Javascript. But it's honestly an accident that we're using it for such large, complex applications. It's not a good language. We need to move on. Let's talk about how you can do that.

<div class='fold'></div>

## Humble beginnings

Javascript has been the backbone of the interactive world wide web for many years now. But why is that?

Let's go back to the 90s, before [Web 2.0](https://en.wikipedia.org/wiki/Web_2.0), before apps, and before the rise of social media. The [browser wars](https://en.wikipedia.org/wiki/Browser_wars#First_Browser_War_(1995%E2%80%932001)) were raging, and [Netscape](https://en.wikipedia.org/wiki/Netscape) was feeling pressure from [Microsoft's Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer) to innovate in the browser space. [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), originally hired to put [Scheme](https://en.wikipedia.org/wiki/Scheme_(programming_language)) into the _[Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator)_ browser, [developed Javascript in 10 days](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/) in 1995 as a companion to the hotness that was [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) at that time.

The new language was unique in that it was lightweight and directly connected to everything in the browser. The familiarity of [C-style syntax](https://en.wikipedia.org/wiki/C_syntax), like Java, but no need for [applets](https://en.wikipedia.org/wiki/Java_applet) or a compilation step. All you need is an HTML file with a few syntactic sprinklings. Remember [stuff like this](https://archive.scottnonnenberg.com/pages/homepage_20000107/index4.htm)?

```html
<a
 href="javascript: go('a4')"
 onmouseover="CI('a4','on');return true"
 onmouseout="CI('a4','off')"
>
  <img src="pictures/view_off.gif" name="a4" border="0" width="150" height="90">
</a>
```

However, due to inconsistent and incomplete browser support, Javascript got a very slow start. Back then, browser upgrades were both infrequent and a pretty big deal. Sometimes you couldn't upgrade your browser until you also upgraded your computer!

And so, Javascript couldn't be relied upon for much beyond visual flourishes if you wanted to support everyone. My [avant-garde homepage from 1999](/2017-twenty-years-online/#creativity) was taking it further than most did at the time.

## Breakthrough

Javascript as an application platform really only [came into its own](https://en.wikipedia.org/wiki/JavaScript#Growth_and_standardization) in 2005, ten years after initial release. Rich web applications were starting to get popular. For example, [Google Maps](https://en.wikipedia.org/wiki/Google_Maps) was first released in February 2005, with truly impressive interactivity: just click and drag to pan the map. In comparison, at that time a pan on [MapQuest](https://en.wikipedia.org/wiki/MapQuest) required a slow full-page refresh.

The first key to this change was out-of-band data fetching. Called [AJAX (asynchronous Javascript and XML)](https://en.wikipedia.org/wiki/Ajax_(programming)), it enabled a new way to make web applications dynamic, instead of the standard of form posts and full-page refreshes.

The second key was that computers and network connections had gotten a whole lot faster. I built my own computer in late 1999, and even with a lot of high-end hardware, it needed dedicated decoder hardware to play [DVDs](https://en.wikipedia.org/wiki/DVD). Moreover, it was unthinkable to download video at the quality of DVD! [YouTube](https://youtube.com) first got its start in 2005 - [progressing to high-resolution video](https://en.wikipedia.org/wiki/History_of_YouTube) over the next few years.

And the last key was that the deployment problem was solved - no need to ship both your application and its [execution engine](https://en.wikipedia.org/wiki/Common_Language_Runtime)! Up-to-[standard](http://www-archive.mozilla.org/js/language/E262-3.pdf) Javascript engines were already present in web browsers the world over. Just make a web page, throw some code in talking to some endpoints or helping the user fill out forms, and you have a web application!

Today, Javascript usage has gone wild. Fully-featured applications right in the browser: [Gmail](https://www.google.com/gmail/) or [Google Docs](https://docs.google.com/), or their [open-source](https://protonmail.com/blog/protonmail-open-source/) [alternatives](https://github.com/ONLYOFFICE/web-apps). Third-party code providing ads and analytics require so much download, parse and execution time that [ad-blockers](https://ublockorigin.com/) actually preserve battery life! Javascript has even made its way to the server: [Node.js](https://nodejs.org/) or [inside your database](https://plv8.github.io/).

It's useful to consider the time before, when all of this was not a given. When [jQuery](https://jquery.com/) was a bleeding-edge concept. Because we've all grown far too accustomed to this current quite-accidental situation.

## Letting go

We shouldn't be using Javascript like we do. It was never meant for these kinds of large-scale applications. [It has far too many pitfalls](/the-dangerous-cliffs-of-node-js/).

The very traits that allowed for ease of use in web pages make it bad for large, high-quality applications. It compiles at load-time, preventing up-front validation. It doesn't crash in many invalid states, so browsing can continue uninterrupted. With no built-in module system, it works best with code snippets in an HTML file or one external code file.

We do have small bits of modernity sprinkled into the language today, like `use strict` and `const`/`let` but these are opt-in since parsers need to be backward compatible. And so the language is hamstrung by decisions made very long ago.

Here are just a few of the errors we would expect our platform to catch for us:

* **A missing required function parameter** - Instead it becomes a runtime error, or potentially just silent data corruption.
* **Using a nonexistent property on an object** - If attempting to use it as a value, users may see 'undefined' somewhere in the app. If attempting to use it as a function, Javascript will throw an error.
* **Mixing strings and numbers in math operations** - your user may see the dreaded `NaN`. Or it might [spread through your numeric calculations](/hard-won-lessons-five-years-with-node-js/#nan).
* **Modifying core platform functions** - sure, your code may work as expected when you've changed the behavior of `Object.prototype.toString()` but other parts of the application probably depend on the standard behavior.
* **Mutating function parameters** - `Array.prototype.sort()` sorts in-place, so you've just modified your caller's data!

And there's a whole set of trip-hazards in the syntax itself. There's nothing to catch here, just certain language constructs which should only be used with extra care:

* `null` and `undefined` are different values
* [The `==` operator gives really unexpected results](https://dorey.github.io/JavaScript-Equality-Table/). These are all true: `null == undefined`, `0 == []`, and `'' == false`
* `if (variable)` means you're now working with _truthiness_ and _falsiness_, which has [its own confusing set of rules](https://dorey.github.io/JavaScript-Equality-Table/)
* `this` is often [not what you expect](https://frontarm.com/james-k-nelson/what-the-this/)
* [Prototype-based inheritance](https://en.wikipedia.org/wiki/Prototype-based_programming) is confusing, most don't know why they should use [`hasOwnProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

This helps to explain why starting a new Javascript project involves so many tools!

* [ESLint](https://eslint.org/) - the missing up-front validation
* [WebPack](https://webpack.js.org/) - the missing modules system
* [Babel](https://babeljs.io/) and [Polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) - modern and consistent syntax, no matter the browser

Yes, Javascript was a novel solution to a problem, and for a long time it was the only player in the game. But things have changed.

## Alternatives

Are you writing client-side or server-side Javascript?

If yes:

* Are you working with multiple people?
* Is the code already in production, or potentially going to production?
* Do you plan to continue to maintain the application or library in the future?
* Are you below 75% test coverage?

You probably answered yes to at least one of these questions. The pitfalls of Javascript will be a constant drag on your efficiency, making change difficult. You need something better. You need an alternative to Javascript.

The most straightforward alternative is [Typescript](https://www.typescriptlang.org/). It solves a lot of the problems of Javascript while still being extremely interoperable with things written in plain Javascript. You can even move to Typescript progressively, with various levels of type safety in the same file. And the benefits are clear: add a new required parameter to a function and Typescript will catch it. Try to use a nonexistent property on an object, and Typescript will catch it. Try to add a string and a number together, and Typescript will catch it.

Of course, all of this type-checked purity doesn't do much good if we don't have a bridge back to the real world - [Javascript built-ins](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects), [the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [etc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview). To solve that problem, Typescript ships with a truly impressive library of built-in types: its [DOM types](https://github.com/microsoft/TypeScript/blob/28e3cd3a80347ce37ed55bffdfc5e1d75360bb8f/lib/lib.dom.d.ts) are 18 thousand lines long, and it has [many other comprehensive `d.ts` files](https://github.com/microsoft/TypeScript/tree/main/lib) for the various Javascript standards it targets. Beyond that, [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), a community-maintained type library, provides a bridge to the extended Javascript ecosystem.

Typescript is squarely in the Javascript ecosystem. But depending on the other code in use at your organization, you can consider going further afield.

Let's consider a few other alternatives, from large ecosystem to small:

* **Java** can be used for frontend development via [TeaVM](http://www.teavm.org/) or [J2CL](https://github.com/google/j2cl) (the good part of [Google Web Toolkit](http://www.gwtproject.org/)). It's been around a very long time, with many, many developers and libraries available.
* **[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language))** isn't just for Windows anymore! Microsoft's [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) project makes it possible to compile it to [WebAssembly](https://webassembly.org/) for the browser.
* **[Elm](https://elm-lang.org/)** has an elegant architecture, designed from the start to compile to Javascript. It has [a pretty big ecosystem today](https://hackernoon.com/elm-in-production-developer-reflections-after-34k-lines-of-code-ok9h3v95), and was the inspiration for [Redux](https://redux.js.org/).
* **[Rust](https://www.rust-lang.org/)** is a newer entry to frontend development, via compilation to WebAssembly. You could try [Yew](https://blog.logrocket.com/rust-webassembly-frontend-web-app-yew/) as a client frontend application framework.
* **[PureScript](https://www.purescript.org/)** has algebraic data types like [Haskell](/what-s-a-monad-digging-into-haskell/), and pushes you towards truly [pure functions](https://en.wikipedia.org/wiki/Pure_function).

There are a [whole](https://www.slant.co/topics/101/~best-languages-that-compile-to-javascript) [lot](https://github.com/appcypher/awesome-wasm-langs) more - just remember the type bridge back to the real world is just as important as your internal type consistency!

The landscape of web application development is complex enough even without fighting your programming language. Choose one of these and move faster. Immediately erase several classes of bugs!

## In the browser

So you've moved to a new system with a better language. Keep in mind that any code you're running in the browser still needs to be compiled to Javascript or WebAssembly. So you're still in the world of Javascript, still affecting device battery life.

And that means you still need to consider the standard questions. How much code are you sending down to the client? What is the download, parse and compute time for all that standard library Java code that just got compiled into your package? It's surprisingly easy to make a mistake here with these new layers of indirection. Put some protection in place.

The other important angle is whether you really need all that code in the first place. How much interactivity do you really need? Are you more like Gmail, which has an explicit load step before you can do anything, or is it more like a blog post or landing page and interactivity needs to be immediate?

Make sure you have a really good reason for any Javascript or WebAssembly you hand to your user's browser.

## On the server

The only reason to be in the Javascript ecosystem at all when writing server code is code sharing or previous organizational momentum. If you've chosen something like Java or Rust for your language, then the answer is clear - use something that makes sense for that ecosystem for your server functionality. 

So if you're still compiling down to Javascript to run on Node.js, you need to take special care. Remember, [Node.js has a core event loop which can be easily interrupted](/breaking-the-node-js-event-loop/) if you have too much synchronous code, no matter the language. Do as much work as possible outside of the event loop: [in the database](https://www.postgresql.org/docs/current/plpgsql-overview.html#PLPGSQL-ADVANTAGES), [out-of-process in optimized implementations](https://neon-bindings.com/docs/introduction/), or at worst, in [worker threads](https://nodejs.org/api/worker_threads.html). [Watch server metrics closely](/breaking-the-node-js-event-loop/#mitigations-1).

You should have a default pressure against too much Javascript, even on the server. 

## Javascript is glue

Javascript was originally developed to respond to user actions on a web page, just a line or two per event handler. You can see that history in the structure of jQuery applications.

Let's take the role of Javascript back down to that. Include one line of Javascript in a web page to initialize your Elm app. Write a tiny Typescript event handler in your Express app to fetch and return data via a complex PostgreSQL stored procedure. Write Java compiled to WebAssembly to update a small part of your statically-generated website, fetching and displaying just the latest pricing and inventory.

Let's make higher-quality applications. Don't write Javascript. And if you truly must write it, make it tiny little bits of easily-verified glue code.

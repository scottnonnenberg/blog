---
title: Better web development and deployment
date: 2021-10-31T23:11:26.862Z
path: /better-web-development-and-deployment/
tags:
  - stack-improvements
  - javascript
  - software
---

In the last four years I've really improved how I develop and deploy web applications. There's a new set of tools I don't leave home without! Let's talk about what's changed, and more importantly, why. Welcome to the fifth entry in my [stack improvements](/tags/stack-improvements/) series!

<div class='fold'></div>

## Typescript

Let's start with an admission: **I was wrong.**

Back in 2016, when I [first started adding type hints to my projects](/better-docs-and-static-analysis/), I thought [Flow](https://flow.org/) would either win or remain a major player in the typed Javascript ecosystem. But that's not what happened. [Typescript](https://www.typescriptlang.org/) [won, very clearly](https://trends.google.com/trends/explore?date=today%205-y&q=TypeScript,facebook%20flow%20%2B%20flow%20language%20%2B%20flowtype). Its ecosystem has a [very substantial set of type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped) covering the most frequently-used node modules, it's [being actively improved](https://github.com/Microsoft/TypeScript/releases), and more and more library writers are either moving to Typescript or providing their own type definitions.

And as part of my work on [Signal Desktop](https://github.com/signalapp/Signal-Desktop), I've now worked with it quite a lot.

At this point I can confidently say that I don't want to write plain Javascript if I can possibly avoid it. Plain [Javascript is, frankly, dangerous](/node-js-is-not-magical/#2-test-or-die). Types and the additional confidence provided by them make it reasonable to work with others on a web application. And that includes _yourself_ in a few months!

We know that test coverage is always hard to come by, so let's use this deeper form of static analysis. You can make your interaction with globals like `window` type-safe, by [extending global interfaces](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html). You can use a `ReadOnly<Array<number>>` to ensure that you don't accidentally mutate your data by sorting in-place. You can get really fancy and use [`zod`](https://github.com/colinhacks/zod) to declare both a [Typescript type and a schema for runtime validation of that type](https://github.com/colinhacks/zod/tree/ef74a879320d848d17a4455d299a228a3b885957#type-inference) at the same time. 


## Prettier

I've spent [a lot of time thinking about Javascript code code style](/tags/eslint/), going so far as to [design my own `eslint` configuration](https://github.com/scottnonnenberg/eslint-config-thehelp) and [write a tool to compare `eslint` configurations](https://github.com/scottnonnenberg/eslint-compare-config). So I didn't let go of hand-edited Typescript formatting lightly. But with editor integration, and both command-line and CI integration, using [Prettier](https://prettier.io/) is pretty seamless.

And really, I haven't really betrayed any of my previous thoughts in this space:

> "I strongly believe that something as simple as code formatting should never be discussed in a pull request." - [Eslint Part 3: Analysis](/eslint-part-3-analysis/#the-importance-of-tools)

I've just taken it further. We've removed a class of [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding): the meta-debate about what the formatting-specific lint rules should be. And, to be fair, there was always some form of code construct that wasn't covered by lint rules, and would require effort in pull requests to keep the team on the same page.

No more.

If you're not already using Prettier, jump in! Yes, there will be an initial bit of pain, removing your formatting-related `eslint` rules and making [that first large prettier-formatted commit](https://github.com/signalapp/Signal-Desktop/commit/774ef94f5dbf83fc09d35efedabf2117fb48ac24). But I recommend that you go for it: take a look at its [limited set of options](https://prettier.io/docs/en/options.html), and keep in mind that there's an [escape valve](https://prettier.io/docs/en/ignore.html) in case it's really not doing what you want! 

And just maybe, in the long term, there'll be a level of code-formatting consistency between projects, reducing the friction of switching between codebases. Your subconscious is trained with each code style you work with - what if we could eliminate all style friction in the web development ecosystem? [The Go programming language certainly figured it out](https://go.dev/blog/gofmt).


## CSS Modules with Typings

CSS is complicated. And our applications built with it add their own levels of complexity. Time marches on and teams change, layering ever further complexity. Eventually, you see people using or recommending `!important` with a straight face.

The old world, one or a few CSS files with basic naming, just doesn't hold together anymore. I've tried [BEM](http://getbem.com/) to try to manage that complexity, and I do really like how it recommends differentiation between structural ('block'/'element') styles and state-specific ('modifier') styles which are likely to change. But it's still very easy to make a typo between your CSS and the HTML or [JSX](https://reactjs.org/docs/introducing-jsx.html) referencing it.

This is why I like [CSS Modules](https://css-tricks.com/css-modules-part-1-need/). Your styles are right next to the components using them, instead of going up a few directories, out of `/src` then back into `/stylesheets`, deep in a catch-all file there. In CSS Modules, all of your class names are namespaced for that specific usage, never to collide, and therefore can be whatever you want.

But it gets better. Once you're in this world, you can start to do cool things. [Class names](https://webpack.js.org/loaders/css-loader/#localidentname) can be `HTMLPreview-module--date--1luL9` in development mode, but minified to `e` in production mode. You can [generate `.d.ts` files from your CSS](https://github.com/TeamSupercell/typings-for-css-modules-loader), which then ensure that you don't use a nonexistent class in your component. Modern packagers can do [tree-shaking](https://webpack.js.org/guides/tree-shaking/) so if you never reference a class name, it won't find its way into your application's built assets.


## Storybook

We started using [`react-styleguidist`](https://react-styleguidist.js.org/) back in 2018 on Signal Desktop when we were introducing [React](https://reactjs.org/) to the codebase. I liked it because I could just scroll down to see all the visual permutations of a given component there before me - in a real browser applying full CSS styling. Much more confidence than [Enzyme](https://enzymejs.github.io/enzyme/) ever provided!

`react-styleguidist` supported iteration nicely - I could update the markdown files it worked from and it would hot-reload the page. It made it so much easier to work on error states! And it was absolutely crucial to the [big Signal message bubble redesign in the summer of 2018](https://github.com/signalapp/Signal-Desktop/commit/dc11db92f9473100075ac3c1fb4e2928d8f0bd0f.). 

But it started showing its weaknesses. We'd make a change to the props of a given component, and, though we were using Typescript, it didn't understand our markdown files. We'd forget to make changes to all the permutations. Periodically we'd do a big cleanup, but it was a good amount of work when it finally got bad enough to address.

[Storybook](https://storybook.js.org/) solved our problems. In its world, your [visual permutations are code](https://storybook.js.org/docs/react/writing-stories/introduction). And [it speaks Typescript natively](https://storybook.js.org/docs/react/configure/typescript), so all of your test scenarios are type-checked just like everything else. It's got a simple pattern for in-browser [modifications of component props](https://storybook.js.org/docs/react/essentials/controls). And yes, you can go deeper, with a [nice API](https://storybook.js.org/docs/react/addons/addons-api) for [customizations](https://github.com/signalapp/Signal-Desktop/commit/c08914cddcb75f41b87c41a7c638fd9180f4749f#diff-f374ebe738731903a1aecb533e2acdf9686f960d3e9249b45730d55aa333da47) appropriate to your specific app.


## Yarn offline cache

[Continuous Integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration), whether you use [Travis](https://travis-ci.org/), [Jenkins](https://www.jenkins.io/), [CircleCI](https://circleci.com/) or just [GitHub Actions](https://github.com/features/actions), is something you want to go as fast as possible. You push your changes, then you want quick results! [Proper caching configuration](https://github.com/actions/cache) and choice of CI provider can help. But we can do better.

[Yarn](https://yarnpkg.com/) itself can make things faster across all of these providers, with its [offline cache](https://yarnpkg.com/features/offline-cache/). Whenever you install a node module, Yarn will add a [compressed version of that module](https://github.com/scottnonnenberg/blog/tree/main/yarn-offline-cache) to your selected cache directory. Then you can use Yarn's `--offline` and `--pure-lockfile` options to [get the benefits of this cache in CI](https://github.com/scottnonnenberg/blog/blob/0855e3af7d26b55f9a80827f17c3415c7e671915/.github/workflows/ci.yml#L37).

Yes, it does make your git repository bigger, but I think it's worth it. Your CI runs are substantially faster and more reliable, with no flood of network requests for dependency downloads. And it means that if you've pulled down the git repo, you're ready to do development, with no more downloads necessary. Okay, yes, packages like `electron` do a web download on install, but there aren't too many of these!


## Vercel

We've started from the beginning, our programming language, and progressed all the way to continuous integration. Now let's talk about taking that code to users. Let's talk deployment.

Back in 2010, [Heroku](https://www.heroku.com/) was groundbreaking in its simplicity. There was no longer a need to administer a server. Just push to its [git remote](https://devcenter.heroku.com/articles/git#deploying-code) and it would deploy your updated application to your users. The hardest part was connecting your custom domain!

Now, 11 years later, I'm excited to use [Vercel](https://vercel.com/) for my blog. It watches for new commits in the 'blessed' branches I've set up, and will deploy to the domains I've assigned. For this blog, `main` is associated with , and the `js` branch is associated with https://blog-js.scottnonneberg.com. Simple!

But it also has that feature I've always wanted, always mused about building myself: it will create a custom subdomain endpoint for every other branch you push. If you create a pull request, that will get [a custom, fully-deployed URL](https://vercel.com/docs/concepts/deployments/automatic-urls#automatic-branch-urls).

And it's all very fast, using a [high-speed edge network](https://vercel.com/docs/concepts/edge-network/overview).

But there's more! I was surprised about how much it does for me. [SSL certificates via letsencrypt](https://vercel.com/docs/concepts/edge-network/encryption). A nameserver to [manage your domains](https://vercel.com/docs/concepts/projects/custom-domains). First-class support for domain aliases, domains you own but just forward somewhere else. It was so easy to move my stable of domains over!

It worked pretty well right out of the box with [Gatsby](https://www.gatsbyjs.com/). But I did need to make a few tweaks to keep everything running perfectly. There are three parts of the [`vercel.json`](https://vercel.com/docs/cli#project-configuration) configuration file that my blog uses:

* [`headers`](https://github.com/scottnonnenberg/blog/commit/e163c2f5e51364782f94504979d9d3882fe88b0b#diff-a3265310f552fb66876e8bfe8809737e59e5ba946bdf39138b44d9baf4e21240) - for proper caching of all the files generated by Gatsby.
* [`trailingSlash`](https://github.com/scottnonnenberg/blog/commit/3fc018bc79b86a8d98d900a0be4f5a8b86433901) - because that's how clean URLs should look.
* [`redirects`](https://github.com/scottnonnenberg/blog/commit/dc794ec6984f7e4ae28e46abf0314ace497cca98) - because I believe in true permalinks!

Pretty straightforward! And there's a lot more functionality available in the platform which I haven't yet used:

* [Serverless Functions](https://vercel.com/docs/concepts/functions/introduction) for server-side code
* [Automatic understanding of Next.js apps ](https://vercel.com/docs/concepts/next.js/overview#no-configuration-required)
* [Purchase and automatic renewal of domains](https://vercel.com/docs/concepts/projects/custom-domains#renewing-domains)

I plan to go deeper with more complex applications soon - I'll be sure to let y'all know how that goes. But for now, their [Hobby plan is free](https://vercel.com/pricing), so there's very little risk in trying things out! Deploy away!


## State of the Art

I'm definitely going to continue using these tools; I have seen very clear productivity increases with each of them. 

But what about you? Have you tried them? Have you seen the same results I have? Or perhaps you disagree? Or maybe there's a really useful tool I've missed?

Let me know!

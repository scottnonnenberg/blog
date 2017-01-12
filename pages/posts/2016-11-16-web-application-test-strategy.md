---
rank: 22
title: Web application test strategy
date: 2016-11-16T20:14:05.762Z
layout: post
path: /web-application-test-strategy/
next: /be-a-scientist-dev-productivity-tip-3/
previous: /fear-of-the-subjective/
tags:
  - software
---

I'm a [huge fan of TDD](/contract-teaching/), and I definitely [track code coverage for my projects](https://codecov.io/gh/scottnonnenberg/blog/branch/master). But I've previously said that [focusing on 100% code coverage is a bad idea](/the-technology-side-of-agile/#local-verifications). And teams frequently focus testing effort on what is easily automatable, instead of what is important. So what is the right way to test a web application? Let's dig in...

<div class='fold'></div>

## Background

First, let's break it down. Any web app is built of several key behavioral elements:

1. Generate HTML structure based on data
2. Visual styles on top of that HTML structure
3. Trigger events based on interaction with HTML structure
4. Modify local application state based on those events
5. Modify local application state based on interactions with remote application state
6. Update HTML structure based on new data

There's quite a lot there! How to test all of it?

## Stage 0: Real usage

Each element listed above can be tested separately, but a good user experience requires that they all work well together. In a browser. Being operated by a real person. Really.

Why? Because real browsers have unique quirks. Because automation can't verify that the onboarding experience _feels_ right for the brand. Because automation doesn't usually catch layout or animation bugs.

But this kind of manual effort is costly! You're probably thinking about the matrix of supported browsers, platforms, device types, and application states. Running through the entire application on even one phone will take one person quite a while, right? How to optimize this?

A first optimization is establishing a manual test script, and deciding on a set of core scenarios and core devices. You'll probably want to cover onboarding, users with minimal data, users with lots of data, and at least one mobile and one desktop browser. You'll run this for every public release.

A second optimization is some sort of error/bug reporting mechanism to make it easy to report and investigate any issue found during manual use. This system will also directly benefit your users, making it easier for them to file bugs you can do something about.

Now you have a backstop. A process to ensure that nothing goes out the door completely broken. Key scenarios required for the business will continue to work amid application change. It's a start.

## Stage 1: The foundation

What can you do to increase confidence from here? What's an efficient use of development resources measured against the risk mitigation provided by the test infrastructure?

Element #5 is where to focus first. APIs are easy to test: data in, data out. Write tests that use the API like the web application would, covering those key scenarios you're testing during real usage. Then expand from there, covering unusual and error cases, ensuring that security protections are in place, and so on.

You might decide to write some of these tests as _unit tests_, calling internal methods instead of hitting the full API. Unit tests are a great way deal with _permutation explosion_: a given workflow has three branch points, each of which has three options. Instead of writing `3 * 3 * 3 = 27` tests, you can write `3 + 3 + 3 = 9` tests plus a couple tests tying the entire workflow together.

With a high-quality test infrastructure in place at this level, you can catch bugs long before the data is ever sent to the browser. And if you have customers using your API, you can more confident about the versioning claims you've made about it. You have a solid foundation on which to build the user experience.

## The _Test Pyramid_

**Stage 0** was just a few key scenarios because they took a lot of time. **Stage 1** can include more tests, because they run faster! Especially once we start adding focused, quick-running _unit tests_.

We've moved down the _Test Pyramid_. **Stage 0** is the very top, with its slow, manual tests. With **Stage 2** we were operating at the middle/bottom of the pyramid. Faster, less comprehensive tests. We do as much as we can at that level to get a fast test suite, avoiding both slow tests and _permutation explosions_.

[Others](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiA9pHFg6zQAhVKxVQKHcA4B-UQFggdMAA&url=http%3A%2F%2Fmartinfowler.com%2Fbliki%2FTestPyramid.html&usg=AFQjCNFbCcMGWyS8w1Lj52x6DpMhrNheEg&sig2=HjoiLZOV71D7aNDjdm2BtQ) [have](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html) [discussed](https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid) [the](http://techbeacon.com/test-automation-basics-every-software-developer-should-know) [_Test Pyramid_](https://www.google.com/search?q=test+pyramid&source=lnms&tbm=isch). But I want to be very careful about what we can take away from this mental model. The pyramid doesn't tell us how much time to spend on the various parts of the pyramid, just a rough ratio of the total tests at each level. You might spend a third of your time at the top of the pyramid because the return on investment is so high.

Or you might spend all of your time pulling tests from the top of the pyramid down, by making them faster, or implementing them differently. That's effectively what everything past **Stage 0** is doing - getting as much test value as possible into a fast feedback loop a developer can have running continuously in the background. Nobody likes that long automated test run that [breaks your flow](/focus-dev-productivity-tip-2/).

## Stage 2: Local application state

The next focus area is local application state. In elements #4 and #5 above, events coming from the back-end server and inside the web application can modify the local application state. And the user experience is built on top of this application state. So we really care about getting its shape right, getting the transitions right.

If you're using [Redux](/r-for-react-nerp-stack-part-3/#redux) to manage state, this would be testing that your [_reducers_](http://redux.js.org/docs/basics/Reducers.html) properly change state based on incoming [_actions_](http://redux.js.org/docs/basics/Actions.html). In a [Backbone](http://backbonejs.org/) application, you'd ensure that your [View](http://backbonejs.org/#View) changes its [Models](http://backbonejs.org/#Model) and [Collections](http://backbonejs.org/#Collection) as expected when its methods are called. In Angular 1, you'd test that your [Controller](https://docs.angularjs.org/guide/controller) properly modifies its `$scope` when its methods are called.

Here it's important that we stay away from the DOM. By doing that, the behavior is easily described: data in, data out - just like the API tests. These tests are quick and simple, they are low in the _Test Pyramid_.

## Stage 3: Data to HTML to events

Now we move up the _Test Pyramid_ once more. We're confident about our local application state transformations, and our API is solid. Now we need to ensure that the application properly renders all of those potential application states and listens for updates. From raw data to HTML. From HTML to click events. #1, #3, and #5 in the behavior element list above.

In [React](https://facebook.github.io/react/), we can render [Components](https://facebook.github.io/react/docs/react-component.html) with various inputs, verifying the structure. And we can use a library like [`enzyme`](https://github.com/airbnb/enzyme) to do it [on the server](https://github.com/airbnb/enzyme/blob/master/docs/guides/mocha.md), [rendering only shallowly](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md), even [testing event wire-ups](https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/simulate.md). Testing this way with Backbone would require either [`jsdom`](https://github.com/tmpvar/jsdom) or a browser. Angular 1 has the [same browser/`jsdom` requirements](https://gist.github.com/rikukissa/dcb422eb3b464cc184ae), and Angular 2 runs on the server natively. It makes a difference: needing access to the DOM slows tests down, moving them up the _Test Pyramid_.

Note that any direct DOM manipulation or internal component state makes this kind of testing substantially harder. Instead of separate, small, independent tests, each supplying different initial data to a component and verifying the result, tests will need to exercise both initial states and state _transitions_. This is important distinction, and another source of _permutation explosion_. You can see this very clearly in React - a component which uses [`this.setState`](https://facebook.github.io/react/docs/react-component.html#setstate) is far more difficult to test than one using only [`this.props`](https://facebook.github.io/react/docs/react-component.html#props).

Either way, you're generally using [CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to validate that the structure of the HTML is expected. Triggering events on certain objects, again with selectors, and validating that the right function was called. We've started down a dark path.

## Brittleness and meaning

Those selectors are a key dependency between the tests and the code. And they can make your tests brittle. A totally innocuous code change can break tests. For example, adding a `<div>` in between a parent and child, required for correct rendering or interactivity in the browser. Or adding a new class to an element for additional behavior or new styling.

The good news is that in **Stage 3** tests run quickly, running after every change with [`--watch`](https://mochajs.org/#usage), filtered down to just the tests that matter with [`--grep`](https://mochajs.org/#usage). We want to keep the [feedback loop](/the-why-of-agile/#feedback-loops) as tight as possible here.

Sadly, passing tests can still let visual/rendering concerns through. Tests generally check for `.phone-number` (has meaning to humans) but not for `.p9 .fg .callout` (has meaning to the layout engine). One promising new technique here is the idea of a [style guide](https://getstorybook.io/), showing all sorts of [real, interactive uses of a given component](http://airbnb.io/react-dates/?selectedKind=DateRangePicker&selectedStory=default&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel). It's not full-fledged end-to-end testing of the application, but it is in a real browser. And it does ensure that the component behaves as expected. It starts to get us a little of element #2 above.

## Stage 4: Automating a browser

Now we travel all the way to the top of the pyramid once more. You're getting sick of all that manual testing of the app, right? But you still find bugs with those manual walkthroughs! Maybe the server has changed, and the client wasn't updated to match. Or UI components that work well separately don't work well together. Or a CSS change accidentally moved a button off-screen.

Your first browser automation test will likely use [Selenium](http://www.seleniumhq.org/), a browser automation engine, and [PhantomJS](http://phantomjs.org/), an open-source headless browser. Like **Stage 3**, you'll be relying on selectors to validate structure and find elements to interact with. But these are longer, stateful tests, like a user interacting with the site. This time the feedback loop is a lot slower, since test runs take a lot longer. Even worse, you often have a lot less information available to you when something goes wrong.

With this kind of test, you're verifying a narrow path through the product, covering all elements but #2 in the list above. But #2 is still very important! You still can't be sure that the site will work for a real user - that selector query for an HTML element will happily find that off-screen button!

A technique for ensuring that visual changes only happen when you expect them is [visual diffing](https://github.com/Huddle/PhantomCSS#what). A screenshot is taken at key points during browser automation, and these are compared between builds. _Quite_ brittle. _Any_ change, including a different username or email address, will be caught by the diff. It's only really useful when a given part of the UI has stabilized and your tests are written with this technique in mind. Even so, it might be worthwhile for your team. With diffing you can be sure that once a button is on the page, it will stay exactly where you expect it to be.

## Preventing useless tests

The elephant in the room here is that tests are only run when they run reasonably quickly and reliably. If they fail all the time (like visual diff comparisons), they'll eventually be disabled. If tests are too slow (like long in-browser scenarios), they won't be run regularly and will often fail when they do run. It's easy for tests to become effectively useless. Or worse than useless: anyone who decides to wade in and fix things will spend a lot of time addressing issues stacked up behind the first.

It takes a whole lot of discipline to maintain the browser automation tests in **Stage 4**. It's especially painful when you know the product itself is in good shape, having used it extensively. It feels like a pointless chore, fixing failures that told you nothing about the quality of the product.

Ensure that your **Stage 4** tests are worthwhile by keeping track of the bugs found or not found with these techniques. How many false alarms are there? How many real bugs are found? How many high-impact bugs still reach production? The real data is necessary to get past day-to-day frustrations you might experience.

It's also worth mentioning that most of the pain of testing has to do with analysis time. Frequent failures are painful, but they become drastically more painful when failures are difficult to analyze. How might you design systems to make these investigations easier? Perhaps better logging? Are selectors needed by tests disappearing? How about using `data-test` attributes, which signal that dependence right in the code? As with everything, the key is to adapt, getting better over time with root cause analysis.

## Stage 5: Exploratory testing

So far we've been talking about tests designed to be run regularly. When failures happen, failures should be easy to diagnose, and the tests need to run fast. But there is a place for a different class of activity: creative, exploratory testing.

The simplest form of this kind of testing is ['dogfooding,'](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) or using your own software. It's a vote of confidence and a big benefit to the ultimate quality of the product when your team uses its own software for mission-critical scenarios. Even if it's at home.

Next is is focused, creative use of the software. Explicitly attempting to break out of previous usage patterns can yield very useful bugs, and is an under-appreciated type of testing. Take the time to do it.

At the high-complexity end are tools. Scanners and checkers of all types, command-line or browser extension. Yes, if you find a large amount of value from one of these, you might start running it regularly. But there's value in periodically running new types of tools against the application, covering all sorts of domains: [security](https://www.google.com/search?q=website+security+validation+tool), [accessibility](https://www.google.com/search?q=website+accessibility+checker), [performance](https://www.google.com/search?q=website+performance+tools), [load](https://www.google.com/search?q=website+load+testing), [fuzzers](https://www.google.com/search?q=web+api+fuzzing) and so on. [Checklists](https://www.google.com/search?q=web+application+checklist) can be useful too. You might even decide to hire a domain expert for a short time.

## Stage X: Not exactly testing

Lastly, there's a whole category of program validation that doesn't fit neatly into the 'testing' space.

Linting is often considered a developer concern. But [ESLint](/eslint-part-3-analysis/) goes far beyond classic lint focus areas (syntax and style) all the way into catching bugs: [incorrect requires](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md) and potential [security](https://github.com/nodesecurity/eslint-plugin-security) or [accessibility](https://github.com/evcohen/eslint-plugin-jsx-a11y) issues. And that's just the plugins I've encountered! You can [write your own rules](/eslint-part-2-contribution/#lessons) to catch common issues specific to your project. Other languages have [similar](https://medium.com/@jgautheron/static-analysis-tools-for-go-47e2071aeef7#.6gjs2t1ry) [tools](http://stackoverflow.com/questions/97454/c-static-code-analysis-tool-on-windows). 'Static analysis' is a good search term.

On the other side of that continuum is the area of telemetry. I was very happy to see the rise of services like [Errorception](https://errorception.com/) which capture and report errors in client-side Javascript. And services like [New Relic](https://newrelic.com/application-monitoring) capture performance metrics automatically. But this space becomes vastly more useful when key business metrics are tracked. What does the `successful logins` metric look like before and after today's deploy?

A final space to consider is customer support interactions. We talked about making manual test failures easier to debug, and perhaps even exposing that system to your users. How might you make sure people are aware of that system? How might you reassure your users that reported bugs will eventually be fixed? Get creative here for both higher customer satisfaction and higher quality.

## Choose wisely

I present these stages in order because that's the order you should start using them in your project. There's no substitute for real humans using your app. But don't wait until **Stage 1** is complete to start on **Stage 2**! The key is to avoid mindlessness. Use each these tools to mitigate business risk as appropriate for your situation.

If your developers are already writing lots of unit tests, more power to them! Personally, I feel that unit testing increase my productivity. And with good unit tests you'll reduce the chance that your code crashes the first time it runs!

But don't mistake these tests for a ship-readiness test suite. That takes focus and planning.


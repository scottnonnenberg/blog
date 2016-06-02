---
title: "Contract: New techniques, old technology"
date: 2016-05-31T18:39:28.919Z
layout: post
path: /contract-new-techniques-old-technology/
next:
previous: /avoid-these-abused-words/
tags:
  - contract
  - reactjs
  - software
---

![Marionette + React](https://static.sinap.ps/blog/2016/05_may/new_tech_old_tech/marionette-and-react-rev2.png)

Last fall, after having worked with [React](https://facebook.github.io/react/) or [similar technologies](http://www.ractivejs.org/) for a couple years, I took [a contract](https://scottnonnenberg.com/work/#ookla-2015-q-3-to-q-4) working with [Marionette.js](http://marionettejs.com/). A much older technology, based on [Backbone.js](http://backbonejs.org/), it was uncomfortably familiar. I was dealing with problems I hadn't had to think about for a while! But there were some benefits to my contact with new technologies…

<div class='fold'></div>

## MVC vs. Flux

[Model View Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) is the old standard. It's been a darling of the architecturally pure for years. A crisp separation between an application's data (Models), user interface (Views), and business logic (Controllers). [Rails](http://rubyonrails.org/) was held up as true MVC architecture. But it wasn't always so crisp. You'd have [so much business logic that it didn't feel right in the Models](http://www.justinweiss.com/articles/when-is-an-activerecord-model-too-fat/), or it wasn't clear whether a given bit of code [should go in the Controller or the Model](http://www.justinweiss.com/articles/where-do-you-put-your-code/).

The client side largely wasn't making these architectural distinctions until 2010, when Backbone was first released. It was a great step forward for front-end development, arriving in a world of mostly [spaghetti-style](https://en.wikipedia.org/wiki/Spaghetti_code) pure [jQuery](https://jquery.com/) apps. But Backbone wasn't perfect. Its [Views](http://backbonejs.org/#View) were really ViewControllers, [Models](http://backbonejs.org/#Model) had a reference back to their _View_, and its [Events system](http://backbonejs.org/#Events) could and often did tie everything to everything else.

Backbone was still better than what we had before. So we used it. And over the years, libraries like Marionette, [Thorax](http://thoraxjs.org/), and [Chaplin](http://chaplinjs.org/) were released to try and paper over some of its problems.

Meanwhile, in 2013 Facebook releases its groundbreaking React library. As part of the announcement, it talks about a new way to think about application architecture. Instead of MVC, they suggested their Flux pattern. Instead of _Models_ you just have plain data with no behavior bundled with it. Instead of _Controllers_, you have plain application logic. You've still got _Views_, now called React Components.

Compared to Backbone, the differences were especially stark. Instead of events flying everywhere, potentially triggering further events, Flux demanded that events flow in just one direction. With its [dispatcher](https://facebook.github.io/flux/docs/dispatcher.html) in place, one event could not trigger another event. These constraints made applications so much easier to understand!

How reconcile these two? Take what I had learned with Flux and apply it to Marionette!

## Flux style with Marionette

My very first task on the contract was a refactoring to make the app more predictable, while also helping me to understand it more quickly. The idea was to push the application towards a Flux-inspired structure. We'd still have Backbone _Models_, but we'd reduce the number of places where they were modified.

Every page of the Single Page Web App (SPA) was made up of a top-level [Marionette `LayoutView`](http://marionettejs.com/docs/v2.4.4/marionette.layoutview.html). On load, it created the necessary Backbone _Models_ and _Collections_, passed that data into its child _Views_, then kicked off the initial data load from the server. Based on user interaction, child _Views_ would update the UI, modify those _Models_ and _Collections_, kick off a sync with the server, and when the server response came in, _Views_ across the app would re-render based on the new data.

So I began the long process of finding all places where _Models_ or _Collections_ were mutated. Child _View_ code became a [`trigger()`](http://backbonejs.org/#Events-trigger) call that needed to propagate an event all the way to the top level `LayoutView`. This meant a lot of intermediate [`listenTo()`](http://backbonejs.org/#Events-listenTo) and `trigger()` calls up the view tree.

## Unexpected Benefits

In the course of the refactoring, I discovered several lurking bugs involved in cascading data changes. One model would be updated, then based on the result of some logic, another model would be updated and the server would be notified, finally resulting in another model update. Every step was in a different part of the view tree, and every model was being listened to by various views.

After my refactoring, every step was in the same top-level `LayoutView`, making it far easier to understand and debug the asynchronous flow. I fixed a few bugs which were now easy to see. But it still wasn't a clean design, from my perspective. The state space in that asynchronous flow had too many invalid states.

Given that we controlled the API, we could easily get all the data we needed at once, shrinking the client-side state space. But [Backbone's automatic REST wireup](http://backbonejs.org/#API-integration) made us think in very small units, each one requiring its own server endpoint. That then forced the client into flowing data from one _Model_ or _Collection_ to the next.

Backbone had reduced design creativity. The application was stuck in the _Backbone Box_!

## Writing a New Feature

When I was tasked with adding a new 'recent searches' feature, I was sure to avoid the _Backbone Box_. I did use a Backbone _Model_ to store the data and interact with the server, but the structure of its data wasn't a single conceptual 'model,' a set of simple key/value pairs. It was two arrays, each containing full objects.

This was a self-contained system, no involvement from a `LayoutView.` The only mutation to the `RecentSearches` model was in its own `addSearch()` method. A new search would be sent to the new [Express](http://expressjs.com/) endpoint I added, and the entire new set of recent searches would come back from the API. One server request per user search, and every time the local data was replaced with the response. Any subscribed _View_ would re-render.

Simple and easy. No _Collection_ necessary. Easy to reason about. Not a perfectly normalized _Model_, but well-suited to the scenario.

## Writing a New Page

I went further when we introduced an entirely new page to the SPA. Thinking outside the _Backbone Box,_ I did away with Backbone _Models_ when writing some key new UI. Since roundtrips with the server weren't happening in this scenario, I didn't need to lean on Backbone [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) behaviors.

With hard-to-trace event wireup no longer a temptation, it was very easy to reason through what was happening to the data. It was clear which events modified things. And the external interface was clear: data in, and data out. Easy. Later we would pack data into a collection to be rendered by a Marionette `CollectionView.`

It was very clean, and it was very Flux-inspired.

## Still Awkward

Even with all of our progress, I still wasn't comfortable. There are three major areas I really don't like about Marionette.

1. First is the cliff moving from a simple [`ItemView`](http://marionettejs.com/docs/v2.4.5/marionette.itemview.html) to a more complex set of subviews managed by a parent `LayoutView`, a refactor which involves large logic changes and two new files for each new view. That high cost incentivizes large _Views_.

2. Second is the temptation to make little tweaks to the UI with jQuery. In theory, every change to the UI should be a template rendered with data. But it's so much easier to make a tiny change, since jQuery is already there, bundled with Backbone. The temptation is especially strong in a `LayoutView` because you can't actually re-render it. That would blow away all of its child views!

3. Third is the standard state management problem, exacerbated by holdover jQuery/[Bootstrap](http://getbootstrap.com/) techniques. At one point we installed a [Bootstrap collapsible section](http://v4-alpha.getbootstrap.com/components/collapse/) on a page with a chart rendered by [Chart.js](http://www.chartjs.org/). It was supposed to be a simple drop-in change, but if a chart rendered while in a collapsed section, it would render with zero height and be gone when the section was expanded again. Thus, I had to hook into the jQuery/Bootstrap events related to showing a collapsed section, and force re-render of the chart (without animation).

None of these problems exist in the world of React and Flux. The team discovered this when I [designed and delivered React training to them a few months later](/contract-react-training/).

## There's Hope

There's been a lot of [complaining about the high churn](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.tl8uz0cbx) in the front-end development world. But I believe that we are advancing the state of the art. New techniques and libraries aren't just about the flashiness. They really are innovating, and those innovations can be applied to legacy technology.

And that means application development in the future will be much more focused on user value instead of wrestling with the technology. I'm excited.



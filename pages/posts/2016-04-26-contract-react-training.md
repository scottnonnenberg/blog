---
rank: 29
title: 'Contract: React Training'
date: 2016-04-26T17:29:10.448Z
layout: post
path: /contract-react-training/
next: /the-state-of-thehelp/
previous: /practical-gatsby-js/
tags:
  - reactjs
  - javascript
  - software
  - training
  - speaking
  - contract
---

![React.js logo](https://static.sinap.ps/blog/2016/04_apr/react_training/react-logo-rev2.png)

In March I didn't just [give a talk at the Seattle React.js Meetup](/static-site-generation-with-gatsby-js/). I also had a contract to design and present a 10-hour training on [React.js](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), and [React-Router](https://github.com/reactjs/react-router). After last fall's [Social Security Administration (SSA) training contract](/contract-teaching/), it felt quite familiar. I was able to fine-tune my approach. But no matter how many times I do it, there are always surprises.

<div class='fold'></div>

## The Audience

With my SSA contract, I didn't know my audience at all before getting there. All I had was a single response to a questionnaire I had sent, provided by the most advanced developer on the team. That had skewed my content towards the advanced, and several people had trouble keeping up.

This time around I demanded that all attendees answer my questions. I also had the added benefit of having worked on a development contract for the same company in the preceding six months. I had direct experience working with a few of my attendees.

Reading through the survey responses, I was happy to see that I didn't need to break through any buy-in barriers. Nobody had an unfavorable opinion of the technologies to be discussed! And some even had prior experience with React. A nice surprise.

## The Topics

We started from the absolute beginning, the most basic React component you can write:

```javascript
const React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div>We're learning about React today!</div>;
  }
});
```

From this humble origin we progressed all the way to a full Redux [SPA](https://en.wikipedia.org/wiki/Single-page_application) with a [Node.js](https://nodejs.org/) backend, tested with [enzyme](https://github.com/airbnb/enzyme), using [modern](https://babeljs.io/docs/learn-es2015/) [JavaScript](http://www.2ality.com/2016/01/ecmascript-2016.html) [constructs](https://babeljs.io/docs/plugins/preset-stage-0/). Here's the complete outline:

1. React Rendering and Testing
2. Comparison with other frameworks
3. Redux
4. Day 1 Wrap-up
5. React and [Backbone](http://backbonejs.org/)
6. Rounding out React
7. React-Router
8. Foundational tech
9. Next steps
10. Overall Wrap-up

It was particularly challenging to delay discussion of modern JavaScript constructs. I found myself in the strange position of translating quite a bit of Redux-related code to good old [ECMAScript 5](https://en.wikipedia.org/wiki/ECMAScript), because the flow dicated that I wait to cover those particular constructs. I did end up covering [`const`/`let`](https://github.com/lukehoban/es6features#let--const) and [destructuring](https://github.com/lukehoban/es6features#destructuring) in earlier modules, but I saved features like [template strings](https://github.com/lukehoban/es6features#template-strings), [class syntax](https://github.com/lukehoban/es6features#classes), and [rest/spread](https://github.com/lukehoban/es6features#default--rest--spread) for _Module 8: Foundational Tech_.

You'll also note that _Module 5: React and Backbone_ is whole module spent with a competing technology. This is the technology the team had in production, so this module was designed specifically for their scenario. For this module, we worked with the same app from previous modules, this time written in Backbone and ready for translation. A high-fidelity preview of their upcoming conversion!

## The Approach

As always, I provide comprehensive materials which would enable a student to work by themselves if they so desire: exercises and educational resources to assist in completing them. But before I set the students loose on that, I present a little bit: sometimes with slides and almost always with demos. Then I circulate through the room to help each of the students wherever they are in the process.

_Module 5: React and Backbone_ is a good example. I first live-coded the conversion of one Backbone view to a React component, and then set them loose on the exercises. There were two exercises in the module as well as a couple challenge tasks for the folks moving faster. As I made my way through the class, I sometimes helped debug issues, sometimes helped with a configuration issue or two, and sometimes discussed high level questions.

## The Struggle

My goal is to give my students a chance to struggle with the material. I've had a gut sense for this for a while, but I got some encouragement and explicit principles to attach it to at [TEDx Rainier last winter](http://www.tedxrainier.com/events/tedxrainier-2015/). [Dan Finkel](http://mathforlove.com/who-am-i/dan-finkel/) described his very inspiring [Five Principles of Extraordinary Math Teaching](https://www.youtube.com/watch?v=ytVneQUA5-c). He says:

> _"I don't think of myself as a mean person, but I am willing to deny you what you want. Because I know, if I rush to an answer, I will have robbed you of the opportunity to learn. Thinking only happens when we have time to struggle." ([4:42](https://youtu.be/ytVneQUA5-c?t=4m42s))_

And so, I create the space for that struggle: the goal and the tools to get there. And, circulating through the room, I step in when the struggle gets to be too much.

## The Results

It worked out pretty well! Despite a bit of (expected) difficulty with the exercises, one broken filling (my poor tooth!), and a couple bugs in the material, everyone had good things to say:

> _"Scott was a good and effective communicator, and the training was adapted to our particular situation, which was extremely helpful"_

> _"They put you into the deep end without answers, but enough knowledge to figure it out. Although hard at first, I really appreciate it now that I'm finished. It leaves you with much more confidence."_

> _"Scott did an excellent job"_

> _"The order of the topics and the pace were really great"_

## What next?

[Let me know](mailto:scott@nonnenberg.com) if you're interested in training for your team! I'm happy to use Node.js/React.js I curriculum I already have or design it from scratch, but I'll always tune it for your situation. And this can very easily blend into [mob](https://en.wikipedia.org/wiki/Mob_programming) or [pair programming](https://en.wikipedia.org/wiki/Pair_programming), interactive technical Q&A sessions, or mentorship.

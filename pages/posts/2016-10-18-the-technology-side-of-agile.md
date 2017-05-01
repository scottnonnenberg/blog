---
rank: 41
title: The technology side of Agile
date: 2016-10-18T17:54:49.767Z
layout: post
path: /the-technology-side-of-agile/
next: /focus-dev-productivity-tip-2/
previous: /better-async-redux-i18n-and-node-js-versions/
tags:
  - agile
  - software
  - business
---

I've already written about why [_Agile_ is interesting in the first place](/the-why-of-agile/), and [how you might customize its application for your team](/customizing-agile/). The hard truth is that you can't become _Agile_ overnight. People need time to change, and your software needs time to change too.

In this post we'll talk about the technology side of _Agile_. Without deliberate effort, the software project itself with fight you every step of the way.

<div class='fold'></div>

## Enabling confident change

Imagine that the feature you are implementing right now, as soon as it is done, will immediately be in your customers' hands. How does that make you feel? Do you feel worried? Take a second to think about some of the things that might make you feel a little bit better…

Got some ideas? Write them down before you forget!

To me, the core idea is risk management. Any given change might completely block usage, or just disable one scenario. You might lose customers entirely or just get some concerned tweets. And so, the effort spent to verify a bug fix or feature must be balanced against the associated risk.

We know that the benefits of iteration are clear: over time we learn and adapt, tuning features to business and user need. The faster we can do that the better. So, let's mitigate risk to reduce the stress often involved with quick iterative learning.

## Local verifications

As you imagined sending that feature out to customers, the first thing that popped into your mind was probably testing. You can hear the finger-wagging admonitions in in your mind, can't you? All those things you should be doing: Run the tests before you check in! Run tests on your [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) server, so it doesn't just [work on one machine](https://blog.codinghorror.com/the-works-on-my-machine-certification-program/)! Static analysis and [linting](http://eslint.org/), [unit tests](https://en.wikipedia.org/wiki/Unit_testing), deeper tests, automation of the UI itself ([browser](http://www.seleniumhq.org/) or [native app](http://appium.io/)), and so on.

Don't listen to the purists. 100% code coverage for your test suite is a fine goal, but it can hurt in two different directions:

* If you're far from it, it can seem insurmountable. So you don't try.
* Focus on getting to that number can turn off your brain. Especially when dealing with loops or regular expressions, simply touching all lines or branches won't cover the important edge cases. And your assertions need to be well-thought out too, or your tests might never fail!

You need your wits about you when designing good tests. How to approach this problem intelligently? [The 80/20 rule](https://en.wikipedia.org/wiki/Pareto_principle) is worth considering here. How much risk mitigation do you get for a given amount of development and maintenance effort?

If you have to choose one type of testing, make it a full, end-to-end manual test with the real user interface, back-end services, and databases. Probably on a staging server with everything set up just like production. Most projects start with unit tests or small-scale integration tests because they are easily automatable, but these are far less important than the key paths through the app that users care about. Start with manual testing, then automate for increased efficiency over time.

Over time you'll establish a process you can trust. Maybe each pull request comes through with enough validation to be confident that everything still works, with a little bit of manual effort to double-check visuals and edge cases.

## Automated delivery pipeline

Okay now you know that your primary scenarios are in good shape. Now we can start to think about getting updates to users more often. If you're writing a mobile app, you might have an [App Store approval process](https://developer.apple.com/app-store/review/) to get through. Or you call someone from the operations department to do the deploy for you. It's time to make this process more automated.

If you have a Continuous Integration server like [Jenkins](https://jenkins.io/), let's imagine what it might take to get the results of every successful build onto staging servers. Tools like [Ansible](https://www.ansible.com/) or [Capistrano](http://capistranorb.com/), or [CodePush](https://microsoft.github.io/code-push/) for mobile apps made with [React Native](https://facebook.github.io/react-native/), can make deploys quick and easy.

As you get more confident about these processes, you can switch your continuous delivery target to full production servers.

## Planning for change

Now your users are getting more frequent updates. New features are appearing out of nowhere! It helps to have some mechanism to introduce users to these features. The [App Store release notes feature](https://techcrunch.com/2015/09/04/app-release-notes-are-getting-stupid/) isn't enough, now that updates can happen in the background. When will the users ever see that?

Tutorials and walkthroughs are sure to both advertise and educate, but they can interrupt a user's flow.

Slack's What's New widget at the top right of the screen is a good balance. It's unobtrusive unless you're like me - I can't stand red badges! Once you open the What's New pane, most items link to a blog post with comments enabled.

In a similar vein, [my side project when I was at Microsoft](https://scottnonnenberg.com/work/#stark-raving-bits-2010-q-3-to-2011-q-2) had a "Feedback Stars" feature. All over the website, we added little stars to the page. When you clicked on a star, you'd get a popup with a chance to rate the feature it represented, even add a little comment about it. Once we built the core feature, it was easy to use it to get feedback right in the moment.

But don't wait for users to tell you what's happening! Systems like [Graphite](http://graphite.wikidot.com/) and [statsd](https://github.com/etsy/statsd) make it extremely easy to [gather tons of metrics about your application](https://www.youtube.com/watch?v=czes-oa0yik). Now you'll know if signups or other key activities drop off right after a deploy!

It's easy to get data from your servers. You'll need to put a bit more effort into finding tools to collect data from clients: both errors and usage. Try [Errorception](https://errorception.com/) or [New Relic](https://docs.newrelic.com/docs/browser/new-relic-browser/page-load-timing-resources/instrumentation-browser-monitoring) for capturing browser errors, and find a [web analytics provider](https://docs.google.com/spreadsheets/d/157m8cgJsHIRrk29NaQMgoYs0aTw5tD8zFg4ylqmzX38/edit#gid=0) that works for you. On the native side, [Apple collects application crashes](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AnalyzingCrashReports/AnalyzingCrashReports.html) for you, and again there are [lots of analytics players in the mobile space](https://www.quora.com/What-are-the-best-mobile-analytics-tools-for-native-apps).

## Incomplete feature support

So far we've been talking about systems useful for production-ready systems. The trouble is that the bar for production is typically very, very high. It slows things down. But we're interested in reducing risk while also enabling fast iteration.

That's where a whole host of tools for incomplete features come in:

* **[Feature toggles](https://en.wikipedia.org/wiki/Feature_toggle)** - This allows an incomplete feature to be checked into the main branch, and included in production deploys. With the toggle off, they'll affect the application either minimally or not at all.
* **User opt-in/out** - What if you allowed users to toggle features themselves? Imagine working closely with a set of beta users, allowing them to use some of your mid-development features. If you can deploy quickly, you could provide updates to them many times a day.
* **Partial rollout** - Once your beta users are starting to feel good about a feature, don't just roll out to all of your users! Roll out to a small subset of your users, and see what they think. Gradually increase the percentage of your users who can see the new feature. You can even plan your [cohorts](https://en.wikipedia.org/wiki/Cohort_(statistics)) along demographic boundaries, starting with low-risk users.
* **Rollback** - All might not go well. As you increase the percentage of users seeing a new feature, you might find that it causes problems for a certain type of user. You'll want to be sure that you can turn the feature off again, without lasting effects. You might need to explicitly roll the user's data back to its previous state.
* **Side-by-side implementations** - In contrast to the worrying mantra "[Move fast and break things](https://xkcd.com/1428/)," Github has experimented with some techniques to "[move fast & break nothing](https://zachholman.com/talk/move-fast-break-nothing/)." For example, when looking to improve the performance of a feature, they keep the two implementations in place, and test their output and runtime against each other until they can feel confident that the new implementation is ready to replace the old.

A little bit of planning and infrastructure code can go a long way. Each of these reduces risk while also enabling iteration.

## A solid foundation

Get creative! You'll be surprised how much these low-level features change behavior. If you can roll out a mostly-complete feature for just a few customers with an easy avenue for feedback, iteration will just happen naturally! It won't feel like [bushwhacking](http://www.thefreedictionary.com/bushwhacking) to iterate - it will be the main trail!

It's important to think holistically about _Agile_ - sprints can feel pointless if your releases don't actually go out the door afterwards. This infrastructure might even make your sprints seem too long!

---

Now you're ready for my next post in the series: [An _Agile_ organization](/an-agile-organization/). It's easy to be _Agile_ within technical teams, but how to handle other parts of the organization still asking for specific features on specific dates?

Resources:

* A very detailed _Agile_ skill tree by Arlo Belshee: http://arlobelshee.github.io/AgileEngineeringFluency/Stages_of_practice_map.html
* Rolling updates with Ansible: http://docs.ansible.com/ansible/guide_rolling_upgrade.html
* Automated production deployment, with easy rollback: http://martinfowler.com/bliki/BlueGreenDeployment.html
* More tools and techniques for iterative development: https://www.smashingmagazine.com/2016/06/rolling-features-without-hurting-loyal-users/



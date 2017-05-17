---
title: Starting on Signal
date: 2017-05-17T15:30:10.064Z
layout: post
path: /starting-on-signal/
next:
previous: /what-s-a-monad-digging-into-haskell/
tags:
  - career
  - software
  - business
  - javascript
---

I've decided to put away my consultant hat for a while, because I've joined [Open Whisper Systems](https://whispersystems.org/) to work on their [Signal](https://en.wikipedia.org/wiki/Signal_(software)) [Desktop application](https://whispersystems.org/blog/signal-desktop/)! I'm really excited to contribute to such an important mission.

<div class='fold'></div>

> _"I am regularly impressed with the thought and care put into both the security and the usability of this app. It's my first choice for an encrypted conversation."_ - [Bruce Schneier](https://en.wikipedia.org/wiki/Bruce_Schneier)

## What is Signal?

If you're not already one of the millions of people using Signal Private Messenger [for iOS](https://itunes.apple.com/us/app/signal-private-messenger/id874139669) or [for Android](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms), you should start! Unlike text messages or email, it is encrypted so that nobody can snoop on your conversations.

You might be thinking that you don't have that problem, since messages sent with services like [iMessage](https://en.wikipedia.org/wiki/IMessage) or [Facebook Messenger](https://www.messenger.com/) are encrypted when sent across the internet. That's true, but those messages are not encrypted when archived on Apple or Facebook servers. That's how your historical messages reappear when you log into the website and when you set up a new device.

Signal isn't built like that. Its core server component knows next to nothing about its users. Moreover, it cannot understand the messages being passed from one user to another, since it doesn't have the keys to decrypt those messages. Yes, the messages are saved in the client applications themselves, but even those can be eliminated by enabling [disappearing messages](https://whispersystems.org/blog/disappearing-messages/).

On top of all that, the four Signal software projects ([server](https://github.com/WhisperSystems/Signal-Server), [iOS](https://github.com/WhisperSystems/Signal-iOS), [Android](https://github.com/WhisperSystems/Signal-Android), [Desktop](https://github.com/WhisperSystems/Signal-Desktop)) are free and open source, released under[ GPLv3](https://www.gnu.org/licenses/gpl-3.0.html). You can go look at the code now, and verify that your privacy is respected. Or rely on [the third parties who have done that for you](https://www.cyberscoop.com/signal-security-audit-encryption-facebook-messenger-whatsapp/).

> _"Signal is the most scalable encryption tool we have. It is free and peer reviewed. I encourage people to use it everyday."_ - [Laura Poitras](https://en.wikipedia.org/wiki/Laura_Poitras)

## Why the change?

You might be a little confused by this change. After all I did enjoy the independence and variety I had as a free agent! Why would I leave the illustrious world of software consulting?

First, it's not really that illustrious!

Second, It's all about the mission. I've [said before](/why-i-left-liffft/) that "I wanted the goal of my efforts to be a worthy cause, and I wanted my actions to have a clear effect on that cause." I think I've found that with Signal. It is something I want to exist in the world, and I'm honored to be able to focus on it full time.

Those of you with an eagle eye may have noticed that the application is using [Backbone.js](http://backbonejs.org/), not my focus of late, [React.js](https://facebook.github.io/react/). It's not a concern. I have no problem working with older technologies like this. In fact, [I've done it recently](/contract-new-techniques-old-technology/). It's still JavaScript and HTML and CSS, all adding up to the desired user experience. Of course, I will certainly be itching to use at least a few of my [currently-favored](/better-docs-and-static-analysis/) [development](/eslint-part-1-exploration/) [techniques](/better-changelogs-strings-and-paths/).

> _"Use anything by Open Whisper Systems."_ - [Edward Snowden](https://en.wikipedia.org/wiki/Edward_Snowden)

## I'm excited!

It's very cool to be part of the team behind Signal. Because it's small, I'll be responsible for a wider set of tasks than I would otherwise - all packaging and release management, for example. You can watch my progress as I make changes in the [Signal-Desktop project on GitHub](https://github.com/WhisperSystems/Signal-Desktop)! Or [file bugs you discover](https://github.com/WhisperSystems/Signal-Desktop/issues/new) as you [use it](https://support.whispersystems.org/hc/en-us/articles/214507138-How-do-I-install-Signal-Desktop-)!

Now, you're probably wondering - what will happen to this blog? My plan is to continue to post here, but I probably won't include [massive](/what-s-a-monad-digging-into-haskell/) [learning logs](/getting-started-with-elixir/) quite as often. I suspect that I'll talk about the things I'm doing with Signal, since I can link directly to pull requests and commits.

Stay tuned!

---

A little bit more:

* The underlying encryption protocol: https://en.wikipedia.org/wiki/Signal_Protocol
* The original announcement about open-sourcing Signal technology: https://web.archive.org/web/20120731143138/http://www.whispersys.com/updates.html
* Key Open Whisper Systems blog posts:
    * Original iPhone app release announcement https://whispersystems.org/blog/signal/
    * iPhone app gets text messaging capabilities https://whispersystems.org/blog/the-new-signal/
    * Original apps on Android are combined into one https://whispersystems.org/blog/just-signal/
    * Initial Beta announcement of Desktop application https://whispersystems.org/blog/signal-desktop/
    * WhatApp is using Signal protocol https://whispersystems.org/blog/whatsapp/
    * Google's Allo has option to use Signal protocol https://whispersystems.org/blog/allo/
    * Facebook's Messenger has option to use Signal protocol https://whispersystems.org/blog/facebook-messenger/
* EFF talks about how to install and use Signal https://ssd.eff.org/en/module/how-use-signal-ios
* EFF has a secure messaging scorecard, version one: https://www.eff.org/node/82654
* A comprehensive how-to on Signal: https://theintercept.com/2017/05/01/cybersecurity-for-the-people-how-to-keep-your-chats-truly-private-with-signal/


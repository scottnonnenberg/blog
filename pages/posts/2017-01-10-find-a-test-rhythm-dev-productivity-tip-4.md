---
rank: 68
title: "Find a test rhythm (Dev productivity tip #4)"
date: 2017-01-11T01:42:06.133Z
layout: post
path: /find-a-test-rhythm-dev-productivity-tip-4/
next:
previous: /first-listen/
tags:
  - dev-productivity
  - software
---

I've been [told that I'm a very productive developer](https://scottnonnenberg.com/work/#scotts-value-add-is-beyond-mere-lines-of-code-h). And I want you to have my techniques! Welcome to my fourth [developer productivity tip](/tags/dev-productivity/): **Find a test rhythm**.

Stop worrying about test philosophy and start doing. Find a testing technique that works for you and make it into a habit.

<div class='fold'></div>

## Is testing scary?

If you're new to testing, you might be convinced that it's really scary. The hardcore [Test-Driven Development (TDD) folks](http://www.wedotdd.com/) almost act like it's a religion, but you've also got [people who call TDD a "red flag.](http://www.writemoretests.com/2011/09/test-driven-development-give-me-break.html)" Just outside the fray, ["Poorly-written tests can actually be worse than no tests at all"](https://martinfowler.com/articles/testing-culture.html) is a bludgeon of perfectionism to keep you from diving in on either side.

On top of all that philosophical argument there are the deadlines. Impossible deadlines. How can you justify spending time testing when you have project managers breathing down your neck? Testing is easy to dismiss: The code is already working! You just wrote it and painstakingly verified it yourself! Ship it!

## You're already doing it!

Did you catch that? You're already testing! You already _painstakingly verified_ your code!

How? Think about what you do now before you submit a pull request. If you're a web developer,  you make a change, then refresh the browser and click around in the app to verify it. For others, the easiest technique might be to verify behavior via live-coding in a [read-eval-print loop (REPL)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). Or running a command-line tool and inspecting the output.

I like to think of automated testing as taking this effort and making it both repeatable and a little [more rigorous](/be-a-scientist-dev-productivity-tip-3/#rigor).

## The value of testing

Imagine trying to fix a tricky bug six months from now, deep inside the code you just wrote. A year? Two years? If you don't plan to stay at your job that long, [imagine someone new trying to make changes in your code](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjM96LvgLfRAhUIw1QKHW7pAWIQFggcMAA&url=http%3A%2F%2Fthedailywtf.com%2F&usg=AFQjCNETv_WJf9NiC7VH982LdL3oV3PUPQ&sig2=eYCVzkdjaSENfaOt8Z5Wxw). Tests can act as guide rails for future changes, reducing the probability of unintended consequences.

Ultimately, the tests you write are more about tomorrow than they are today, just like the code itself. But tests can still provide a lot of value as you write them. Your tests can catch scenarios you didn't think about or handle perfectly - before you submit the pull request.

And they also can pull you forward into writing the feature in the first place...

## An example

As [a full-stack developer](https://scottnonnenberg.com/work/), I write features which extend from the browser all the way into the database. Here's an example of how I approach this kind of thing:

1. **Implement browser functionality** *(unit tests)* - Because the target user experience is in the browser, [I start there](/web-application-test-strategy/#stage-2-local-application-state) to ensure I have the right data structures and API calls planned.
2. **Wire up API** *(API tests)* - I know exactly what I need, so I can add a skeleton structure, then make sure basic calls can be made.
3. **Implement business logic** *(unit tests)* - I have a good idea of exactly what data will be coming in and out of the API, so I can write the code to manipulate and validate that data.
4. **Change database schema/access** *(integration tests)* - In the process of writing the business logic, my general ideas about the database changes needed became very crisp. I can now update the database schema and write integration tests to validate it and any needed changes to data access code.
5. **Finish API** *(API tests)* - At this point the server side of the changes can be completed. I can write tests to [exercise the API like a user would](/web-application-test-strategy/#stage-1-the-foundation), in a real scenario.
6. **Validate entire scenario** *(manual)* - Everything should come together at this point. In most cases there will be tweaks in the browser: visuals, animations, calling AJAX properly. Sometimes a change propagates all the way down to the database again, and I'll update tests all the way down the stack.
7. **Try to break it** *(manual)* - My tests are usually better at exercising error cases, but it's still worth messing around for a couple minutes.
8. **Browser automation tests** - Depending on how this new feature factors into primary application workflows, it may already be covered by [selenium browser automation](/web-application-test-strategy/#stage-4-automating-a-browser). If not, and the scenario is core to the business, a new selenium test may be justified.
9. **Update manual test script** - [Automated tests can never capture everything](/web-application-test-strategy/#stage-0-real-usage), so a manual test script is important to let the team know about interesting nooks and crannies of the app and how to exercise them.

This seems like quite a bit more effort than the natural approach, right? Why not just make changes up and down the stack at the same time? Well, because I've noticed that when I do that I spend quite a bit of time in debugging mode. I've made changes X, Y, and Z but things aren't working - which one is wrong? Maybe more than one?

I've converted that long tail of manual debugging into something that accrues long-term value for the project. Something that reduces worry when making changes.

This is a large example, but the same is true in the small for just about all code. There's the initial development, and then the debugging process. Tests divide and conquer that process. You can feel confident that X works, then be sure that Y works, and so on - with no worry that your work to finish Y broke X.

## What's the first barrier?

Okay, so it is overwhelming. Even for me. When I think about all the tests required for an entire new feature, it's too much. So the question I like to ask is: *what's the first barrier I can break through?*

For me, in most cases, that very first barrier is to create a test file. For some reason it always feels harder than writing the actual product code. I have to scaffold it all up, then craft the right command-line test command to get the tests to run. If I'm really on the ball and the algorithm is a little more complex than usual, I'll do all that _and_ set up a [`mocha --watch`](https://mochajs.org/#w---watch) run to get a really tight [feedback loop](/the-why-of-agile/#feedback-loops) in place.

Once the test file is ready for the tests, it's natural for me to brainstorm the set of tests that should be in it. Then I start writing them. And so it goes. One step at a time will get you there. The order of operations above is a natural outgrowth of the attitude 'do the next natural thing.'

## Your rhythm

I gave my card to someone recently and they noticed the term TDD on the back. They immediately asked "do you really write all of your tests first?" I had to laugh. Definitely not. That's not what TDD means. It's a much more natural process than that.

Jump in! Do what feels right, using my process above as inspiration. You'll be pleasantly surprised at how smoothly getting more and more detailed with the requirements blends into writing the tests. This is the true meaning of test-driven development. Detailed understanding of the tests helps you [understand the problem](/understand-the-problem-dev-productivity-tip-1/) more deeply, while also making the code required very clear.

Once you've had some of these experiences, you won't want to code without tests. You'll have a new, very helpful habit. You'll have your test rhythm.

Now, with some good experience under your belt, you can even dip your toes into [those fiery test philosophy debates](https://www.reddit.com/r/programming/comments/kq001/testdriven_development_youve_gotta_be_kidding_me/) once more!



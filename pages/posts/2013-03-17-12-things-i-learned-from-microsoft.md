---
rank: 33
title: 12 things I learned from Microsoft
date: 2013-03-17T15:00:00.000Z
layout: post
path: /12-things-i-learned-from-microsoft/
next: /why-i-left-liffft/
previous: /dont-let-this-happen-to-you-lessons-from-a-failed-side-project/
tags:
  - business
  - software
---

Those of you who know me know I've had my frustrations with Microsoft. But I spent eight years of my life there for a reason. I learned a huge amount while I was there. Without further ado, 12 things I learned from Microsoft.

<div class='fold'></div>

### 1. It takes a lot to get software to your customers

When I worked at Hewlett-Packard and Terran Interactive in college, I just wrote code. I wasn't exposed to all that it took to get that code onto users' machines. In my first months as a Program Manager in Microsoft's DevDiv, working on Visual Studio's Debugger, I finally saw everything surrounding that core functionality:

A wide range of testing:

* unit testing, integration testing, internal use ("dogfooding"), performance and stress testing, security "fuzzing," etc.
* Techniques to figure out if features addressed customer needs: usability studies, beta cycles and previews, design reviews.
* Code quality metrics: cyclomatic complexity, code coverage, static analysis.
* Support features: installers, localization, accessibility, the ability to ship patches, etc.

### 2. Specs should have expiration dates

I hadn't really used specs before Microsoft, but I was told that it was the artifact Program Managers produced to enable developers to move forward. I spent a bunch of time in specs early on, but I quickly realized that the real goal was developing a good team understanding of the feature. A spec may be useful to capture the details of particularly complex functionality, but only immediately after it's written. We probably should have included expiration dates in the documents. As it was, we ended up with sharepoint graveyards.

### 3. How to run good meetings

I initially thought that meetings were just a chance for everyone to get in a room together. The right stuff would happen, right? Nope, the group needed guidance and focus. Things would go better if I provided an agenda beforehand, wrote notes live on the projector so there were no misunderstandings, assigned specific action items, and sent notes out afterwards.

Even with this structure the discussion could get off track, so I honed my ability to manage all of those strong personalities. And perhaps more important, I fine-tuned my sense for when and when not to interrupt a discussion. As time went on I introduced a start-of-meeting laugh via [thedailywtf](http://thedailywtf.com/) in one of my weekly meetings, and generally tried to keep the tone light.

### 4. How to speak in front an audience

It started with my little Visual Studio Debugger team, running those meetings. Over time those meetings got bigger and I worked on hiding my nerves and projecting my voice. Less than a year after starting at Microsoft, I spoke about debugger features at TechEd 2004 in San Diego, then again that summer in Amsterdam for TechEd Europe 2004. I'd immerse myself in my subject area, simplify as much as possible, practice the demo over and over and over, then be completely relieved when it was done. I distinctly remember hearing my voice echo off the back of the room in Amsterdam as I did the first of my three sessions.

## Getting into the rhythm...

After nearly two years, I switched to a new role that focused more on project management and less on feature design. I was now working with the entire C# Team, and eventually spending more and more time helping to manage the entire Visual Studio release and other divisional initiatives.

### 5. Feedback loops help address the project management trifecta

Working with team leadership to set schedules and deadlines, I observed very explicit proof for three reliable human behaviors:

1. Tasks always take longer than you expect ([Hofstadtler's Law](http://en.wikipedia.org/wiki/Hofstadter%27s_law))
2. Work will expand to fill the available time ([Parkinson's Law](http://en.wikipedia.org/wiki/Parkinson's_law))
3. People start as late as they possibly can on tasks ([Student Syndrome](http://en.wikipedia.org/wiki/Student_syndrome))

And I discovered that due to these, the emergent behavior between leadership and teams is an arms race of buffers. I believe that people generally don't like missing deadlines, so I did my best to develop feedback loops to allow them to self-correct before it was too late. During planning I'd provide historical bug fix rates to each team to inform their projections. I'd develop automatically updated charts that would show the teams' planned trajectory versus the current state. I'd push each team to rigorously manage risks, since unknowns could easily blow up. It was a constant struggle. Just showing up to someone's office sometimes had an effect.

I later realized that most of our struggles came from the releases as they were structured. Two years between Visual Studio releases, and a large amount of stabilization in each release encouraged those bad behaviors. Why not push those deadlines? You've got months to fix any fallout, right? Some teams did better at this, using agile/iterative techniques. I learned as much as I could from them.

### 6. Pay close attention to debt

It's common to take some shortcuts during the high-tension countdown before deadlines. And technical debt is generally monitored if not prevented. But sometimes debt can come from other places - like bug triage. When rejecting a bug, teams would push it to a future milestone. At the start of the next milestone or release they'd be surprised at the solid week of re-triage required for all of their bugs. I developed charts that would show the net change in bugs in the entire database over the course of a milestone. As you might expect, teams started 'fixing or forgetting.'

### 7. Speaking truth to power

As my projects got bigger, the audience for my project updates became more senior. I was proud about my projects. I had a sense of personal accomplishment when they went well, and happily reported to leadership. When projects had problems, my first instinct was to hide information until things got better. Fortunately my sense of responsibility won out. And I learned that leaders appreciated knowing the bad news sooner rather than later, just like I expected it from my teams. I developed a reputation for "telling it like it is."

### 8. Writing a good email

The best email is no email, of course. Ideally you'd set things up so that people could easily find information when they needed it. But part of running just one of the projects in motion at any given time was keeping it top of mind (again, building those feedback loops toward success). And a weekly email was one of my techniques.

At the top of each email was an executive summary, just a few sentences. Immediately actionable items were just below that. I'd always include a visual schedule for the project, showing where we were on the timeline that week. Further down the email was additional detail, charts and graphs to keep things interesting, and finally links to resources. The bigger the audience, the more likely I'd run it by a colleague for quick check.

## Getting more advanced...

As I advanced in my career at Microsoft, I got better at some of the soft skills. I was given larger, more independent projects to manage, like the Visual Studio 2010 SP1 release and the division-wide Visual Studio Dogfooding Program.

### 9. Get buyoff before the meeting

Early on at Microsoft, I believed that ideas themselves were powerful, and would take hold naturally if they were good enough. In some groups, usually smaller and sympathetic to me, this was mostly true and I needed very little effort to get agreement. In other cases I'd get a lackluster response and the discussion would move to another topic. It was clear: the right way to influence a group was to prepare beforehand. The meeting itself is just a confirmation.

I started pushing my ideas individually or with key smaller and influential groups. I recruited influential folks to be part of my initiatives, usually finding dev and test reps to get a balanced perspective. I developed relationships with people even before there was an idea to push with them. And I won the battle before the meeting.

I have to admit, though, I knew about this one for a long time before finally getting reliable with it. I cut corners when I felt like I didn't have enough time. And that brings us to the next lesson...

### 10. How to manage email and personal productivity

I got a mind-boggling amount of email at Microsoft. Without being part of any of the social discussion lists, I was getting something like 300-400 emails per day. Just dealing with the incoming every day took a substantial amount of time. And I always felt busy and behind.

I realized at one point that I was checking email every five minutes or less. It was a distraction, but a very addictive distraction. I had already disabled Outlook's default new mail notifications, but I was still drawn to the inbox like a trained animal. Some of the emails were valuable, but it was inconsistent. Classic inconsistent reward training. I needed to get outside that Skinner Box.

So, I turned off automatic email downloads - no quick glances at the inbox unread count. I put whitelists and filters in place to restrict my inbox to that which needed attention quickly: if I was on the To or CC line, or mentioned in the email itself, or if it was from my manager or other people I was working with closely. Everything else was checked once a day or less. And I realized that people were okay if I responded in a day instead of five minutes - we had instant messaging and phones if I or they needed things faster. Returning from vacation, with thousands of emails to deal with, was a great opportunity to practice efficient email processing.

A separate task list automatically became my primary focus. I couldn't use my inbox as a task list anymore, because I was only there once or twice a day. It was just me and a pad of paper in my office. I could finally think clearly in all that empty space. And it was magical.

I developed a system of writing down my goals for the week on Monday, and I would keep those in my face all week. When emails came in, I would compare them to the goals I already had in place for the week. I could respond to some emails quickly, others I could move to the next week, and most I could fully drop. I saw much more clearly the highest-value things I could be doing, and I focused on those.

### 11. You can and should be entrepreneurial inside a big company

At this point, I was developing systems for my entire division. And I realized something as I saw the response to my systems. I needed to design initiatives like I would products, addressing both a user need and a business need. The policies and procedures that didn't help users achieve their goals resulted in adherence to the letter of the law if they changed behavior at all.

Prior to the start of coding for my Visual Studio 2010 SP1 release, I brought together a focus group to help design some of the low-level development processes. We were sure to listen closely to what they said they needed. Afterwards, everyone agreed; it made the project go much more smoothly.

### 12. Choose a job that is just past your abilities

Once I started thinking about my fellow employees as independent agents, I noticed patterns. I could get some people to do the things I needed them to do easily, and with others it didn't happen no matter what I did. And this seemed to be correlated with overall job satisfaction and performance.

On one end of the spectrum there were the really senior people, experienced and highly skilled. Despite this, they usually weren't willing to fully jump in to a given problem and get their hands dirty. On the other end there were the really junior people, struggling to be productive. Right in the middle things were good. There I found the happy and motivated people.

I realized that I had followed the pattern too, in various parts of my career. When a job was an opportunity for growth, requiring a skill level just past what I had, it felt like I was propelled forward almost automatically. To this day I have a rule of thumb - if I can't tell you what I've learned in the last two weeks, I know I'm no longer in the right place.

## Whew!

So those are twelve things I learned at Microsoft. I've got quite a few more if you'd like me to talk your ear off. And I still use all of this, so I think my time there was worth it!

---
rank: 2
title: Better Git configuration
date: 2017-04-05T20:25:28.823Z
layout: post
path: /better-git-configuration/
next: /hard-won-lessons-five-years-with-node-js/
previous: /think-in-alternatives-dev-productivity-tip-5/
tags:
  - git
  - software
  - stack-improvements
---

I like [Git](https://git-scm.com/). I use it [all the time](https://github.com/scottnonnenberg/thoughts-system#other-files). As [I sometimes do](/eslint-part-1-exploration/#making-it-my-own), I recently took some time to really dig in, read through documentation, and review my global Git configuration. Welcome to my fourth [stack improvements](/tags/stack-improvements/) post!

<div class='fold'></div>

## It's all Git

I started coding in the [bad old days](/2017-twenty-years-online/) of plain filesystem copies and [Visual SourceSafe](https://en.wikipedia.org/wiki/Microsoft_Visual_SourceSafe) with its exclusive locks on checkout. Even so, back then the concept of source control was so amazing to me I wished I had access to it when coding at home.

Later, at [Cal Poly](http://www.calpoly.edu/), I was exposed to [Concurrent Versions System (CVS)](https://en.wikipedia.org/wiki/Concurrent_Versions_System) as I worked on group projects. There were only so many group projects, so I never got very good at it.

During my [Microsoft](https://www.microsoft.com/) years, I used [Team Foundation Server](https://en.wikipedia.org/wiki/Team_Foundation_Server) for source control during what we called "App Week," where non-developers in Visual Studio would spend a whole week [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) the product to make sure it was ready to ship. But all of my personal programming during that time was with [Subversion](https://en.wikipedia.org/wiki/Apache_Subversion). It was free and easy to run locally. I used it to keep track of all my local changes over time.

Fall of 2010 was when things changed. I learned [Ruby on Rails](http://rubyonrails.org/) to develop [a side project](https://scottnonnenberg.com/work/#stark-raving-bits-2010-q-3-to-2011-q-2), and the comprehensive tutorial I went through covered [Heroku](https://www.heroku.com/) and a new source control system: **Git**. It was amazing - I could treat it like it was hosted locally, but also interact with others. No exclusive locking, full productivity when offline, and intelligent merging. I was hooked.

Since then [Git has truly taken off](https://rhodecode.com/insights/version-control-systems-2016). It is the de facto standard for open source. It is supported by every major player in cloud source code hosting. It is supported by many GUI tools - dedicated source control tools, as well as code editors.

It's important to know, and to know well.

## Global config

Whether you know it or not, you've got global Git configuration. A `.gitconfig` file in your home directory. Most `.gitconfig` files have your name and email, as established by your average ['getting started with Git' tutorial](https://help.github.com/articles/set-up-git/). But there's [so much more configuration available](https://git-scm.com/docs/git-config#_variables) for that file!

My [entire global `.gitconfig` is available via a gist](https://gist.github.com/scottnonnenberg/fefa3f65fdb3715d25882f3023b31c29) with inline comments. Jump directly there if you like, but here we'll talk about each of the sections in a bit more detail.

### Alias

The bread and butter of a custom `.gitconfig` is the [`[alias]` section](https://git-scm.com/docs/git-config#git-config-alias), where you can create your own commands. Feel like something is missing? Add it here! Something doesn't quite work the way you want? Add your own version of it!

* `prune = fetch --prune` - When working on a project where others push branches to the main repository, I end up with lots of random local branches. [Prune](https://git-scm.com/docs/git-fetch#git-fetch--p) deletes any local branch which has been deleted from the remote. It's here because I always forget about it.
* `undo = reset --soft HEAD^` - If I've made a mistake in making a commit, [this command](https://git-scm.com/docs/git-reset) sets things up the way they were before the commit. To be fair, usually I just [amend](https://git-scm.com/docs/git-commit#git-commit---amend) the existing commit in this situation, since that keeps the commit message.
* `stash-all = stash save --include-untracked` - [Stash](https://git-scm.com/docs/git-stash) is extremely useful when someone randomly asks you to check out another branch, but you're right in the middle of something. This command ensures that when you stash, you catch the new files you haven't caught with a `git add` yet.
* `glog = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'` - Commit history shown via the [default `git log`](https://git-scm.com/docs/git-log) is space-inefficient, and doesn't really focus on the most important information. This colorful, graphical display is easier to parse, especially when branching gets complex.

### Merge

`ff = only` ensures that you get an error unless every merge is [fast-forward](https://sandofsky.com/images/fast_forward.pdf). No merge commits, no joining together of two histories, just a smooth progression from commit to commit.

You might be wondering how you'd get real work done doing this! The answer is [`git rebase`](https://git-scm.com/docs/git-rebase), a way to take a branch of the commit tree and attach it to a different part, giving it a new 'base.' [It's an extremely useful tool](https://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/).

It's how I update a pull request when it has conflicts with `master`. Essentially I get a chance to re-apply all of my commits in a future world, where others have made changes. I think it's a better metaphor than "merge everyone else's changes into my changes," which is what you get if you merge the latest `master` into your branch.

This option is great because I will never accidentally create a merge commit. If I intend to create a merge commit I can force that behavior with an explicit [`git merge --ff`](https://git-scm.com/docs/git-merge#git-merge---ff).

`conflictstyle = diff3` gives you a little more information when a merge conflict happens. Normally you get two sections - the intended changes from the 'left' and the intended changes from the 'right.' With [this option](https://git-scm.com/docs/git-config#git-config-mergeconflictStyle) you get a third section, the original changes before 'left' and 'right' tried to change it.

### Commit

`gpgSign = true` ensures that all of your [commits are signed](https://git-scm.com/docs/git-commit#git-commit--Sltkeyidgt) by your [GPG](https://www.gnupg.org/) key. This is generally a good idea because there's no verification of the [user information in your `.gitconfig` file](https://git-scm.com/docs/git-config#git-config-useremail), which means that commits that look like they are from you could easily show up in someone else's pull requests.

In fact, for a contract I once had to use someone else's credentials because account and machine provisioning were taking too long. My pull requests were submitted through someone else's account, but all the commits inside had my real name on them.

You can remove all question about where a commit came from by [adding your public GPG key to your GitHub account](https://help.github.com/articles/adding-a-new-gpg-key-to-your-github-account/). Your signed commits will have [a little "Verified" badge on them](https://github.com/scottnonnenberg/eslint-config-thehelp/pull/5/commits).

_Note:_

* If you have more than one GPG key, you can specify which you'd like to use with the [`user.signingKey` option](https://git-scm.com/docs/git-config#git-config-usersigningKey).
* GUI apps won't necessarily sign your commits even with this option set. You'll need to explore the application's options.
* `gpg-agent` can save your passphrase for a time, making things a little easier. Use it!

### Push

`default = simple` is [an option](https://git-scm.com/docs/git-config#git-config-pushdefault) you probably already have set. It makes it easier to push your local branch to a branch named the same thing in your target remote.

`followTags = true` is quite simple. Instead of manually pushing new tags with `--follow-tags`, you always send your local tags up along with a `git push`. I don't know about you, but once I have tags created locally, I want them included when I push.

### Status

`showUntrackedFiles = all` Normally, when you've added a new directory, but haven't staged it yet with `git add`, your `git status` will just show the directory name. This has tripped me up quite a few times, since a new, large directory shows up as just one line. [This option](https://git-scm.com/docs/git-config#git-config-statusshowUntrackedFiles) shows you all of the files underneath that new directory during a `git status`.

_Note:_ This can make things slower in very large repositories.

### Transfer

`fsckobjects = true` tells Git that you'd like it to do some extra checks when receiving or sending changes. Why do extra checks? You want to be alerted to evidence of data corruption sooner rather than later, right?

_Note:_ This can make transfers a bit slower.

### Diff Tool: icdiff

In addition to the built-in `git diff` command, Git allows you to specify [an external tool to visualize your diffs](https://git-scm.com/docs/git-difftool). This collection of entries sets Git up to use [`icdiff`](https://github.com/jeffkaufman/icdiff) to display the differences between two states of your repository:

```text
[diff]
  tool = icdiff
[difftool]
  prompt = false
[difftool "icdiff"]
  cmd = /usr/local/bin/icdiff --line-numbers $LOCAL $REMOTE
```

You can use it just like normal: `git difftool master branch`

`icdiff` is interesting in that it attempts to replicate colorful, GitHub-style, split diffs right in your console. [A little easier to read](/top-ten-pull-request-review-mistakes/#3-unified-diffs) than the normal chunk-based diff style.

_Note:_

* You might have some difficulty installing `icdiff`. Happily, [there is a simple workaround](https://github.com/jeffkaufman/icdiff/issues/72).
* Keep `git diff` in your back pocket - `icdiff` doesn't seem to handle comparisons against `/dev/null`. For example, try `git difftool --cached` after you've staged a new file.

## Bonus: More revisions!

You type `git checkout master` all the time, right? In that command, `master` is an example of a _[revision](https://git-scm.com/docs/gitrevisions)_, specifically a shorthand referring to the latest commit in the `master` branch. These are the common _revision_ formats:

```bash
# Check out a branch
git checkout branchname

# Check out a remote branch
git checkout remotes/origin/branchname

# Check out a specific commit
git checkout 158e4ef8409a7f115250309e1234567a44341404

# Check out most recent commit for current branch
git checkout HEAD
```

But it turns out that there's a whole language to specify *revisions*. All of these operators apply to any of the nouns used above:

```bash
# ^ means 'first parent commit,' therefore the second-most recent commit in the master branch
git checkout master^

# If it's a merge commit, with more than one parent, this gets the second parent
git checkout master^2

# Same thing as three ^ characters - three 'first-parent' steps up the tree
git checkout master~3

# The first commit prior to a day ago
git checkout master@{yesterday}

# The first commit prior to 5 minutes ago
git checkout master@{5.minutes.ago}
```

You can find the whole set of supported _revision_ formats here: https://git-scm.com/docs/gitrevisions. I was surprised how comprehensive it is!

Remember, you can use a _revision_ with most Git commands. Try this: `git glog master@{10.days.ago}..master`

## Go forth!

Start with my `.gitconfig` or just use it as an inspiration for your own customizations. You could even do a deep-dive like I did - the [command list](https://git-scm.com/docs) and the [list of options](https://git-scm.com/docs/git-config#_variables) are extremely educational.

Make Git maximally useful to you. Comfort with Git leaves more room for the hard bugs and the actual merge conflicts. Dig in!

---

_Some good references:_

* Many [configuration options](https://git-scm.com/docs/git-config#_variables) are better-suited to a specific project. Use the same format inside of your project-specific configuration file: `project-dir/.git/config`
* Get up to date on all the `git log` options: https://git-scm.com/docs/git-log#_options
* Dig into the various Git revision formats: https://git-scm.com/docs/gitrevisions
* Learn about signing commits: https://mikegerwitz.com/papers/git-horror-story
* Customize aliases for fun and profit: https://hackernoon.com/lesser-known-git-commands-151a1918a60
* More about git repository corruption:
    * https://groups.google.com/forum/#!topic/binary-transparency/f-BI4o8HZW0
    * http://git.661346.n2.nabble.com/propagating-repo-corruption-across-clone-td7580504i40.html
* Frustrated with Git's complexity? You're not alone: https://stevebennett.me/2012/02/24/10-things-i-hate-about-git/


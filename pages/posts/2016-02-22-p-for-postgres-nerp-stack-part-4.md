---
title: P for Postgres (NERP stack part 4)
date: 2016-02-22T17:15:11.427Z
layout: post
path: /p-for-postgres-nerp-stack-part-4/
next:
previous: /r-for-react-nerp-stack-part-3/
tags:
  - software
  - nerp-stack
---

Welcome to the fourth and final installment in my series ([Part 1](https://blog.scottnonnenberg.com/n-for-node-js-nerp-stack-part-1/), [Part 2](https://blog.scottnonnenberg.com/e-for-express-nerp-stack-part-2/), [Part 3](https://blog.scottnonnenberg.com/r-for-react-nerp-stack-part-3/)) delving into a new friendly (not [MEAN](http://mean.io/)), and perhaps even dazzling (but not a [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle))) development stack: NERP. Today we take a look at the Pros and Cons of [PostgreSQL](http://www.postgresql.org/).

<div class='fold'></div>

At this point it should be second nature for you, but here it is again. NERP is:

* **N** = [Node.js](https://nodejs.org/)
* **E** = [ExpressJS](http://expressjs.com/)
* **R** = [ReactJS](https://facebook.github.io/react/)
* **P** = [PostgreSQL](http://www.postgresql.org/)

Postgres is a relational database with roots in theoretical database design. Started in 1985, it only gained an understanding of standard SQL 10 years later. Let’s take a look at why it’s a good addition to this development stack.

## Yes or NoSQL?

The last several years have seen the rise of the biggest distributed applications the world has ever seen. [Facebook has over 1.6 billion active users worldwide](http://www.statista.com/statistics/264810/number-of-monthly-active-facebook-users-worldwide/). Twitter, Instagram, and Pinterest are all nearing a half-billion active users. These are very, very large applications.

And people respect the folks working on these applications. The community listens when they talk about ‘web-scale’ and their massively distributed systems. NoSQL comes up in those discussions, because many variants are designed as distributed systems by default. Average folks are convinced. Many now have a go-to NoSQL database they use for all new projects.

I like to think about NoSQL solutions as [highly-optimized systems for specific use cases](http://kkovacs.eu/cassandra-vs-mongodb-vs-couchdb-vs-redis), each with a different set of tradeoffs. Links or no links between items in your DB? Reliability or speed? Complex querying or index-only lookup? That’s fine if you know exactly what you need, but early in your app’s lifetime it’s not easy to know what tradeoffs to make.

A relational database is a good starting choice - it can be tuned in any of these directions. You can easily make arbitrarily complex queries, even without planning for it ahead of time or writing a custom map/reduce. You aren’t paying up-front costs for potential scale far down the road. It’s a good compromise.

## Schema-free or -ful?

On the programming side, the pendulum has swung away from static and strong typing, with the rise of languages like [JavaScript, Ruby, Python, and PHP](https://github.com/blog/2047-language-trends-on-github). Some claim that this makes applications easier to develop, especially in the early high-churn stages of development. I nod along with this until I realize that these people are also not writing tests. I’ve seen [what can happen](/the-dangerous-cliffs-of-node-js/) in a minimally-tested JavaScript codebase.

So you can understand my skepticism when these same people start talking about the benefits of developing against a schema-free database. Maybe you can get away with it for a little bit, just like a large JavaScript app with no tests. But then you’ll learn the hard way that you really need to trust your data, process it with confidence.

I guarantee that if you go schema-free, you will have implicit schemas. They’ll change over time, whether intentionally or due to bugs, and for a while you’ll write little database fix-up scripts when necessary. But you’ll get lazy or forgetful. Eventually you’ll need to [bolt on a real schema](https://github.com/Automattic/mongoose#defining-a-model). The problem is that you’ll have to write and manage it yourself, in your application code.

For a contract, I once brought a company out of schema-free chaos. I implemented for them a versioned API and set of JSON schemas, along with the associated migrations. On a user request, we’d pull data from the database, then perform the appropriate set of migrations based on the API version and the data version (or lack thereof).

You don’t want to do that. A relational database is a good choice because it is built to keep your data clean and consistent. It will even help you catch bugs earlier! And it won’t cost much more. It’s a common misconception that you need to determine your entire schema up front. You can organically grow and modify the schema as needed.

## P for Postgres

Okay, now we’ve laid some good groundwork for this discussion. Let’s get into the details. The M in MEAN is MongoDB, and the M in LAMP is MySQL. We’ll be contrasting Postgres primarily with these two.

## The Pros

What is exactly Postgres good at?

1. Rigorous data guarantees
2. Changing the schema with confidence
3. Flexible license
4. Feature-rich
5. Easy vertical scaling

### 1. Rigorous data guarantees

We already talked about how most NoSQL databases, including MongoDB, don’t have the concept of integrated schemas or transactions to maintain cross-database consistency. And this can cause problems for your business over time. But the surprising thing is that MySQL has some pretty major data rigor challenges, even as a relational database.

First, the [default storage engine in MySQL versions prior to 5.5.5 is MyISAM](https://dev.mysql.com/doc/refman/5.5/en/storage-engine-setting.html). Tables created with [MyISAM](http://dev.mysql.com/doc/refman/5.7/en/myisam-storage-engine.html) will not honor foreign key references, nor transactions as you might expect. Happily, the default is now [InnoDB](http://dev.mysql.com/doc/refman/5.7/en/innodb-storage-engine.html).

Even with the proper storage engine, MySQL seems to have a design ethos of happily letting you shoot yourself in the foot. Table names are case-insensitive sometimes, [depending on the current filesystem and the  `lower_case_table_names` option](http://dev.mysql.com/doc/refman/5.7/en/identifier-case-sensitivity.html). Everything else is always case-insensitive, including [standard string comparisons](http://dev.mysql.com/doc/refman/5.7/en/case-sensitivity.html). MySQL will coerce your data silently, sometimes truncating it, sometimes creating new, fictional data: [you’ll get zero or empty string when data is not provided and the column is marked `not null`](https://www.youtube.com/watch?v=emgJtr9tIME), and [strings can be silently truncated](http://dba.stackexchange.com/questions/34473/what-would-cause-mysql-database-entries-to-be-truncated-to-253-characters). When you change a column type, again you can get implicit truncation of data. And strangely, a divide by zero doesn’t result an error - it results in `null`. Some of this can be [mitigated somewhat with ‘strict SQL mode’](http://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sql-mode-strict) which is not the default, and can still be overridden by a database connection.

It’s more than just the fact that MySQL and MongoDB are weak in this area. Postgres will return errors instead of truncating your data, yes. But it also has features beyond the standard relational `not null` and foreign keys. For example, [check constraints](http://www.postgresql.org/docs/9.5/static/ddl-constraints.html) tell the database to enforce your arbitrary expressions, like `price > 0 and discount < 100.0`. With Postgres, your data can be as clean and consistent as you need it to be.

### 2. Changing the schema with confidence

MongoDB doesn’t have a schema, so adding a field is extremely easy. Including a default value with that new field, however, is a code-change in your application.

In a relational database, you can modify your database with the `alter table` statement. Easy. Except that MySQL users have learned to fear this process a bit. First, it’s slow. For a simple `add` or `remove column`, even with no default value, the entire table is copied. And if your table is large, this takes a long time. Additionally, [until MySQL 5.6/InnoDB](https://blogs.oracle.com/mysqlinnodb/entry/online_alter_table_in_mysql), adding an index would lock the table for updates. This is why [Braintree Payments moved from MySQL to Postgres](https://www.pgrs.net/wp-content/uploads/2011/03/pgeast_presentation.pdf).

Postgres schema updates [can be very fast](http://www.postgresql.org/docs/9.5/static/sql-altertable.html#AEN72334) and [non-locking](http://www.postgresql.org/docs/9.1/static/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY), but the big difference is that they can also be run inside of a transaction. Error 10 steps into a big migration? Just roll back. Conversely, [MySQL implicitly commits any existing transaction on most schema-change operations](http://dev.mysql.com/doc/refman/5.7/en/implicit-commit.html). With Postgres, you can remove the fear of change, slowly and organically updating your database schema over time.

### 3. Flexible license

In our 'get started right now' world, it's easy to turn off your brain when you see the term open source. Just follow the directions in the tutorial, install it via `apt` or `yum` and start building. Yes, most of the time this is okay, because most open-source licenses just disclaim liability.

But in the the case of MySQL, Oracle maintains [a number of editions](http://www.mysql.com/products/) and an [unusual dual-licensing setup for the Community Edition](http://www.mysql.com/about/legal/licensing/oem/). In some situations, even with MySQL Community Edition, you may need to upgrade to a commercial license. [MongoDB is a bit more clear](https://www.mongodb.org/licensing) - their [AGPL license](http://www.gnu.org/licenses/agpl-3.0.html) just requires your changes to the server and tools to be contributed back to the community.

Postgres has [something similar to that familiar MIT-style license](http://www.postgresql.org/about/licence/). It’s mostly about disclaiming liability and ensuring that you include the original copyright notice and license. You can even include it in a closed-source proprietary product if you want. No worries, no need for advice from your lawyer.

### 4. Feature-rich

MongoDB is a very lightweight little server, with minimal querying ability. It doesn’t support links between items, and therefore all joins must be done in your application. You’ll find yourself writing a lot of basic functionality like this yourself. For example, if you’d like to do a case-insensitive search, you’ll have to generate a field with a lowercase version of the target data whenever an item changes. Need a complex query? Time for a [custom map/reduce](https://docs.mongodb.org/manual/core/map-reduce/).

MySQL has a far larger surface area, with its standard relational database functionality - relationships between tables and associated join queries. Instead of custom code, you’ll be crafting SQL queries to support your business requirements.

Postgres really shines here. It has the ability to store raw JSON into a column, so you can go schema-free like MongoDB if you really want. And [it has a lot more types](http://www.postgresql.org/docs/9.5/static/datatype.html) than MySQL: geometric types, various network address types, UUIDs, etc. And you can create your own [composite types](http://www.postgresql.org/docs/9.5/static/rowtypes.html) from these.

On top of all that, Postgres is deeply extensible. The first plugin people mention when talking about Postgres is [PostGIS](http://postgis.net/), which provides excellent support for spatial data. Though you can start smaller: you can run [any number of languages inside of Postgres](http://www.postgresql.org/docs/9.1/static/server-programming.html): PL/Perl, PL/Python, even [PL/v8 to run JavaScript](http://pgxn.org/dist/plv8/doc/plv8.html). And you can pull data directly from any number of external data sources with [Foreign Data Wrappers](https://wiki.postgresql.org/wiki/Foreign_data_wrappers).

### 5. Easy vertical scaling

Say you have an initial version of your application built on Postgres, and it starts to get popular. By [tuning your configuration](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server) and adding more memory, disk, and CPU power, you can keep up for quite some time. Depending on your specific use cases, potentially into the millions of users. Either way, you’ll see the need to move to horizontal scaling coming, and have ample time to develop [a transition plan](http://highscalability.com/blog/2012/4/16/instagram-architecture-update-whats-new-with-instagram.html).

## The Cons

Now, what do we need to consider before jumping in?

1. Performance
2. Requires understanding of SQL
3. Difficult horizontal scaling
4. Less widely-known than MySQL

### 1. Performance

It’s true, for simple primary key lookups, [MySQL is faster than Postgres](http://dba.stackexchange.com/a/49062) due to InnoDB’s index-ordered tables. In other scenarios, with MySQL you have the option of tuning not just the query and the machine resources, but also the storage engine for the table in question. For example, you could [move to MyISAM and drop transaction support and foreign keys to improve performance](http://www.xaprb.com/blog/2006/07/04/how-to-exploit-mysql-index-optimizations/). [Mongo is also faster than Postgres for gets](https://www.arangodb.com/2015/10/benchmark-postgresql-mongodb-arangodb/), since it is entirely designed around id-based lookup.

However, in general [Postgres seems to be faster than MySQL when dealing with more complex queries](http://dba.stackexchange.com/a/49235). And EnterpriseDB, an organization heavily invested in Postgres, [did a bulk import test ](http://www.enterprisedb.com/postgres-plus-edb-blog/marc-linster/postgres-outperforms-mongodb-and-ushers-new-developer-reality)[where](http://www.enterprisedb.com/postgres-plus-edb-blog/marc-linster/postgres-outperforms-mongodb-and-ushers-new-developer-reality)[ Postgres beat out MongoDB](http://www.enterprisedb.com/postgres-plus-edb-blog/marc-linster/postgres-outperforms-mongodb-and-ushers-new-developer-reality)!

The good news is that the systems aren’t too different from each other here. Relatively small performances advantages scenario to scenario. And [Postgres has powerful tools](http://www.postgresql.org/docs/9.5/static/using-explain.html) to help you understand the reasons behind a query’s performance. Lastly, if necessary, for a particularly hot spot in your application, you could always start caching upstream from the database.

### 2. Requires understanding of SQL

MongoDB you can just pick up and go. [Inject some data then call `find()`](https://docs.mongodb.org/getting-started/shell/query/). You’re querying! Relational databases require a little more effort. You have to get to know them a little bit before you jump into a relationship. Unless you have a history with SQL syntax, this will take some [focused effort](https://www.codecademy.com/learn/learn-sql).

### 3. Difficult horizontal scaling

While MongoDB isn’t a fully distributed system like [Riak](https://en.wikipedia.org/wiki/Riak), it does have built-in support for [sharding](https://docs.mongodb.org/v3.0/core/sharding-introduction/) and [replication](https://docs.mongodb.org/v3.0/core/replication-introduction/). Sharding spreads one database across N read/write nodes, each with a segment of the database. Replication stores a copy of the database, often updated in real-time, on non-primary nodes, each ready to take the place of the master when needed. In theory, using both of these techniques, Mongo can [scale to billions of users](https://docs.mongodb.org/manual/reference/limits/).

On the relational database side, the biggest challenge is cross-table relationships. If your data is in segments spread across N nodes, how would you support a query with reasonable performance? Replication is the standard solution: a number of read-only nodes receiving replication updates from the master, each with enough information to run a full query locally. This kind of replication helps in any read-heavy scenario, and is supported out of the box both by [Postgres](http://www.postgresql.org/docs/9.5/static/high-availability.html) and [MySQL](http://dev.mysql.com/doc/refman/5.7/en/replication.html).

Sharding for relational databases takes a lot of custom work. But people are doing it. [Instagram, with their hundreds of millions of users, stores their data in Postgres shards](http://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram).

The fact is that scaling is always difficult. When your application starts getting that big, you’ll likely start pulling parts of the application apart: some data in a relational database, another set in a write-heavy logging-like datastore, and targeted data in very fast caches.

### 4. Less widely-known than MySQL

Okay, maybe you’re starting to think about going with a relational database. You look around for experts, and find only developers with MySQL experience. It’s true, MySQL has been [the biggest open-source database player for quite some time](https://www.google.com/trends/explore#q=mysql%2C%20postgresql%2Bpostgres%2C%20mongodb&cmpt=q&tz=Etc%2FGMT%2B8).

It’s fair. For a very long time MySQL was substantially faster and more fully-featured. For example, [Windows support arrived with Postgres 8.0 in 2005](https://en.wikipedia.org/wiki/PostgreSQL#Release_history)! And [replication support in the box took until 2010](http://peter.eisentraut.org/blog/2015/03/03/the-history-of-replication-in-postgresql/). The lack of feature parity is over, but we’ll be feeling its effects for a long time.

Lastly, there are quite a few things to know, [moving from MySQL to Postgres](https://en.wikibooks.org/wiki/Converting_MySQL_to_PostgreSQL). It’s not a drop-in replacement.

## Conclusion: Prefer Postgres

Scale is the buzzword of the moment: is it ready for web-scale? And on the flipside, agility is hot: does it support rapid prototyping? Ultimately, I think Postgres can take you from humble prototype all the way through millions of customers. You’ll get good performance and a lot of features, all without much work. Your data will be clean and consistent as you adapt your schema over time.

And as you slowly grow towards billions of users, you’ll come up with creative ways for dealing with that kind of mega-scale. Just make sure you have a business model by then!

## It’s all NERP from here, folks!

Well, that’s all four technologies of NERP, each justified, each an exciting building block for modern applications. I can’t wait to see the first application proudly displaying its NERP credentials. Or maybe it was all for fun, and you should choose the right technology for your specific situation. :0)

---


Additional reading:

* If you have a well-understood, specialized data scenario, here’s a high-level guide to your main NoSQL options: http://kkovacs.eu/cassandra-vs-mongodb-vs-couchdb-vs-redis
* MongoDB lessons-learned articles:
    * http://www.sarahmei.com/blog/2013/11/11/why-you-should-never-use-mongodb/
        * "I’ve heard many people talk about dropping MongoDB in to their web application as a replacement for MySQL or PostgreSQL. There are no circumstances under which that is a good idea. Schema flexibility sounds like a great idea, but the only time it’s actually useful is when the structure of your data has no value. If you have an implicit schema — meaning, if there are things you are expecting in that JSON — then MongoDB is the wrong choice."
    * http://svs.io/post/31724990463/why-i-migrated-away-from-mongodb
        * "guess which problem you are more likely to have - needing joins, or scaling beyond facebook?"
        * "I can only come to the conclusion that mongodb is a well-funded and elaborate troll."
    * http://developer.olery.com/blog/goodbye-mongodb-hello-postgresql/
        * "The core problem here wasn’t just that our database was acting up, but also that whenever we’d look into it there was absolutely no indication as to what was causing the problem."
* Comprehensive Postgres/MySQL comparisons
    * http://insights.dice.com/2015/03/19/why-i-choose-postgresql-over-mysqlmariadb/
    * https://www.quora.com/What-are-pros-and-cons-of-PostgreSQL-and-MySQL
    * http://stackoverflow.com/questions/110927/would-you-recommend-postgresql-over-mysql
    * http://www.wikivs.com/wiki/MySQL_vs_PostgreSQL
* Postgres/MongoDB comparisons
    * https://www.airpair.com/postgresql/posts/sql-vs-nosql-ko-postgres-vs-mongo#r13
    * http://rhaas.blogspot.com/2014/04/why-clock-is-ticking-for-mongodb.html
* Postgres:
    * versus the world https://www.compose.io/articles/what-postgresql-has-over-other-open-source-sql-databases/
    * Mutating schema at scale: https://www.pgrs.net/2014/05/14/safe-operations-for-high-volume-postgresql/
* Geeking out about databases:
    * http://www.xaprb.com/blog/2015/05/25/what-makes-a-solution-mature/
    * [http://www.xaprb.com/blog/2014/12/08/](http://www.xaprb.com/blog/2014/12/08/eventual-consistency-simpler-than-mvcc/)[eventual-consistency-simpler-than-mvcc](http://www.xaprb.com/blog/2014/12/08/eventual-consistency-simpler-than-mvcc/)[/](http://www.xaprb.com/blog/2014/12/08/eventual-consistency-simpler-than-mvcc/)
    * "Transactions: myths, surprises and opportunities" by Martin Kleppmann at StrangeLoop 2015 https://www.youtube.com/watch?v=5ZjhNTM8XU8

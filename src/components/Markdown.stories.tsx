import * as React from 'react';
import Markdown from './Markdown';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('src/components/Markdown', module);

stories.add('Basic HTML', () => <Markdown html={basicHTML} />);

stories.add('With Nested List', () => <Markdown html={withNestedList} />);

stories.add('With Quote', () => <Markdown html={withQuote} />);

stories.add('With Javascript', () => <Markdown html={withJavascript} />);

stories.add('With Language Text', () => <Markdown html={withLanguageText} />);

stories.add('With iFrame', () => <Markdown html={withIFrame} />);

stories.add('With Table', () => <Markdown html={withTable} />);

// From post 'The technology side of Agile'
const basicHTML = `
<!-- Styles injected by our markdown handling; does the right thing with anchor links on hover -->
<style>
    .anchor.before {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      padding-right: 4px;
    }
    .anchor.after {
      display: inline-block;
      padding-left: 4px;
    }
    h1 .anchor svg,
    h2 .anchor svg,
    h3 .anchor svg,
    h4 .anchor svg,
    h5 .anchor svg,
    h6 .anchor svg {
      visibility: hidden;
    }
    h1:hover .anchor svg,
    h2:hover .anchor svg,
    h3:hover .anchor svg,
    h4:hover .anchor svg,
    h5:hover .anchor svg,
    h6:hover .anchor svg,
    h1 .anchor:focus svg,
    h2 .anchor:focus svg,
    h3 .anchor:focus svg,
    h4 .anchor:focus svg,
    h5 .anchor:focus svg,
    h6 .anchor:focus svg {
      visibility: visible;
    }
</style>
<!-- Generated from markdown -->
<h2 id="a-solid-foundation" style="position:relative;"><a href="#a-solid-foundation" aria-label="a solid foundation permalink" class="anchor before"><svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>A solid foundation</h2>
<p>Get creative! You’ll be surprised how much these low-level features change behavior. If you can roll out a mostly-complete feature for just a few customers with an easy avenue for feedback, iteration will just happen naturally! It won’t feel like <a href="http://www.thefreedictionary.com/bushwhacking">bushwhacking</a> to iterate - it will be the main trail!</p>
<p>It’s important to think holistically about <em>Agile</em> - sprints can feel pointless if your releases don’t actually go out the door afterwards. This infrastructure might even make your sprints seem too long!</p>
<hr>
<p>Now you’re ready for my next post in the series: <a href="/an-agile-organization/">An <em>Agile</em> organization</a>. It’s easy to be <em>Agile</em> within technical teams, but how to handle other parts of the organization still asking for specific features on specific dates?</p>
`;

// From post 'Getting started with Elixir'
const withNestedList = `
<p><em>Resources:</em></p>
<ul>
<li>The excellent Elixir getting started tutorial: <a href="http://elixir-lang.org/getting-started/introduction.html">http://elixir-lang.org/getting-started/introduction.html</a></li>
<li>
<p>Elixir APIs:</p>
<ul>
<li>Docs: <a href="https://hexdocs.pm/elixir">https://hexdocs.pm/elixir</a></li>
<li>Source: <a href="https://github.com/elixir-lang/elixir/tree/master/lib/elixir/lib">https://github.com/elixir-lang/elixir/tree/master/lib/elixir/lib</a></li>
</ul>
</li>
<li>
<p>Erlang APIs:</p>
<ul>
<li>Docs: <a href="http://erlang.org/doc/apps/kernel/index.html">http://erlang.org/doc/apps/kernel/index.html</a></li>
<li>Source: <a href="https://github.com/erlang/otp/tree/master/lib/kernel/src">https://github.com/erlang/otp/tree/master/lib/kernel/src</a></li>
</ul>
</li>
<li><code>GenServer</code> and <code>Supervisor</code> cheat sheets: <a href="https://github.com/benjamintanweihao/elixir-cheatsheets">https://github.com/benjamintanweihao/elixir-cheatsheets</a></li>
<li>
<p>Related tools:</p>
<ul>
<li>Mix task runner: <a href="https://hexdocs.pm/mix/">https://hexdocs.pm/mix/</a></li>
<li>Hex package registry: <a href="https://hex.pm/">https://hex.pm/</a></li>
<li>ExUnit test runner: <a href="https://hexdocs.pm/ex_unit/">https://hexdocs.pm/ex_unit/</a></li>
<li>ExDoc documentation generator: <a href="https://github.com/elixir-lang/ex_doc">https://github.com/elixir-lang/ex_doc</a></li>
</ul>
</li>
<li>Huge list of Elixir/Erlang libraries: <a href="https://github.com/h4cc/awesome-elixir">https://github.com/h4cc/awesome-elixir</a></li>
<li>
<p>The high level:</p>
<ul>
<li>What’s the next big language? Javascript? Elixir? <a href="http://lebo.io/2015/03/02/steve-yegges-next-big-language-revisited.html">http://lebo.io/2015/03/02/steve-yegges-next-big-language-revisited.html</a></li>
<li>“I didn’t have this much fun programming on the server since I initially discovered django.” <a href="https://dvcrn.github.io/elixir/clojure/clojurescript/2016/01/22/sweet-sweet-elixir.html">https://dvcrn.github.io/elixir/clojure/clojurescript/2016/01/22/sweet-sweet-elixir.html</a></li>
<li>Comparing Elixir and Go <a href="https://blog.codeship.com/comparing-elixir-go/">https://blog.codeship.com/comparing-elixir-go/</a></li>
<li>Comparing Elixir and Clojure <a href="https://www.quora.com/Functional-Programming-Why-choose-Clojure-over-Elixir">https://www.quora.com/Functional-Programming-Why-choose-Clojure-over-Elixir</a></li>
<li>Using it in production, coming from Ruby: <a href="http://blog.carbonfive.com/2016/08/08/elixir-in-the-trenches/">http://blog.carbonfive.com/2016/08/08/elixir-in-the-trenches/</a></li>
</ul>
</li>
<li>
<p>Newsletters:</p>
<ul>
<li><a href="http://plataformatec.com.br/elixir-radar">http://plataformatec.com.br/elixir-radar</a></li>
<li><a href="https://elixirweekly.net/">https://elixirweekly.net/</a></li>
</ul>
</li>
</ul>
`;

// From post 'Starting on Signal'
const withQuote = `
<blockquote>
<p><em>“I am regularly impressed with the thought and care put into both the security and the usability of this app. It’s my first choice for an encrypted conversation.”</em> - <a href="https://en.wikipedia.org/wiki/Bruce_Schneier">Bruce Schneier</a></p>
</blockquote>`;

// From post 'Breaking the Node.js Event Loop'
const withJavascript = `
<pre><code class="hljs language-javascript"><span class="hljs-keyword">var</span> <span class="hljs-keyword">async</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">'async'</span>);
<span class="hljs-keyword">var</span> toobusy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'toobusy-js'</span>);

<span class="hljs-keyword">var</span> LAUNCH_DELAY = <span class="hljs-number">10</span>; <span class="hljs-comment">// 100 requests/second</span>
<span class="hljs-keyword">var</span> SYNC_WORK = <span class="hljs-number">8</span>; <span class="hljs-comment">// 8ms of synchronous work per task</span>
<span class="hljs-keyword">var</span> TASK_DELAY = <span class="hljs-number">20</span>;

<span class="hljs-keyword">var</span> concurrent = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> completed = <span class="hljs-number">0</span>;

<span class="hljs-keyword">var</span> doSyncWork = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  <span class="hljs-keyword">while</span> (now.getTime() - start.getTime() &lt; SYNC_WORK) {
    now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  }
};

<span class="hljs-keyword">var</span> doTask = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  concurrent += <span class="hljs-number">1</span>;

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    concurrent -= <span class="hljs-number">1</span>;
    completed += <span class="hljs-number">1</span>;
    doSyncWork();
  }, TASK_DELAY);
};

<span class="hljs-keyword">var</span> writeStatus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'lag:'</span>, toobusy.lag());
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">' concurrent:'</span>, concurrent);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  completed:'</span>, completed);
  completed = <span class="hljs-number">0</span>;
};

setInterval(writeStatus, <span class="hljs-number">250</span>);

<span class="hljs-keyword">var</span> previous;

<span class="hljs-keyword">var</span> go = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">var</span> count = <span class="hljs-number">1</span>;

    <span class="hljs-keyword">if</span> (previous) {
      <span class="hljs-comment">// replicating lots of events coming in while event loop blocked</span>
      <span class="hljs-keyword">var</span> delta = now.getTime() - previous.getTime();
      count = <span class="hljs-built_in">Math</span>.floor(delta / LAUNCH_DELAY);
    }

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; count; i+= <span class="hljs-number">1</span>) {
      doTask();
    }

    previous = now;
    go();
  }, LAUNCH_DELAY);
};

go();</code></pre>`;

// From post 'Breaking the Node.js Event Loop'
const withLanguageText = `<pre><code class="language-text">writeInterval: -
writeInterval: 141ms
getFile: start
getFile: done, 1ms
writeInterval: 104ms
writeInterval: 106ms
getFile: start
doSyncWork: start
doSyncWork: done
writeInterval: 1047ms
getFile: done, 1000ms
writeInterval: 102ms
writeInterval: 104ms
writeInterval: 104ms
writeInterval: 106ms
</code></pre>`;

// From post 'Breaking the Node.js Event Loop'
const withIFrame = `
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/bMHB6zb9AXY?start=904"
  frameborder="0"
  allowfullscreen
></iframe>`;

// From post 'ESLint Part 3: Analysis'
const withTable = `
<table>
  <tbody><tr>
    <td></td>
    <td><a href="https://github.com/feross/eslint-config-standard">"Standard"</a></td>
    <td><a href="https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb">AirBnB</a></td>
    <td><a href="https://github.com/google/eslint-config-google">Google</a></td>
    <td><a href="https://github.com/walmartlabs/eslint-config-defaults">defaults</a></td>
    <td><a href="https://github.com/walmartlabs/eslint-config-defaults/blob/a464fed3c0d13e10b3c1f2f8a49298966658b325/configurations/walmart/es6-react.js">Walmart</a></td>
    <td><a href="https://github.com/indentline/eslint-config-indent">indent</a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/scottnonnenberg/eslint-config-thehelp">thehelp</a></td>
    <td>28%</td>
    <td>42%</td>
    <td>38%</td>
    <td>10%</td>
    <td>38%</td>
    <td>72%</td>
  </tr>
  <tr>
    <td>indent</td>
    <td>29%</td>
    <td>41%</td>
    <td>43%</td>
    <td>10%</td>
    <td>38%</td>
    <td>↵</td>
  </tr>
  <tr>
    <td>Walmart</td>
    <td>39%</td>
    <td>39%</td>
    <td>39%</td>
    <td>21%</td>
    <td>↵</td>
    <td></td>
  </tr>
  <tr>
    <td>defaults</td>
    <td>22%</td>
    <td>14%</td>
    <td>17%</td>
    <td>↵</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Google</td>
    <td>52%</td>
    <td>40%</td>
    <td>↵</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AirBnB</td>
    <td>39%</td>
    <td>↵</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</tbody></table>`;

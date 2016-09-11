/* eslint-disable import/no-commonjs, no-invalid-this */

import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';
// eslint-disable-next-line import/extensions
import hljs from 'highlight.js';
import objectAssign from 'object-assign';
import markdownItAnchor from 'markdown-it-anchor';

function highlight(str, lang) {
  if (lang === 'text') {
    return str;
  }

  if (lang !== null && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    }
    catch (_error) {
      // eslint-disable-next-line no-console
      console.error(_error.stack);
    }
  }
  try {
    return hljs.highlightAuto(str).value;
  }
  catch (_error) {
    // eslint-disable-next-line no-console
    console.error(_error.stack);
  }
  return '';
}

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});

md.use(markdownItAnchor);

function loader(content) {
  this.cacheable();
  const meta = frontMatter(content);
  const body = md.render(meta.body);
  const result = objectAssign({}, meta.attributes, {
    body,
  });
  this.value = result;
  return `module.exports = ${JSON.stringify(result)}`;
}

module.exports = loader;

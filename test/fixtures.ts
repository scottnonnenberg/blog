import moment from 'moment';

const previous = {
  fields: {
    slug: 'previous-slug',
  },
  frontmatter: {
    title: 'Previous Title',
    date: moment().subtract(1, 'day').toJSON(),
    rank: 2,
  },
  html:
    "<p>Previous <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const current = {
  fields: {
    slug: 'current-slug',
  },
  frontmatter: {
    title: 'Current Title',
    date: moment().toJSON(),
    tags: ['tag1', 'tag2'],
  },
  html:
    "<p>Current post with <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const next = {
  fields: {
    slug: 'next-slug',
  },
  frontmatter: {
    title: 'Next Title',
    date: moment().add(1, 'day').toJSON(),
  },
  html:
    "<p>Next <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};

const lastYear = {
  fields: {
    slug: 'last-year-slug',
  },
  frontmatter: {
    title: 'Last Year Title',
    date: moment().subtract(1, 'year').toJSON(),
    rank: 1,
  },
  html:
    "<p>This is some <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};

export const posts = {
  previous,
  current,
  next,
  lastYear,
};

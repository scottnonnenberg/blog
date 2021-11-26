const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

// Not always true, but good enough for these tests
const YEAR = 365 * DAY;

const now = new Date();
const yesterday = new Date(Date.now() - HOUR);
const tomorrow = new Date(Date.now() + HOUR);
const nextYear = new Date(Date.now() + YEAR);

const previous = {
  fields: {
    slug: 'previous-slug',
    relativePath: 'posts/previous-slug',
  },
  frontmatter: {
    title: 'Previous Title',
    date: yesterday.toJSON(),
    rank: 2,
  },
  htmlPreview: '<p>Previous post with <b>real</b> HTML! Above the fold</p>',
  textPreview: 'Previous post with real HTML! Above the fold',
  html: "<p>Previous post with <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const current = {
  fields: {
    slug: 'current-slug',
    relativePath: 'posts/current-slug',
  },
  frontmatter: {
    title: 'Current Title',
    date: now.toJSON(),
    tags: ['tag1', 'tag2'],
  },
  htmlPreview: '<p>Current post with <b>real</b> HTML! Above the fold</p>',
  textPreview: 'Current post with real HTML! Above the fold',
  html: "<p>Current post with <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};
const next = {
  fields: {
    slug: 'next-slug',
    relativePath: 'posts/next-slug',
  },
  frontmatter: {
    title: 'Next Title',
    date: tomorrow.toJSON(),
  },
  htmlPreview: '<p>Next post with <b>real</b> HTML! Above the fold</p>',
  textPreview: 'Next post with real HTML! Above the fold',
  html: "<p>Next post with <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};

const lastYear = {
  fields: {
    slug: 'last-year-slug',
    relativePath: 'posts/last-year-slug',
  },
  frontmatter: {
    title: 'Last Year Title',
    date: nextYear.toJSON(),
    rank: 1,
  },
  htmlPreview: '<p>Last year post with <b>real</b> HTML! Above the fold</p>',
  textPreview: 'Last year post with real HTML! Above the fold',
  html: "<p>Last year post with real <b>real</b> HTML! Above the fold</p><div class='fold'></div><p>Below this is a second paragraph</p>",
};

export const posts = {
  previous,
  current,
  next,
  lastYear,
};

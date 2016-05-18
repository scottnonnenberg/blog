import mock from 'mock-require';


mock('gatsby-helpers', {
  prefixLink: link => link,
});

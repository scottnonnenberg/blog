import loadPosts from '../utils/loadPosts';
import buildFeeds from '../utils/buildFeeds';

const posts = loadPosts({
  limit: 20
});

buildFeeds(posts);

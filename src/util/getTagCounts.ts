import type { PostType } from 'src/types/Post';

export function getTagCounts(
  posts: Array<PostType>
): Array<{ tag: string; count: number }> {
  const countByTag = posts.reduce<Record<string, number>>((counts, post) => {
    const tags = post.frontmatter?.tags ?? [];
    tags.forEach(tag => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });
    return counts;
  }, {});

  return (
    Object.entries(countByTag)
      .map(([tag, count]) => ({ tag, count }))
      // We want this in descending order...
      .sort((left, right) => right.count - left.count)
  );
}

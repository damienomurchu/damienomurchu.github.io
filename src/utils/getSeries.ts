import type { CollectionEntry } from "astro:content";

export type SeriesPost = CollectionEntry<"posts">;

export type Series = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  posts: SeriesPost[];
};

/**
 * Builds the series directory from the posts being published and fails fast
 * when cross-post metadata cannot produce an unambiguous reading order.
 */
export function getSeries(posts: SeriesPost[]): Series[] {
  const grouped = new Map<string, SeriesPost[]>();

  for (const post of posts) {
    const series = post.data.series;
    if (!series) continue;

    const entries = grouped.get(series.id) ?? [];
    entries.push(post);
    grouped.set(series.id, entries);
  }

  return [...grouped.entries()]
    .map(([id, entries]) => {
      const orderedPosts = entries.toSorted(
        (a, b) => a.data.series!.order - b.data.series!.order
      );
      const orders = new Map<number, string>();

      for (const post of orderedPosts) {
        const order = post.data.series!.order;
        const existing = orders.get(order);
        if (existing) {
          throw new Error(
            `Series "${id}" uses order ${order} in both "${existing}" and "${post.id}".`
          );
        }
        orders.set(order, post.id);
      }

      const firstPost = orderedPosts.find(
        post => post.data.series!.order === 1
      );
      if (!firstPost) {
        throw new Error(
          `Series "${id}" must include a published post with series.order: 1.`
        );
      }

      const title = firstPost.data.series!.title;
      const description = firstPost.data.series!.description;
      if (!title || !description) {
        throw new Error(
          `The first post in series "${id}" must define series.title and series.description.`
        );
      }

      for (const post of orderedPosts) {
        const metadata = post.data.series!;
        if (metadata.title && metadata.title !== title) {
          throw new Error(
            `Post "${post.id}" conflicts with the title defined for series "${id}".`
          );
        }
        if (metadata.description && metadata.description !== description) {
          throw new Error(
            `Post "${post.id}" conflicts with the description defined for series "${id}".`
          );
        }
      }

      const completedBy = orderedPosts.filter(
        post => post.data.series!.complete
      );
      if (completedBy.length > 1) {
        throw new Error(
          `Series "${id}" is marked complete by more than one post.`
        );
      }
      if (
        completedBy.length === 1 &&
        completedBy[0] !== orderedPosts[orderedPosts.length - 1]
      ) {
        throw new Error(
          `The post marking series "${id}" complete must have its highest order.`
        );
      }

      return {
        id,
        title,
        description,
        complete: completedBy.length === 1,
        posts: orderedPosts,
      };
    })
    .toSorted((a, b) => a.title.localeCompare(b.title));
}

export function getSeriesMap(posts: SeriesPost[]): Map<string, Series> {
  return new Map(getSeries(posts).map(series => [series.id, series]));
}

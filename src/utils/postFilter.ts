import type { CollectionEntry } from "astro:content";

/**
 * Determines whether a post is eligible to be listed/rendered.
 *
 * - Excludes drafts unless explicitly enabled in development
 * - In production, excludes scheduled posts until their `pubDate`
 * - In dev, always shows non-draft posts to make authoring easier
 */
export function postFilter({ data }: CollectionEntry<"posts">) {
  const isPublishDatePassed = Date.now() >= data.pubDate.getTime();
  const showDrafts = import.meta.env.DEV && process.env.SHOW_DRAFTS === "true";

  return (
    (showDrafts || !data.draft) && (import.meta.env.DEV || isPublishDatePassed)
  );
}

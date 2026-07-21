import type { CollectionEntry } from "astro:content";

/**
 * Determines whether a post is eligible to be listed/rendered.
 *
 * - Excludes drafts always
 * - In production, excludes scheduled posts until their `pubDate`
 * - In dev, always shows non-draft posts to make authoring easier
 */
export function postFilter({ data }: CollectionEntry<"posts">) {
  const isPublishDatePassed = Date.now() >= data.pubDate.getTime();
  return !data.draft && (import.meta.env.DEV || isPublishDatePassed);
}

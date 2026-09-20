import type { CollectionEntry } from "astro:content";

export function labNoteFilter({ data }: CollectionEntry<"labNotes">) {
  const isPublishDatePassed = Date.now() >= data.pubDate.getTime();
  const showDrafts = import.meta.env.DEV && process.env.SHOW_DRAFTS === "true";
  const showSamples = import.meta.env.DEV;

  return (
    (showDrafts || !data.draft) &&
    (showSamples || !data.sample) &&
    (import.meta.env.DEV || isPublishDatePassed)
  );
}

export function getSortedLabNotes(entries: CollectionEntry<"labNotes">[]) {
  return entries.filter(labNoteFilter).toSorted((a, b) => {
    const aDate = a.data.modDate ?? a.data.pubDate;
    const bDate = b.data.modDate ?? b.data.pubDate;
    return bDate.getTime() - aDate.getTime();
  });
}

export function getLabNoteSlug(entry: CollectionEntry<"labNotes">) {
  return entry.data.slug?.trim() || entry.id;
}

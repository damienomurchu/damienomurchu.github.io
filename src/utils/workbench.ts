import type { CollectionEntry } from "astro:content";

export const workbenchCategories = [
  {
    id: "experiment",
    path: "experiments",
    label: "Experiments",
    singular: "Experiment",
    description:
      "Bounded investigations, prototypes, observations, and results.",
  },
  {
    id: "tool-note",
    path: "tool-notes",
    label: "Tool Notes",
    singular: "Tool Note",
    description:
      "Practical write-ups on the tools, configurations, and workflows I use.",
  },
  {
    id: "build-note",
    path: "build-notes",
    label: "Build Notes",
    singular: "Build Note",
    description:
      "How things were assembled, configured, and made to work in practice.",
  },
] as const;

export type WorkbenchCategory = (typeof workbenchCategories)[number]["id"];

export function getWorkbenchCategory(category: WorkbenchCategory) {
  return workbenchCategories.find(item => item.id === category)!;
}

export function workbenchFilter({ data }: CollectionEntry<"workbench">) {
  const isPublishDatePassed = Date.now() >= data.pubDate.getTime();
  const showDrafts = import.meta.env.DEV && process.env.SHOW_DRAFTS === "true";
  const showSamples = import.meta.env.DEV;

  return (
    (showDrafts || !data.draft) &&
    (showSamples || !data.sample) &&
    (import.meta.env.DEV || isPublishDatePassed)
  );
}

export function getSortedWorkbenchEntries(
  entries: CollectionEntry<"workbench">[]
) {
  return entries.filter(workbenchFilter).toSorted((a, b) => {
    const aDate = a.data.modDate ?? a.data.pubDate;
    const bDate = b.data.modDate ?? b.data.pubDate;
    return bDate.getTime() - aDate.getTime();
  });
}

export function getWorkbenchCategoryEntries(
  entries: CollectionEntry<"workbench">[],
  category: WorkbenchCategory
) {
  const categoryEntries = getSortedWorkbenchEntries(entries).filter(
    entry => entry.data.category === category
  );

  if (category !== "experiment") return categoryEntries;

  return categoryEntries.toSorted((a, b) => {
    const aIsActive = a.data.status.toLowerCase() === "active";
    const bIsActive = b.data.status.toLowerCase() === "active";
    return Number(bIsActive) - Number(aIsActive);
  });
}

export function getWorkbenchSlug(entry: CollectionEntry<"workbench">) {
  return entry.data.slug?.trim() || entry.id;
}

import { access } from "node:fs/promises";
import path from "node:path";
import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { PAPERS_PATH } from "@/content.config";
import config from "@/config";
import { getAssetPath } from "@/utils/withBase";

export function paperFilter({ data }: CollectionEntry<"papers">) {
  const isPublishDatePassed = Date.now() >= data.pubDate.getTime();
  const showDrafts = import.meta.env.DEV && process.env.SHOW_DRAFTS === "true";

  return (
    (showDrafts || !data.draft) && (import.meta.env.DEV || isPublishDatePassed)
  );
}

export function getSortedPapers(papers: CollectionEntry<"papers">[]) {
  return papers.filter(paperFilter).toSorted((a, b) => {
    const aDate = a.data.modDate ?? a.data.pubDate;
    const bDate = b.data.modDate ?? b.data.pubDate;
    return bDate.getTime() - aDate.getTime();
  });
}

export function validatePaperSlugs(papers: CollectionEntry<"papers">[]) {
  const slugs = new Map<string, string>();

  for (const paper of papers) {
    const existing = slugs.get(paper.data.slug);
    if (existing) {
      throw new Error(
        `Papers "${existing}" and "${paper.id}" use the same slug "${paper.data.slug}".`
      );
    }
    slugs.set(paper.data.slug, paper.id);
  }
}

export function getPaperUrl(
  paper: CollectionEntry<"papers">,
  locale: string | undefined = config.site.lang
) {
  return getRelativeLocaleUrl(locale, `papers/${paper.data.slug}/`);
}

export function getPaperSourceStem(paper: CollectionEntry<"papers">) {
  return path.basename(paper.filePath ?? paper.id).replace(/\.(md|mdx)$/i, "");
}

export async function getPaperPdf(paper: CollectionEntry<"papers">) {
  const stem = getPaperSourceStem(paper);
  const filename = `${stem}.pdf`;
  const sourcePath = path.resolve(process.cwd(), PAPERS_PATH, filename);

  try {
    await access(sourcePath);
  } catch {
    return null;
  }

  return {
    filename,
    href: getAssetPath(`papers/downloads/${filename}`),
  };
}

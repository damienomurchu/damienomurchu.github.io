import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCollection } from "astro:content";
import { PAPERS_PATH } from "@/content.config";
import { getPaperSourceStem, getSortedPapers } from "@/utils/papers";

const papersDirectory = path.resolve(process.cwd(), PAPERS_PATH);

export async function getStaticPaths() {
  const papers = getSortedPapers(await getCollection("papers"));

  return papers.map(paper => ({
    params: { file: getPaperSourceStem(paper) },
    props: { file: `${getPaperSourceStem(paper)}.pdf` },
  }));
}

export async function GET({ props }: { props: { file: string } }) {
  const pdf = await readFile(path.join(papersDirectory, props.file));

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${props.file}"`,
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

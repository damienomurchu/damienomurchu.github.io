import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";
export const PAPERS_PATH = "src/content/papers";
export const WORKBENCH_PATH = "src/content/workbench";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDate: z.date(),
      modDate: z.date().optional().nullable(),
      title: z.string(),
      slug: z.string().trim().min(1).optional().nullable(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      series: z
        .object({
          id: z
            .string()
            .trim()
            .regex(
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              "Series IDs must use lowercase letters, numbers, and hyphens."
            ),
          title: z.string().trim().min(1).optional(),
          description: z.string().trim().min(1).optional(),
          order: z.number().int().positive(),
          complete: z.boolean().optional(),
        })
        .optional()
        .nullable(),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

const papers = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${PAPERS_PATH}` }),
  schema: z.object({
    author: z.string().default(config.site.author),
    title: z.string().trim().min(1),
    subtitle: z.string().trim().min(1),
    description: z.string().trim().min(1),
    abstract: z.string().trim().min(1),
    pubDate: z.date(),
    modDate: z.date().optional().nullable(),
    version: z
      .string()
      .trim()
      .regex(
        /^\d+\.\d+(?:\.\d+)?$/,
        "Paper versions must resemble 1.0 or 1.0.1."
      ),
    status: z.enum(["published", "revised", "superseded"]),
    slug: z
      .string()
      .trim()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Paper slugs must use lowercase letters, numbers, and hyphens."
      ),
    series: z.string().trim().min(1).optional(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional(),
    canonicalURL: z.string().optional(),
  }),
});

const workbench = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: `./${WORKBENCH_PATH}`,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    modDate: z.date().optional().nullable(),
    category: z.enum(["experiment", "tool-note", "build-note"]),
    status: z.string().trim().min(1),
    tags: z.array(z.string()).default([]),
    slug: z.string().trim().min(1).optional().nullable(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    sample: z.boolean().optional(),
  }),
});

export const collections = { posts, pages, papers, workbench };

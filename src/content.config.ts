import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

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

export const collections = { posts, pages };

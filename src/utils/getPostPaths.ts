import { getRelativeLocaleUrl } from "astro:i18n";
import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";
import config from "@/config";

const RESERVED_TOP_LEVEL_ROUTES = new Set([
  "404",
  "about",
  "archives",
  "posts",
  "robots.txt",
  "rss.xml",
  "search",
  "tags",
]);

function getPostPathSegments(filePath: string | undefined): string[] {
  return (
    filePath
      ?.replace(BLOG_PATH, "")
      .split("/")
      .filter(path => path !== "")
      .filter(path => !path.startsWith("_"))
      .slice(0, -1)
      .map(segment => slugifyStr(segment)) ?? []
  );
}

function getIdSlug(id: string): string {
  const postId = id.split("/");
  return postId.length > 0 ? String(postId[postId.length - 1]) : id;
}

function getPostSlugPath(
  id: string,
  filePath: string | undefined,
  customSlug?: string | null
): string {
  if (customSlug?.trim()) {
    return customSlug
      .split("/")
      .filter(Boolean)
      .map(segment => slugifyStr(segment))
      .join("/");
  }

  const pathSegments = getPostPathSegments(filePath);
  const slug = getIdSlug(id);
  return pathSegments.length > 0
    ? [...pathSegments, slug].join("/")
    : String(slug);
}

type RoutablePost = {
  id: string;
  filePath?: string;
  data: { slug?: string | null };
};

/** Fail the build when a post would shadow a site route or another post. */
export function validatePostSlugs(posts: RoutablePost[]): void {
  const slugs = new Map<string, string>();

  for (const post of posts) {
    const slug = getPostSlugPath(post.id, post.filePath, post.data.slug);
    const topLevelSegment = slug.split("/")[0];

    if (RESERVED_TOP_LEVEL_ROUTES.has(topLevelSegment)) {
      throw new Error(
        `Post "${post.id}" uses reserved top-level route "${topLevelSegment}".`
      );
    }

    const existingPost = slugs.get(slug);
    if (existingPost) {
      throw new Error(
        `Posts "${existingPost}" and "${post.id}" resolve to the same slug "${slug}".`
      );
    }

    slugs.set(slug, post.id);
  }
}

/**
 * Returns the slug-only path for use as a route param in `getStaticPaths`.
 * No base prefix, no locale — Astro handles those at a higher level.
 * e.g. `/examples/my-post`
 */
export function getPostSlug(
  id: string,
  filePath: string | undefined,
  customSlug?: string | null
): string {
  return `/${getPostSlugPath(id, filePath, customSlug)}`;
}

/**
 * Returns a fully navigable URL for use in `<a href>` and RSS links.
 * Applies both locale routing and the configured Astro base via
 * `getRelativeLocaleUrl`.
 * e.g. `/my-post` or `/en/my-post`
 */
export function getPostUrl(
  id: string,
  filePath: string | undefined,
  locale: string | undefined = config.site.lang,
  customSlug?: string | null
): string {
  return getRelativeLocaleUrl(
    locale,
    getPostSlugPath(id, filePath, customSlug)
  );
}

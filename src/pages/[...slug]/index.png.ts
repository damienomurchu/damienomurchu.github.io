import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPostSlug, validatePostSlugs } from "@/utils/getPostPaths";
import { renderPostOgImage } from "@/utils/og/renderOgImage";
import { postFilter } from "@/utils/postFilter";
import config from "@/config";

export async function getStaticPaths() {
  if (!config.features.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("posts").then(p =>
    p.filter(postFilter).filter(({ data }) => !data.ogImage)
  );
  validatePostSlugs(posts);

  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath, post.data.slug) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  const pngBuffer = await renderPostOgImage(
    { title: props.data.title, tags: props.data.tags },
    url
  );

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};

import type { APIRoute } from "astro";
import { renderSiteOgImage } from "@/utils/og/renderOgImage";

export const GET: APIRoute = async ({ url }) => {
  const pngBuffer = await renderSiteOgImage(url);

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};

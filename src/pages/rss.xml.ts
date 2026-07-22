import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";

const markdown = new MarkdownIt();

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, character => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

function absoluteUrl(value: string): string {
  return new URL(value, config.site.url).href;
}

function renderFeedContent(body: string): string {
  return sanitizeHtml(markdown.render(body), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "figcaption",
      "figure",
      "img",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["alt", "height", "src", "title", "width"],
    },
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.href ? { href: absoluteUrl(attributes.href) } : {}),
        },
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.src ? { src: absoluteUrl(attributes.src) } : {}),
        },
      }),
    },
  });
}

export async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      dcterms: "http://purl.org/dc/terms/",
    },
    customData:
      `<language>${escapeXml(config.site.lang)}</language>` +
      `<dc:creator>${escapeXml(config.site.author)}</dc:creator>`,
    items: sortedPosts.map(({ data, id, filePath, body }) => ({
      link: getPostUrl(id, filePath, config.site.lang, data.slug),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDate),
      categories: data.tags,
      content: renderFeedContent(body ?? ""),
      customData:
        `<dc:creator>${escapeXml(data.author)}</dc:creator>` +
        (data.modDate
          ? `<dcterms:modified>${new Date(data.modDate).toISOString()}</dcterms:modified>`
          : ""),
    })),
  });
}

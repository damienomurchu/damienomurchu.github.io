import { fontData, experimental_getFontFileURL } from "astro:assets";
import satori from "satori";
import sharp from "sharp";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import config from "@/config";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const colors = {
  background: "#20262a",
  foreground: "#cbd0cd",
  accent: "#c98968",
  muted: "#98a3a8",
  border: "#3a444a",
};

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

type PostOgData = {
  title: string;
  tags: string[];
};

function getTitleSize(title: string) {
  if (title.length <= 42) return 76;
  if (title.length <= 65) return 66;
  if (title.length <= 90) return 56;
  return 48;
}

function getCategory(tags: string[]) {
  return (tags[0] ?? "Field Notes").toLocaleUpperCase("en");
}

async function loadFont(
  cssVariable: "--font-ibm-plex-mono" | "--font-source-serif",
  name: string,
  weight: 400 | 700,
  url: URL
): Promise<OgFont> {
  const path = getFontPathByWeight(fontData[cssVariable], weight);

  if (path === undefined) {
    throw new Error(`Cannot find ${name} at weight ${weight}.`);
  }

  const data = await fetch(experimental_getFontFileURL(path, url)).then(
    response => response.arrayBuffer()
  );

  return { name, data, weight, style: "normal" };
}

async function getFonts(url: URL) {
  return Promise.all([
    loadFont("--font-ibm-plex-mono", "IBM Plex Mono", 400, url),
    loadFont("--font-ibm-plex-mono", "IBM Plex Mono", 700, url),
    loadFont("--font-source-serif", "Source Serif", 400, url),
    loadFont("--font-source-serif", "Source Serif", 700, url),
  ]);
}

async function toPng(element: Parameters<typeof satori>[0], url: URL) {
  const svg = await satori(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    embedFont: true,
    fonts: await getFonts(url),
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function renderPostOgImage(data: PostOgData, url: URL) {
  return toPng(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 62px",
          background: colors.background,
          border: `2px solid ${colors.border}`,
          boxSizing: "border-box",
          color: colors.foreground,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "18px",
                color: colors.muted,
                fontFamily: "IBM Plex Mono",
                fontSize: 25,
                letterSpacing: "0.08em",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: { color: colors.accent, fontWeight: 700 },
                    children: "FORGED",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { color: colors.border },
                    children: "/",
                  },
                },
                {
                  type: "span",
                  props: { children: getCategory(data.tags) },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                flex: 1,
                padding: "34px 0 30px",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    color: colors.foreground,
                    fontFamily: "Source Serif",
                    fontSize: getTitleSize(data.title),
                    fontWeight: 700,
                    lineHeight: 1.08,
                    letterSpacing: "-0.025em",
                    maxWidth: "1000px",
                    maxHeight: "330px",
                    overflow: "hidden",
                  },
                  children: data.title,
                },
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `2px solid ${colors.border}`,
                paddingTop: "25px",
                color: colors.muted,
                fontFamily: "IBM Plex Mono",
                fontSize: 23,
              },
              children: [
                {
                  type: "span",
                  props: { children: "FIELD NOTES" },
                },
                {
                  type: "span",
                  props: {
                    style: { color: colors.foreground },
                    children: new URL(config.site.url).hostname,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    url
  );
}

export async function renderSiteOgImage(url: URL) {
  return toPng(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 62px",
          background: colors.background,
          border: `2px solid ${colors.border}`,
          boxSizing: "border-box",
          color: colors.foreground,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                color: colors.accent,
                fontFamily: "IBM Plex Mono",
                fontSize: 25,
                fontWeight: 700,
                letterSpacing: "0.08em",
              },
              children: "FORGED",
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                maxWidth: "1000px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "Source Serif",
                      fontSize: 90,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    },
                    children: "Forged",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      marginTop: "24px",
                      color: colors.muted,
                      fontFamily: "Source Serif",
                      fontSize: 38,
                      lineHeight: 1.3,
                    },
                    children: config.site.description,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                borderTop: `2px solid ${colors.border}`,
                paddingTop: "25px",
                color: colors.muted,
                fontFamily: "IBM Plex Mono",
                fontSize: 23,
              },
              children: [
                { type: "span", props: { children: config.site.author } },
                {
                  type: "span",
                  props: {
                    style: { color: colors.foreground },
                    children: new URL(config.site.url).hostname,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    url
  );
}

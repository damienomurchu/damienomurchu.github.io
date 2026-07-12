import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://forged.damienmurphy.net/",
    title: "Forged · Damien Murphy",
    description:
      "Field notes on DevSecOps, platform engineering, secure delivery, internal tooling, and the space between design and production.",
    author: "Damien Murphy",
    profile: "https://www.linkedin.com/in/damienmurphy/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Dublin",
    dir: "ltr",
  },
  posts: {
    perPage: 12,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/damienomurchu" },
    { name: "linkedin", url: "https://www.linkedin.com/in/damienmurphy/" },
    { name: "mail",     url: "mailto:forged@damienmurphy.net" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});

import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Home",
    posts: "Essays",
    papers: "Papers",
    workbench: "Lab Notes",
    tags: "Explore",
    about: "About",
    archives: "Archives",
    rss: "RSS feed",
    search: "Search",
  },
  post: {
    publishedAt: "Published at",
    updatedAt: "Updated",
    readingTime: "{{minutes}} min read",
    sharePostIntro: "Share this post:",
    sharePostOn: "Share this post on {{platform}}",
    sharePostViaEmail: "Share this post via email",
    tagLabel: "Topics",
    backToTop: "Back to top",
    goBack: "Back to posts",
    editPage: "Edit page",
    previousPost: "Previous Post",
    nextPost: "Next Post",
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page",
  },
  home: {
    socialLinks: "Social Links",
    featured: "Selected Essays",
    recentPosts: "Latest Essays",
    allPosts: "All Essays",
    papers: "Latest Papers",
    allPapers: "All Papers",
    workbench: "Latest Lab Notes",
    allWorkbench: "All Lab Notes",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    tagTitle: "Topic",
    tagDesc: "All posts filed under this topic.",

    tagsTitle: "Explore",
    tagsDesc: "Browse writing by subject or follow a series.",

    postsTitle: "Essays",
    postsDesc:
      "Essays on engineering, personal systems, resilience, work and organisations.",

    papersTitle: "Papers",
    papersDesc: "Long-form technical work from Forged.",

    workbenchTitle: "Workbench",
    workbenchDesc:
      "Experiments, tool notes, and build notes from work in progress.",

    archivesTitle: "Archives",
    archivesDesc: "All the articles I've archived.",

    searchTitle: "Search",
    searchDesc: "Search any article ...",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    searchPlaceholder: "Search posts...",
    noResults: "No results found",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
  },
  notFound: {
    title: "404 Not Found",
    message: "Page Not Found",
    goHome: "Go back home",
  },
} satisfies UIStrings;

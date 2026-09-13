---
title: "Adding offline search to a static Astro site"
description: "The small build pipeline needed to index generated pages without introducing a search service."
pubDate: 2026-09-01
category: build-note
status: Iterating
tags:
  - Engineering
  - Tools & Automation
sample: true
---

<p class="standfirst">A static site does not need a hosted search backend when its complete searchable corpus already exists at build time.</p>

## Goal

Provide fast search across articles and notes while retaining static hosting, predictable deployment and no external analytics requirement.

## Build sequence

The index must be generated after Astro has produced the final HTML:

    astro build
    pagefind --site dist

The generated Pagefind assets are then deployed with the rest of the site. Pages opt into the searchable body with a data attribute on the main content element.

## Details that mattered

- Navigation and footer text should not dominate results.
- Titles and descriptions need to remain searchable even when decorative metadata is excluded.
- The search page must load the generated client only in a built preview; it will not behave identically during an ordinary development session.
- Draft and future-dated content must be filtered before indexing, not after.

## Result

The index remains small and search works entirely in the browser. The main limitation is feedback quality: there is no query analytics unless it is added deliberately.

## Next iteration

Add Workbench categories as Pagefind metadata so results can be narrowed to Writing, Experiments, Tool Notes or Build Notes without maintaining a second index.

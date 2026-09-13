---
title: "Publishing scheduled Astro posts without a content commit"
description: "Using a daily rebuild to make future-dated content appear when its publication date arrives."
pubDate: 2026-08-24
category: build-note
status: Complete
tags:
  - Engineering
  - Tools & Automation
sample: true
---

<p class="standfirst">A static site cannot notice that midnight has passed. Scheduled publishing therefore needs a new build even when the repository has not changed.</p>

## Desired behaviour

A post with a future publication date should remain absent from pages, feeds, search indexes and generated routes until that date is reached in the site's configured timezone.

## Build trigger

The deployment workflow runs for three events:

- a push to the main branch;
- a manual dispatch;
- a daily schedule shortly after midnight.

The daily run rebuilds the same commit. Date filtering happens during the build, so eligible content appears without a synthetic commit or a long-running server.

## Consistency checks

Filtering must be shared by every content surface. It is not enough to remove a scheduled entry from the homepage while leaving it in RSS or the sitemap.

The validation checks:

1. generated post routes;
2. listing and archive pages;
3. RSS publication dates and item counts;
4. the static search index.

## Trade-off

Publication can be delayed by the scheduling interval or a failed workflow. For a personal site, a predictable daily window is a better trade than maintaining application infrastructure solely for precise release times.

## Result

Scheduled posts now publish during the first successful daily build after their date becomes eligible.

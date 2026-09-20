---
title: Turning the Edges of an Ultrawide Into Focus Rails
description: A small experiment in using otherwise wasted screen space to hold context without competing with the work itself.
pubDate: 2026-09-15
tags:
  - Personal Systems
  - Focus
---

I use a 34-inch ultrawide, but I rarely use it in the way ultrawide screenshots tend to suggest.

I do not want six tiled applications competing for attention. Most of the time I want one application centred in roughly the middle two-thirds of the display. That gives me enough space to work without turning the monitor into a wall of information.

It also leaves two narrow strips of mostly unused space.

I started wondering whether those edges could be useful without becoming another dashboard.

The distinction mattered. I did not want CPU graphs, notifications, calendars, feeds or anything else asking for attention. I wanted the edges of the display to support the work happening in the centre.

So I built two very small HTML pages.

The left rail holds deliberate context:

- **WHAT** — what I am actually doing
- **WHY** — why it matters
- **DONE WHEN** — the condition for stopping
- **NEXT** — the next concrete action

The right rail contains a count-up timer and a scratchpad.

That creates a useful asymmetry.

The left side contains relatively stable context. The centre contains the actual work. The right side holds transient state: elapsed time and things I do not want occupying working memory.

The implementation is deliberately boring. They are static HTML pages served locally from my Mac on port `20000`. A `launchd` job keeps the tiny local server running, and Rectangle Pro places the browser windows into narrow regions at either edge of the ultrawide.

The fields persist into `localStorage`, so refreshing the page or restarting the browser does not destroy the current context. The timer is calculated from timestamps rather than incrementing a counter every second, which means browser throttling does not gradually introduce drift.

The visual design turned out to matter almost as much as the functionality.

Both rails are intentionally low contrast. They should be available when I look towards them, but largely disappear when I am concentrating on the centre of the screen. Making them visually prominent would defeat the point.

The interesting part of the experiment is not really the HTML.

It is the idea of treating peripheral screen space as **external working memory** rather than additional application space.

An ultrawide makes it very easy to increase the amount of information visible at once. That does not necessarily increase the amount of useful information visible at once.

The rails are almost the opposite approach. They constrain what the peripheral space is allowed to contain.

The left side answers _what am I doing and why?_

The right side catches things that would otherwise interrupt me.

Everything else stays out of the way.

I have deliberately resisted adding more to them. A task list, calendar, system status or inbox would all be easy additions. They would also turn the rails into another place I need to monitor.

For now, the constraint is part of the design.

The edges support the work.

The centre remains where the work happens.

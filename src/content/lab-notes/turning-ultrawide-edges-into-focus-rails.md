---
title: Turning the Edges of an Ultrawide Into Focus Rails
description: A small experiment in using otherwise wasted screen space to hold context without competing with the work itself.
pubDate: 2026-09-22
tags:
  - Personal Systems
  - Focus
---

*Using peripheral screen space to support focused work without competing with the work itself.*

## The problem

I use a 34-inch ultrawide, but I rarely fill it with tiled applications. Most of the time I want one application centred in roughly the middle two-thirds of the display. It gives me enough room to work while keeping one thing visually dominant.

That leaves two narrow strips of unused space. I wanted to know whether they could carry a small amount of useful context without becoming another dashboard to monitor.

The distinction matters. CPU graphs, calendars, feeds and notifications would make the edges busier, but not necessarily more useful. I wanted them to support the work in the centre rather than compete with it.

## The experiment

I built two small HTML pages and placed one on each side of the primary application.

The left rail holds the stable context for the current piece of work:

- **WHAT** — what I am doing
- **WHY** — why it matters
- **DONE WHEN** — the condition for stopping
- **NEXT** — the next concrete action

The right rail contains a count-up timer and a scratchpad. It holds transient state: elapsed time, quick notes and anything I want to capture without breaking focus or keeping it in working memory.

That separation is deliberate. The left rail keeps the objective visible. The right rail absorbs temporary state. The centre remains the workspace.

## Implementation

Each rail is a static HTML page served on `127.0.0.1:20000`. A `launchd` job starts the local server when I log in, using little more than Python's built-in `http.server`.

I install each page from Safari as a standalone web app, giving me two independent windows without browser chrome. Rectangle Pro owns their geometry and saved layouts, placing them at either edge of the ultrawide.

The editable fields, scratchpad and timer state persist in `localStorage`, so restarting a rail does not discard its contents. The timer derives elapsed time from timestamps rather than incrementing a counter every second, avoiding drift when the browser throttles an inactive window.

There is no backend, database, framework or build system. The implementation is intentionally proportional to the problem.

## Design constraints

The rails are low contrast by design. They should be legible when I look towards them and recede when I return to the centre. If they become visually prominent, they have failed.

The more important constraint is functional. I have deliberately excluded notifications, feeds, task lists, calendars and system status. Any of them would be easy to add, but each would turn the rails into another surface demanding attention.

That is the main failure mode for this kind of tool: gradual accumulation. A useful peripheral aid becomes a dashboard, then a control centre, then another system to maintain. Keeping the rails narrow in purpose is part of the implementation, not an omission from it.

## Result

The useful idea was not the HTML. It was treating peripheral screen space as **external working memory** rather than additional application space.

An ultrawide makes it easy to increase how much information is visible at once. The rails impose the opposite constraint: only information that supports the current task belongs at the edges. In practice, that means I can recover the objective, see the next action or capture a thought with a glance, while the application in the centre remains dominant.

The implementation is available in my [`personal-automation`](https://github.com/damienomurchu/personal-automation/tree/main/desktop/focus-rails) repository.

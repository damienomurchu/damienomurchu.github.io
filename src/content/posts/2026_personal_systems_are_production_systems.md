---
title: 
description: 
slug: 
pubDatetime: 2026-01-01T00:00:01Z
modDatetime: 2026-01-01T00:00:01Z
draft: false

category: engineering

tags:
  - tag-1
  - tag-2

series: 
featured: false
---

- # Treat Your Personal Systems Like Production Systems

  One of the unexpected things I've learned from software engineering is that the best personal systems often look remarkably similar to production systems. Not because life should become over-engineered, but because good systems solve the same kinds of problems regardless of the domain. They reduce friction, make progress visible, remove unnecessary decisions, and make consistent execution easier than relying on motivation alone.

  I recently rebuilt the way I write. Not by searching for another note-taking application or the latest AI tool, but by asking a different question:

  > **If this were a production system, how would I design it?**

  The answer wasn't a folder full of Markdown files. It was a pipeline.

  ## Every Piece of Work Has a State

  In software engineering, work moves through well-defined states. A feature begins as an idea, becomes a design, turns into code, passes review, reaches production, and is eventually retired. At any point, everyone involved knows exactly where it is and what needs to happen next.

  Writing isn't fundamentally different.

  Ideas don't become published articles in one leap. They evolve through recognisable stages, each requiring a different kind of thinking. My own workflow now looks like this:

  ```text
  Seed Tray
      ↓
  0-Seeds
      ↓
  1-Growing
      ↓
  2-Drafts
      ↓
  3-Published
  ```

  Each stage has a single purpose. The Seed Tray captures ideas before they're forgotten. Seeds test whether an idea is worth developing. Growing articles collect research, stories and supporting arguments. Drafts become complete pieces, and Published contains only work that is ready for the world.

  Nothing is ambiguous because every article has exactly one home.

  ## Separate Thinking From Editing

  For years I made the same mistake every time I sat down to write. I'd begin drafting, immediately rewrite the opening paragraph, stop to research a supporting point, rethink the title, question whether the idea was any good, and eventually close the document feeling like I'd accomplished very little.

  The problem wasn't a lack of discipline. The problem was trying to perform completely different kinds of thinking at the same time.

  Software teams don't design, implement, test and deploy simultaneously. Each phase demands a different mindset, and trying to combine them usually creates unnecessary friction. Writing follows the same pattern. Capturing ideas requires speed. Developing arguments requires curiosity. Editing requires criticism. Publishing requires confidence.

  Those modes don't complement one another—they compete. Separating them makes each one easier.

  ## Every Stage Has One Job

  One lesson I've come to appreciate is that the best systems become almost mundane. Once they're established, they fade into the background. You stop thinking about the system itself because it quietly guides the work without demanding your attention.

  Each stage in my writing pipeline has exactly one responsibility. The Seed Tray captures. Seeds clarify. Growing expands. Drafts refine. Published ships.

  There are no grey areas and no "almost finished" folders full of forgotten work.

  That means when I sit down to write, I don't spend time deciding what to do next. I simply look at the pipeline, see where each piece of work currently lives, and choose something appropriate for the time and energy I have available.

  The system doesn't make the work easier. Writing is still hard. Thinking is still hard. What it does is remove unnecessary friction. The next step becomes obvious, leaving more attention available for the work itself.

  The best systems rarely demand recognition. Like good infrastructure, they're quiet, dependable and almost invisible until the moment they're missing.

  ## Automate the Routine

  Production systems automate routine work because we cannot rely on consistent execution of tasks when they are performed manually. We automate deployments, backups and testing not because they're difficult, but because they shouldn't depend on someone remembering to perform them or perform them correctly.

  Publishing shouldn't be any different.

  When an article reaches my `3-Published` directory and I push the repository, a GitHub Actions workflow takes over. It synchronises the published articles into my blog repository, commits any changes, pushes them, and triggers the site deployment automatically.

  The writing repository manages content. The blog repository manages presentation and deployment.

  Each system has a single responsibility. That's exactly how I'd design a software platform, so it made sense to design my writing workflow the same way.

  ## Build Systems That Reduce Decisions

  The biggest benefit hasn't actually been automation. It's the reduction in cognitive load.

  I no longer decide where a file belongs. I don't wonder whether an article is finished. I don't need to remember how publishing works. The workflow answers those questions for me before I even have to think about them.

  Every unnecessary decision removed is attention I can spend on the work itself. That's what good engineering has always been about—not replacing human judgement, but protecting it for the places where it creates the most value.

  The more decisions a system can make consistently on my behalf, the more of my attention remains available for the decisions that actually matter.

  ## The Pattern Is Much Bigger Than Writing

  The more I've thought about it, the more I've realised this isn't really a post about writing at all.

  The same pattern appears everywhere. Fitness becomes easier when training follows a progression rather than daily inspiration. Learning improves when ideas move through stages of capture, understanding and application. Projects become more manageable when work has explicit states instead of living inside one enormous to-do list.

  Even personal goals become easier to pursue when they're supported by systems rather than dependent on motivation.

  Production systems aren't successful because they're sophisticated. They're successful because they make the right thing the easy thing. They reduce uncertainty, make progress visible, remove unnecessary decisions, and allow people to focus on the work that requires human judgement.

  Our personal systems deserve the same treatment. Not because every hobby needs to become an engineering project, but because thoughtfully designed systems create more space for the work that only we can do.

  The irony is that the better these systems become, the less we notice them. They quietly disappear into the background, leaving us with fewer decisions, less friction and more opportunity to do meaningful work.

  To me, that's what treating your personal systems like production systems is really about.
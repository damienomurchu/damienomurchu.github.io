---
title: "Can a coding agent recover from incomplete requirements?"
description: "Testing whether explicit checkpoints help an agent expose missing decisions before it builds the wrong thing."
pubDate: 2026-09-13
category: experiment
status: Active
tags:
  - Engineering
  - Tools & Automation
sample: true
---

<p class="standfirst">An agent that produces valid code can still solve the wrong problem. This experiment tests whether a small amount of structure makes uncertainty visible before implementation begins.</p>

## Question

Can a coding agent recognise consequential gaps in a request, distinguish them from safe assumptions, and continue without turning every ambiguity into a blocking question?

## Test cases

I prepared ten small feature requests with different omissions:

- cosmetic details that can be inferred from the existing interface;
- missing error behaviour;
- unclear persistence requirements;
- an operation with destructive consequences;
- a request that conflicts with an established repository convention.

Each request is attempted twice: once as written and once with a required “assumptions and consequences” checkpoint.

## What I am measuring

The comparison is not based on lines of code or completion speed. I am recording:

1. consequential assumptions made silently;
2. unnecessary questions;
3. rework after review;
4. consistency with the surrounding codebase.

## Early observation

The checkpoint reduces silent architectural assumptions, but it can encourage the agent to narrate trivial implementation details. The next prompt will limit the checkpoint to decisions that affect behaviour, data, security or compatibility.

## Next step

Repeat the test with a larger change where repository exploration should answer some of the apparent ambiguities.

---
title: "Can a local model reliably triage captured notes?"
description: "A small test of whether a local language model can sort an untidy inbox without hiding ambiguous decisions."
pubDate: 2026-09-12
modDate: 2026-09-13
category: experiment
status: Active
tags:
  - Personal Systems
  - Tools & Automation
sample: true
---

<p class="standfirst">The useful question is not whether a model can classify a clean benchmark. It is whether I can trust it with the vague fragments that accumulate in a real capture inbox.</p>

## Question

Can a small local model assign useful destinations to captured notes while making uncertainty visible enough for a quick human review?

## Setup

The sample contains 120 deliberately untidy notes: tasks, ideas, references, half-written questions and several entries that belong in more than one place.

The model must return four fields:

    destination: project | reference | someday | discard
    confidence: 0.0–1.0
    reason: one short sentence
    needs_review: true | false

No note is moved automatically. The output is written to a review queue alongside the original text.

## Observations

1. Clear tasks and obvious references are classified consistently.
2. Short fragments such as “look at permissions” produce unjustifiably confident answers.
3. Asking for a reason improves reviewability but does not noticeably improve accuracy.
4. A confidence threshold is less useful than detecting missing context.

## Current result

The model appears useful as a queue-shaping tool, not as an autonomous filing system. The next run will replace the confidence threshold with an explicit “what information is missing?” response.

## Next step

Run the same notes through two different models and compare only the items each model believes are safe to file without review.

---
title: "restic for backups that can be tested, not trusted"
description: "Why encrypted snapshots, repository checks, and routine restores make a useful combination for small systems."
pubDate: 2026-09-12
category: tool-note
status: In use
tags:
  - Engineering
  - Resilience
sample: true
---

<p class="standfirst">A successful backup command is evidence that data was written somewhere. It is not evidence that recovery will work when the original system has disappeared.</p>

## Where it fits

restic provides encrypted, deduplicated snapshots across local and remote storage. Its command-line interface makes it straightforward to put backup and verification into the same operational routine.

The shape I care about is:

1. create a snapshot;
2. check repository integrity;
3. apply retention rules;
4. restore a small known sample;
5. report the age of the last successful recovery test.

## Strengths

- repositories are encrypted before data leaves the machine;
- snapshots make retention easier to reason about;
- several storage backends share the same workflow;
- restore operations are simple enough to practise regularly.

## Friction

Repository credentials and encryption passwords become critical recovery material. Storing them only on the protected machine defeats the exercise.

Large repository checks also need an explicit schedule. Running the most expensive verification on every backup can turn safety into an operational burden.

## Verdict

A good fit for small infrastructure when paired with independent credential recovery and automated restore tests. The tool enables a backup system; it does not supply the recovery discipline by itself.

---
title: "Turning a mini PC into a recoverable Kubernetes node"
description: "Building a node around repeatable provisioning rather than preserving one carefully configured machine."
pubDate: 2026-09-11
category: build-note
status: Iterating
tags:
  - Engineering
  - Resilience
sample: true
---

<p class="standfirst">The objective was not to keep a small server alive forever. It was to make replacing it sufficiently boring that failure stopped being a special event.</p>

## Design constraint

The node contains no irreplaceable workload data. Configuration belongs in version control, persistent application data belongs on explicit volumes, and credentials have an independent recovery path.

## Provisioning sequence

The build is divided into four layers:

1. operating-system installation and baseline hardening;
2. network identity and remote access;
3. Kubernetes runtime and cluster membership;
4. workloads reconciled from a Git repository.

Each layer produces a simple verification signal before the next begins.

## Failure test

After the first successful build, I removed the node from the cluster and reinstalled it from blank storage. Most workloads returned without intervention.

Two assumptions failed:

- one monitoring configuration had been edited directly on the node;
- a storage mount depended on a manually created directory.

Both were moved into the provisioning configuration before the next run.

## Current state

Rebuilding is repeatable, but not yet unattended. The remaining manual step is securely introducing the node to the secret-management system.

## Next iteration

Time a rebuild performed with no access to the previous machine and record every piece of information retrieved from memory rather than documentation.

---
title: "Giving a self-hosted runner an ephemeral workspace"
description: "A build note on separating persistent runner infrastructure from the disposable filesystem used by each job."
pubDate: 2026-09-08
category: build-note
status: Complete
tags:
  - Engineering
  - Tools & Automation
sample: true
---

<p class="standfirst">The runner may be long-lived without allowing one workflow's filesystem state to become another workflow's inheritance.</p>

## Objective

Create a clean workspace for every job while retaining a persistent host for the runner agent, monitoring and operating-system updates.

## Shape of the solution

Each job receives a dedicated filesystem mounted at the runner's working directory. Cleanup occurs outside the job process, so a cancelled or hostile workflow cannot prevent it merely by leaving child processes behind.

The lifecycle is:

1. stop accepting new work;
2. create and mount a fresh workspace;
3. accept exactly one job;
4. stop the runner agent;
5. unmount and destroy the workspace;
6. record cleanup success before accepting another job.

## Verification

I placed marker files in the workspace, home directory and temporary directory during one job. The following job checked each location.

The workspace marker disappeared as expected. The other two markers remained, demonstrating that workspace cleanup alone is not complete job isolation.

## Decision

Keep the ephemeral workspace as one layer, but pair it with a dedicated job identity and explicit temporary-directory cleanup. Secrets and process isolation remain separate concerns.

## Follow-up

Test the same lifecycle against cancellation, host reboot and a job that deliberately holds an open file descriptor.

---
title: Using `just` Instead of `make` for My Writing Workflow
description: Why a command runner fits my document pipeline better than a dependency-oriented build system.
pubDate: 2026-09-19
tags:
  - Tools & Automation
  - Writing
---

My writing repository has accumulated enough automation to need a stable interface. Producing a PDF now involves rendering Mermaid diagrams, generating intermediate Markdown, invoking Pandoc with Typst, managing temporary files and running the same process locally and in CI.

A `Makefile` was the obvious option. I chose a `Justfile` because the workflow I need to expose is a set of named operations, not an artifact dependency graph.

## The decision boundary

Make models targets, prerequisites and timestamps:

```make
output.pdf: source.md
    pandoc source.md -o output.pdf
```

That model is useful when the dependency graph is important and incremental rebuilds should be inferred from file state. Make can also operate as a general-purpose task runner, but doing so means treating command-like targets as phony and working within semantics designed for a build system.

My repository needs a simpler operator interface:

```text
just paper papers/unpacking-cicd/cicd-whitepaper-v1.0.md
just clean
just doctor
```

These commands express intent directly. `paper` runs the complete paper-rendering pipeline, `clean` removes generated files, and `doctor` checks that the required tools and runtime are available.

The workflow produces artifacts, but I do not need Make to infer what should run from a graph of prerequisites and timestamps. I want to select an operation explicitly and have it execute predictably.

## Keeping the interface small

A Justfile provides that interface without becoming the implementation:

```just
paper source:
    ./scripts/render-paper "{{source}}"

clean:
    ./scripts/clean

doctor:
    ./scripts/doctor
```

The recipes delegate to scripts rather than accumulating substantial shell logic. This keeps the responsibilities clear: the Justfile defines the commands available to the operator, while the scripts implement the workflow.

That boundary gives me room to change the internals. PDF generation could use locally installed tools, Podman, Docker or a different rendering chain without changing the command I run:

```bash
just paper papers/unpacking-cicd/cicd-whitepaper-v1.0.md
```

The command is the stable interface. The container runtime, scripts and document tooling remain replaceable implementation details.

## Using the same entry point in CI

GitHub Actions can invoke the same recipe I use locally instead of reimplementing the pipeline in workflow YAML. CI installs `just`, checks out the repository and calls the named operation.

This keeps orchestration out of the CI platform. The workflow file provides the runner, permissions, triggers and environment; the repository owns how its documents are built. Local and CI execution therefore share one implementation rather than two similar workflows that can drift apart.

It also improves failure handling. I can reproduce the CI operation locally using the same command, and changes to the rendering process are reviewed alongside the scripts and Justfile rather than being split across shell commands embedded in YAML.

## When I would still use Make

This is a fit decision, not a general argument against Make. I would reach for Make when artifact relationships, timestamp-based invalidation or incremental builds were central to the repository.

Here, the useful abstraction is different. Make is strongest when I need to describe how outputs depend on inputs. `just` is a better fit when I need to expose a small set of commands that people and automation can invoke consistently.

For this writing repository, the Justfile acts as a thin control surface over the document pipeline. It gives me explicit operations, one entry point for local and CI use, and freedom to change the implementation without changing the operator workflow.


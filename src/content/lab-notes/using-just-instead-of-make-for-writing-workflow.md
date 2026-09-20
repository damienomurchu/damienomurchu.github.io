# Using `just` Instead of `make` for My Writing Workflow

*The workflow looks like a build system, but I am not actually building software.*

My writing repository has gradually accumulated automation.

That started simply enough, but producing the PDF versions of my technical papers now involves several steps: rendering diagrams, invoking Pandoc, selecting the PDF engine, managing intermediate files and eventually running the same process locally and in CI.

At that point I wanted a single interface over the workflow.

The obvious answer was a `Makefile`.

I chose a `Justfile` instead.

This is not because Make is incapable of doing the job. Quite the opposite. Make could handle this easily.

The question was whether I actually wanted the semantics Make brings with it.

Make is fundamentally a build system. Its model revolves around targets, dependencies and timestamps:

```make
output.pdf: source.md
    pandoc source.md -o output.pdf
```

That model is excellent when those relationships are the thing being expressed.

My writing automation is slightly different.

What I primarily want is a collection of named operations:

```text
just paper papers/unpacking-cicd/cicd-whitepaper-v1.0.md
just clean
just doctor
```

`paper` means *run my paper publishing pipeline*.

That pipeline happens to produce a PDF, but the useful abstraction for me is the operation rather than the dependency graph.

That makes `just` a better fit.

A Justfile looks superficially similar to a Makefile, but it behaves more like a command runner. Recipes can accept arguments cleanly, normal shell behaviour is less surprising, and I do not have to work around concepts such as `.PHONY` targets when the thing I am defining was always intended to be a command.

For example, the interface I want can remain extremely small:

```just
paper source:
    ./scripts/render-paper "{{source}}"

clean:
    ./scripts/clean

doctor:
    ./scripts/doctor
```

The implementation behind those commands can change without changing how I interact with the repository.

That last part is important.

I do not particularly care whether PDF generation eventually uses locally installed tools, Podman containers, Docker containers or something else. I want this to remain true:

```bash
just paper papers/unpacking-cicd/cicd-whitepaper-v1.0.md
```

The recipe becomes the stable interface.

The same command can also become the entry point from GitHub Actions rather than reproducing the build logic in YAML. CI installs `just` and invokes the same operation I use locally.

That gives me one workflow rather than a local workflow and a vaguely similar CI workflow that will eventually drift away from it.

There is a broader distinction here that I find useful:

**Make describes how artifacts depend on each other.**

**Just describes commands I want to perform.**

There is obviously overlap between the two, and there are repositories where I would still immediately reach for Make.

But this repository is primarily a writing system.

The automation exists to make operations repeatable, not to model a complex artifact dependency graph.

Once I looked at it that way, choosing `just` became fairly straightforward.

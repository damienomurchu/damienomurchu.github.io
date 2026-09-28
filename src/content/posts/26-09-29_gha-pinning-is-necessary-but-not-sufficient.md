---
title: "Why Pinning GitHub Actions Is Necessary — but Not Sufficient"
description: "Pinning GitHub Actions prevents silent changes, but does not guarantee reproducible execution."
slug: "gha-pinning-is-necessary-but-not-sufficient"
pubDate: 2026-09-29
modDate: 2026-09-29
draft: false

category: engineering

tags:
  - Engineering

series:
  id: "github-actions-security"
  order: 3
featured: true
---

## Pinning Solves a Specific Problem

Part 2 ended with a fairly simple problem.

Once you have decided that you trust a GitHub Action, how do you make sure the code you approved today is still the code that runs tomorrow?

The obvious answer is to pin it to a full commit SHA.

You should.

GitHub recommends full-length commit SHAs as the only immutable way to reference an Action, and the reasoning is straightforward. A tag such as `v3` is a convenient name, but it is still a reference. If that reference moves, the code executed by your workflow can change without anything changing in the workflow itself.

Pinning removes that ambiguity.

What it does not do is establish that the code you pinned was trustworthy in the first place.

It also does not necessarily guarantee that the same code will execute every time the workflow runs.

That distinction matters, because it is very easy to turn SHA pinning into a security checkbox and quietly give the control more credit than it deserves.

## Tags Are Convenient Because They Can Move

A typical workflow might contain something like:

```
- uses: some-org/some-action@v3
```

That is readable and easy to maintain. You can immediately see that you are consuming version 3 of the Action, and the publisher can move the tag forward as new releases are produced.

The problem is that the convenience comes from exactly the property we are trying to control.

`v3` is not the code. It is a reference to the code.

If the owner of the repository moves that tag to another commit, a workflow using `@v3` may begin executing different code the next time it runs. Nothing has to change in your repository. There does not need to be a pull request for you to review. From the point of view of your own source history, the workflow has not changed at all.

This was one of the important details in the `tj-actions/changed-files` compromise discussed in Part 2. Existing version tags were repointed at the malicious commit, which meant downstream workflows using those tags could begin executing the compromised version without changing their own configuration.

Pinning changes that relationship:

```
- uses: some-org/some-action@8f4b7f84864484a7bf31766abe9204da3cbe65b3
```

Now the workflow identifies an exact Git commit. The publisher can create another release, move a tag or push new code, but that particular workflow will continue to reference the revision it explicitly names.

That is a useful security property.

It is also a fairly specific one.

## A Pinned Action Is Not Necessarily a Pinned Execution

There is another limitation which is easier to miss.

Pinning a GitHub Action to a commit SHA guarantees that GitHub retrieves the same revision of that Action. It does not necessarily guarantee that the same code executes every time the workflow runs.

That depends on what the Action does next.

Imagine a pinned Action containing something conceptually like:

```
curl https://vendor.example/releases/latest/tool -o tool
```

The Action itself has not changed. Its commit SHA is identical on every run.

The binary it executes may be completely different.

The same problem can appear less obviously through package managers, container image tags, installation scripts, nested Actions, dynamically resolved dependencies, or anything else fetched after the Action starts.

A workflow can therefore look completely immutable at the top level:

```
- uses: vendor/action@8f4b7f84864484a7bf31766abe9204da3cbe65b3
```

while the actual execution path looks more like:

```
Workflow
   │
   ▼
Pinned Action
   │
   ▼
package@^4
   │
   ▼
container:latest
   │
   ▼
download/latest/tool
```

Only the first dependency in that chain is pinned.

This matters because one of the intuitive reasons for pinning is reproducibility. We want confidence that the code we approved yesterday is the code that will execute tomorrow.

A top-level SHA can only give us that property if the dependencies beneath it are equally deterministic.

If a pinned Action resolves mutable transitive dependencies, those dependencies can change without the workflow changing and without the Action's own commit changing. From the consuming repository's point of view, everything still looks exactly the same.

This is essentially the same problem we were trying to remove by replacing `@v3` with a SHA. We have just moved the mutable reference further down the dependency graph.

The useful question therefore becomes broader than:

> Is the Action pinned?

It becomes:

> How much of the execution path is actually pinned?

That is a harder question, and often one the consuming organisation cannot answer completely.

But recognising the distinction is important.

SHA pinning gives you an immutable entry point into the dependency graph.

It does not automatically give you an immutable dependency graph.

## Pinning Gives You Identity, Not Trust

There were two questions at the end of the previous post:

1. Do I trust this code?
2. Can the code I trusted change without me approving it?

Pinning addresses the second question at the top-level Action reference.

It does not answer the first.

You can pin vulnerable code. You can pin malicious code. You can pin an Action whose release process was already compromised before the commit was created. You can pin an Action which reliably executes a dependency you should never have trusted in the first place.

The SHA has still done its job correctly. It has identified exactly which Git commit you asked GitHub to retrieve.

That is why I think it helps to separate three properties that often get blurred together:

**Identity:** Which top-level Action revision am I invoking?

**Reproducibility:** Will that invocation resolve to the same executable code every time?

**Trust:** Should I allow that code to execute with this authority?

Pinning a full commit SHA gives you a strong answer to the first question.

Depending on what the Action does internally, it may or may not give you the second.

It does not establish the third.

That is a more useful way to reason about the control than simply checking whether the workflow contains forty hexadecimal characters.

## Someone Still Has to Decide What Gets Pinned

There is another step hidden by the final YAML.

Suppose an engineer wants to use `vendor/action@v4.2.0`.

Somewhere, that release has to be resolved to a commit SHA. That SHA then has to make its way into the workflow.

The important question is what happens in between.

Did somebody establish that the SHA corresponds to the version they intended to consume? Was the update reviewed? Is the repository still maintained? Did the release introduce unexpected behaviour? Has ownership changed? Is the Action now pulling in something it did not previously depend on?

Not every dependency update needs an elaborate security investigation. That would not scale, and for many low-risk workflows it would provide very little value.

But simply replacing:

```
vendor/action@v4
```

with:

```
vendor/action@e4b17...
```

does not make the decision disappear.

It makes the revision immutable.

The trust decision still exists.

## Pinning Also Means You Now Own Updates

Mutable tags solve a real operational problem: they make updates easy.

If you consume `@v4` and the publisher moves that tag to a newer release, your workflow receives the change automatically. That is precisely the behaviour pinning is intended to prevent.

Once you pin a dependency, nothing upstream can move it for you.

That means you now need another mechanism for keeping it current.

This is where pinning can become a slightly strange security control if it is implemented without thinking about the lifecycle around it. An organisation can successfully enforce SHA pinning across thousands of workflows and still end up with a large estate of dependencies which nobody is meaningfully maintaining.

The workflows are compliant.

The dependencies are three years old.

That is not a particularly satisfying outcome.

Tools such as Dependabot and Renovate can help by detecting newer revisions and opening pull requests. That gives you a useful operating model:

```
upstream release
      │
      ▼
identify new revision
      │
      ▼
propose update
      │
      ▼
review
      │
      ▼
approve
      │
      ▼
consume new SHA
```

The important part is that movement of the dependency becomes visible again.

You have deliberately traded automatic movement for an explicit change that can be reviewed, tested and recorded.

That trade is usually worth making for code executing inside CI/CD.

But it does create work, and pretending otherwise is how security controls become abandoned or routinely bypassed.

## Review Has to Be Proportional to the Risk

The next question is what reviewers are actually supposed to review.

This becomes difficult surprisingly quickly.

A JavaScript Action may contain generated bundles with thousands of lines of JavaScript. A Docker Action may depend on a base image, operating-system packages and copied binaries. A composite Action may execute shell commands, invoke other Actions or rely heavily on whatever happens to be installed on the runner.

Expecting engineers to manually audit every changed line of every dependency before accepting an update is not a credible operating model.

At the other extreme, automatically merging every Action update because the result remains SHA-pinned misses much of the point of making the update explicit.

Context matters.

An Action which formats Markdown in a workflow with read-only access and no secrets does not need to be treated in the same way as one running immediately before a production deployment with access to cloud credentials.

The same dependency can represent very different levels of risk depending on where it executes and what authority the workflow gives it.

For lower-risk Actions, a healthy project, sensible release history, automated testing and routine dependency updates may be enough.

For something sitting on a sensitive deployment path, it may be worth understanding exactly what changed, whether new dependencies were introduced, and whether the Action's runtime behaviour is still consistent with what was previously approved.

The point is not to create a universal review ceremony.

It is to make the amount of scrutiny roughly match the consequence of getting the decision wrong.

## There Is Value in Reducing the Number of Decisions

One of the easiest ways to make dependency governance more manageable is also one of the least sophisticated.

Use fewer dependencies.

Every third-party Action creates another thing to assess, pin, monitor and update. It adds another repository whose ownership may change, another release stream, another set of dependencies, and another piece of software which may eventually stop being maintained.

That does not mean replacing useful mature Actions with hundreds of lines of internal shell.

As with most supply-chain decisions, the trade-off runs in both directions. Internal code brings its own maintenance and ownership costs.

But there is a meaningful difference between deliberately choosing twenty external dependencies and allowing hundreds of repositories to independently accumulate whatever Actions happened to solve a problem at the time.

At organisational scale, standardisation creates leverage.

Common Actions can be evaluated once, approved centrally, monitored and updated. Reusable workflows can hide some of the dependency decisions completely. Platform teams can provide a smaller number of supported paths for common capabilities rather than asking every engineering team to repeatedly solve the same problem.

That is not only a security improvement.

It is also cheaper.

The fewer trust decisions you create, the fewer trust decisions you have to maintain.

## Pinning Is a Lifecycle, Not a Line of YAML

At this point, SHA pinning stops looking like a single configuration rule.

A mature implementation probably needs some combination of:

- identifying which external Actions are in use;
- requiring immutable references where appropriate;
- checking that new dependencies meet whatever trust criteria matter for the organisation;
- automatically detecting newer versions;
- reviewing and testing updates;
- preventing dependencies from quietly becoming abandoned;
- understanding where particularly sensitive Actions execute;
- making it difficult to introduce a new mutable reference by accident.

The exact implementation will vary enormously between a small engineering team and a large enterprise.

The underlying lifecycle is more consistent:

```
discover → assess → pin → consume → monitor → update → retire
```

The SHA is one piece of that system.

It is an important piece because it gives us a stable top-level revision around which the rest of the process can operate. Without it, an upstream change can move the thing we thought we had approved.

But the security property comes from the system around the SHA, not from the presence of the SHA alone.

## Necessary, but Not Sufficient

I think third-party GitHub Actions should generally be pinned to full commit SHAs.

A mutable tag allows the code referenced by your workflow to change without any corresponding change in your own repository. Pinning removes that behaviour and makes top-level dependency changes visible again.

That is a significant improvement.

But it is worth being precise about the claim.

Pinning tells you which Action revision you decided to invoke.

It does not necessarily guarantee that every transitive dependency beneath that Action is equally immutable.

It does not tell you that the resulting execution is safe.

It does not maintain the dependency for you.

And it does not control what the Action can reach once it starts running.

Those are separate problems.

A useful way to think about pinning is therefore this:

It gives you an immutable entry point into the execution graph.

It does not make the entire graph immutable, and it does not tell you whether the graph should be trusted.

And that last part leads directly into the next boundary in the system.

Even perfectly selected, perfectly pinned code still has to execute somewhere.

The runner determines what that code can actually reach, steal or change.

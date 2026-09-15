---
title: "Every GitHub Action is a Supply Chain Decision"
description: ""
slug: "every-github-action-is-a-supply-chain-decision"
pubDate: 2026-09-21
modDate: 2026-09-21
draft: false

category: engineering

tags:
  - Engineering

series:
  id: "github-actions-security"
  order: 2
featured: true
---

*Part 2 of a series on securing GitHub Actions.*

## The trust decision hiding in plain sight

There is something almost too easy about this:

```yaml
- uses: some-org/some-action@v3
```

It barely looks like a security decision.

You add an Action, get the capability you need, and move on.

Now compare it with this:

```bash
curl https://some-random-domain.example/install.sh | bash
```

Most experienced engineers would stop and look at that second line twice. Who owns the domain? What is in the script? Can it change? What else does it pull in? What credentials are available when it runs?

The first example deserves many of the same questions.

When you add a third-party GitHub Action to a workflow, you are deciding to execute someone else's code inside your automation environment. That makes every `uses:` line a software supply-chain decision, whether it feels like one or not.

## `uses:` hides the decision

One of the reasons GitHub Actions works so well is that reuse is cheap.

A reasonably complex capability can often be reduced to a few lines:

```yaml
- uses: vendor/action@v4
  with:
    something: useful
```

That is good developer experience, but good abstractions hide things. In this case, they can also hide the amount of trust involved.

Behind that one line there may be JavaScript executing, shell commands running, containers starting, packages loading, binaries being downloaded, and external services being contacted. All of it executes inside the context of your workflow, with whatever access that workflow happens to have.

Depending on where the Action sits, that might mean access to source code, the network, a `GITHUB_TOKEN`, secrets, package registries, cloud credentials, or a deployment path.

That makes an Action slightly different from the dependencies we are used to thinking about.

A normal library is added because our application may call it. An Action is added because we explicitly want it to run.

In that sense, it is closer to a build plugin, installer, package-manager hook or CI extension than a conventional application dependency. Execution is not incidental. Execution is the point.

And CI is not usually a low-value place to run code you do not control.

## The thing you trust is bigger than the repository

It is easy to reduce the trust decision to the Action repository itself.

That is too narrow.

What you are really trusting looks more like this:

```text
Your workflow
      │
      ▼
GitHub Action
      │
      ▼
Action repository
      │
      ▼
Maintainers
      │
      ▼
Dependencies
      │
      ▼
Build and release process
      │
      ▼
External tools and services
```

You are trusting the maintainers, but also the security of their accounts, the people with write access, the way releases are produced, the dependencies they consume, and any external code or services they rely on at runtime.

The visible dependency is only the start of the chain.

This is one of the recurring problems with software supply chains. They are presented to us as lists of things we chose, but they behave more like graphs of things we now depend on.

The workflow might contain one line. The trust relationship behind it can be much larger.

## The dependency has dependencies

Take a JavaScript Action. The code in the repository may be small, but it can still depend on a large npm tree.

A Docker Action adds a different set of dependencies: the base image, packages installed during the build, copied binaries, and anything fetched when the container starts.

A composite Action can call shell commands, local tooling, or other Actions.

What eventually executes may look more like:

```text
Workflow
   │
   ▼
Action
   │
   ▼
Package
   │
   ▼
Another package
   │
   ▼
Downloaded binary
   │
   ▼
External service
```

From the workflow author's point of view, it still looks like:

```yaml
- uses: vendor/action@v3
```

That gap matters.

The thing you deliberately chose to trust is rarely the only thing you ended up trusting.

## Reviewing the source only gets you so far

Reviewing an Action before you use it is sensible.

The problem is deciding what "reviewing the Action" actually means.

Do you review the TypeScript source? The bundled JavaScript that the runner executes? The lockfile? The Docker image? The base image? The binaries it downloads at runtime?

Consider an Action pinned to a specific commit which then does this:

```bash
curl https://vendor.example/download/latest/tool -o tool
```

The Action itself may be immutable. The execution path is not.

That is the broader lesson. A security control applied at one layer does not automatically secure everything behind it.

This becomes important when we get to pinning, because pinning is useful, but it only solves one part of the problem.

## Reputation is useful, but it is still just a signal

In practice, engineers use shortcuts when deciding whether an Action looks trustworthy.

Who owns it? Is the organisation recognisable? Is the project active? How widely is it used? Is the publisher verified?

That is reasonable. We have to make decisions somehow.

The mistake is treating those signals as proof.

A widely used Action may have had more eyes on it and may have a stronger track record. It is also a much more valuable target.

If compromising one repository gives an attacker a path into thousands of CI pipelines, that repository has become an attractive piece of infrastructure to own.

This is the leverage at the heart of supply-chain attacks. You do not need to attack ten thousand organisations directly if you can compromise one dependency that ten thousand organisations already trust.

## The maintainer does not need to be malicious

The obvious model is to ask whether the person publishing the Action can be trusted.

That is not the most interesting failure mode.

A trustworthy maintainer can still be compromised. Their GitHub account can be taken over. A token can leak. A collaborator can be compromised. A dependency can turn malicious. A release process can be abused.

The more useful question is not:

> Do I trust this maintainer?

It is:

> What happens to us if something upstream of this dependency is compromised?

That shifts the problem from personal trust to system design, which is where it belongs.

## `tj-actions/changed-files` is a useful example

The compromise of `tj-actions/changed-files` in March 2025 is a good example of why this matters.

The Action was used by more than 23,000 repositories. Malicious code caused sensitive values present in runner memory to be written into workflow logs, potentially exposing credentials available during execution.

The interesting part was not simply that one popular Action had been compromised.

It was the chain that led there.

Subsequent investigation traced the compromise back through `reviewdog/action-setup`. That compromised Action was pulled in through `tj-actions/eslint-changed-files`, which ran inside a workflow used by the `changed-files` project.

The malicious code exposed credentials from that runner, including a token with write access to the `tj-actions` repositories. That gave the attacker the ability to modify `tj-actions/changed-files` itself and repoint existing version tags at a malicious commit.

The chain looked roughly like this:

```text
Upstream compromise
        │
        ▼
reviewdog/action-setup
        │
        ▼
tj-actions/eslint-changed-files
        │
        ▼
tj-actions CI credentials
        │
        ▼
tj-actions/changed-files
        │
        ▼
Downstream workflows
```

That is more interesting than a single compromised repository because it shows how trust propagates.

One project trusted another. That trust existed inside a CI environment with credentials. Those credentials became a path into another repository, which was itself trusted by thousands of downstream users.

The supply chain did what it was built to do: propagate reusable capability downstream.

The attacker simply got to reuse the same mechanism.

This is also why supply chains are better thought of as graphs rather than neat dependency lists. The path into your workflow may begin several projects away, through relationships you never made directly.

## Your attack surface extends beyond your organisation

Once you bring an external Action into a workflow, systems you do not control start to influence your security posture.

You probably do not control the maintainer's laptop, their authentication, their repository permissions, their release process, or how quickly they would detect a compromise. You also do not control what their dependencies will look like six months from now.

That does not make third-party Actions a bad idea. Rebuilding everything internally would be expensive, wasteful, and in many cases less secure.

It just means the trade-off should be visible.

Using a dependency moves part of your trust boundary outside your control.

That is fine, as long as you know you have done it.

## Pinning is not the same as trust

A natural response at this point is to pin the Action to a commit SHA.

You should. That is the subject of the next post.

But it is worth being precise about what pinning gives you.

There are two separate questions:

1. Do I trust this code?
2. Can the code I trusted change without me approving it?

Pinning helps with the second.

It does not answer the first.

You can pin malicious code. You can pin vulnerable code. You can pin an Action which pulls mutable code at runtime.

Pinning gives you immutability at a specific point in the chain. It does not give you trust.

That is why the decision about **what** to trust has to come before the decision about **how** to reference it.

The `tj-actions` incident also demonstrates why this distinction matters. Existing version tags were moved to point at the malicious commit, meaning consumers who relied on mutable tags could begin executing different code without changing their own workflow.

That is a pinning problem.

The fact that the malicious code reached the repository through a chain of trusted automation is a supply-chain problem.

They are related, but they are not the same problem.

## The Action is only half the equation

The same Action can represent very different levels of risk depending on where it runs.

In one workflow it might have read-only access, no secrets, and do nothing more interesting than lint some files.

In another it might be able to publish packages, request cloud credentials through OIDC, write to the repository, or sit directly on the production deployment path.

Same Action. Very different consequences.

A useful way to think about that is:

```text
Risk
  ≈
likelihood of compromise
  ×
authority available
  ×
blast radius
```

That is not intended as a scoring system. It is just a way of seeing the available levers.

You can be more selective about what you trust. You can reduce the authority available when it runs. You can reduce how far a compromise can spread.

The rest of this series will spend more time on the latter two.

For now, the important point is that an Action does not bring its own privilege level. The workflow gives it one.

## CI is not "just CI"

This matters because CI/CD systems now hold a lot of authority.

A workflow may be able to read proprietary source code, modify repositories, create releases, publish packages, push container images, request cloud credentials, sign artifacts, modify infrastructure, or deploy directly to production.

That is a long way from the old mental model of CI as a system that compiles code and runs tests.

Modern CI/CD is part of the software delivery control plane.

If an attacker compromises something inside the system that builds, signs and publishes your software, they are no longer just attacking an application dependency. They are attacking the machinery that produces the application.

CI/CD is not adjacent to the software supply chain.

It is part of it.

## Every `uses:` expands the trust boundary

The answer to all of this is not to stop using third-party Actions.

That would mostly replace supply-chain risk with duplicated engineering effort, internal maintenance, and an alarming amount of bespoke shell.

The better answer is to be deliberate about what gets introduced.

Before adding an Action, I want to understand a few things:

- Do we need the dependency at all?
- Who controls it?
- Is it actively maintained?
- What actually executes?
- What else does it depend on?
- Does it download additional code?
- What authority will it have in this workflow?
- What happens if it is compromised?
- How will we update or replace it?

That does not mean every Action needs a formal security review.

Context still matters.

An Action formatting Markdown in a low-privilege workflow is not the same risk as one sitting on a production deployment path.

The goal is not to create another gate.

It is to make the decision visible again.

## At scale, this becomes a platform problem

There is also a point where individual judgement stops scaling.

If every engineer in a large organisation has to independently assess every Action they encounter, either the same work gets repeated over and over again, or most Actions simply get used without much assessment.

Neither is especially good.

This is where platform teams can create leverage. Common Actions can be evaluated once, approved centrally, wrapped in reusable workflows, monitored, and updated in a controlled way.

The useful model is not "approve this forever".

It is closer to:

```text
discover → assess → approve → consume → monitor → update → retire
```

Trust has a lifecycle.

An Action which made sense three years ago may have different maintainers, different dependencies, different ownership, or no active maintenance at all today.

The decision needs to be revisited occasionally, just like any other dependency that matters.

## Use fewer dependencies, not zero dependencies

There is still a very simple control available here.

Use fewer dependencies.

If something can be done safely in three lines of shell, adding a third-party Action to save those three lines may not be a particularly good trade.

On the other hand, replacing a mature, well-maintained Action with 500 lines of internal automation that nobody properly owns is not obviously better.

The goal is not to bring everything in-house.

It is to make each dependency earn its place.

Every dependency gives you capability, but it also creates maintenance, ownership and trust.

That is an engineering trade-off.

## Make the trust decision explicit

GitHub Actions has made reusable automation extremely convenient, and that is a good thing.

The problem starts when convenience makes the underlying decision invisible.

When you write:

```yaml
- uses: some-org/some-action@v3
```

you are extending your software supply chain. You are allowing code controlled outside your immediate boundary to execute inside your automation environment.

Depending on the workflow, that code may be running with access to some of the most privileged parts of your engineering system.

The mental model I use is simple:

> **Every `uses:` line expands your trust boundary.**

That does not mean the boundary should never expand.

It means you should know when it does, understand why, and have enough evidence to justify what you have placed on the other side.

Once you have made that decision, the next problem is making sure the code you approved today is still the code that runs tomorrow.

That is where pinning comes in.
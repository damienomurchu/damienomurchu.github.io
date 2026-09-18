---
title: "Securing GitHub Actions Is a Hard Problem"
description: "GitHub Actions combines third-party executable code, privileged CI/CD environments and complex event-driven behaviour. Securing it requires far more than pinning versions or restricting the Marketplace."
slug: "securing-github-actions-is-a-hard-problem"
pubDate: 2026-08-13
modDate: 2026-08-13
draft: false

category: engineering

tags:
  - Engineering

series:
  id: "github-actions-security"
  title: "Securing GitHub Actions in the Enterprise"
  description: "A practical examination of the supply-chain, execution, identity and governance risks created by GitHub Actions—and how enterprises can control them without destroying developer agility."
  order: 1
featured: true
---

## The power—and hidden risk—of GitHub Actions

GitHub Actions has become one of the most attractive CI/CD platforms available.

It is integrated directly into GitHub. Workflows live beside the code they build. Automation can respond to almost every meaningful event in the software-development lifecycle, from pull requests and releases to issue comments, scheduled jobs and deployment approvals.

Developers can also draw from a vast ecosystem of reusable Actions rather than implementing every piece of automation themselves.

That combination is extraordinarily powerful.

It also creates a security problem that I believe the industry has substantially underestimated.

GitHub Actions is not simply a build service with some reusable plugins. It is an execution platform through which externally maintained code can run inside one of the most trusted parts of an organisation: its software-delivery system.

Securing it is therefore not one problem.

It is a collection of interlocking supply-chain, identity, execution, infrastructure and governance problems. Many of the boundaries between those problems are also surprisingly difficult to see.

## An Action is executable code

The first important mental shift is to stop thinking of an Action as a convenient configuration component.

An Action is executable code.

When a workflow uses an Action from another repository, it grants that code the ability to execute inside the workflow's runner environment.

Depending on the job, that environment may contain:

- source code;
- repository credentials;
- package-registry credentials;
- cloud identities;
- signing material;
- deployment permissions;
- access to internal networks;
- the ability to modify the repository itself.

This makes consuming an Action fundamentally different from copying a harmless configuration fragment.

It is closer to installing a software dependency that will execute inside your production-delivery control plane.

In some cases, an Action may be even more sensitive than an ordinary application dependency.

Application code is usually constrained by the permissions of the application at runtime. CI/CD code often exists specifically to build artifacts, retrieve secrets, publish packages and deploy software.

A compromised Action does not necessarily need to exploit the application.

It may already be running in exactly the environment the attacker wants to reach.

## The barrier to publishing an Action is deliberately low

Part of GitHub Actions' success comes from how easy it is to create and distribute reusable automation.

An Action can be published from a public GitHub repository and made available for other workflows to consume. GitHub's own documentation states that anyone can publish an Action in the Marketplace.

Some organisations are presented as verified creators, but the Marketplace remains an open ecosystem rather than a tightly controlled software catalogue.

That openness is valuable. It allows useful automation to spread quickly and reduces duplicated engineering effort.

But availability should never be confused with trustworthiness.

The existence of an Action in the Marketplace does not establish that:

- its source has received a meaningful security review;
- its maintainers use strong account-security controls;
- its release process is protected;
- its dependencies are continuously monitored;
- its build artifacts correspond to its source;
- future releases will remain trustworthy.

The Marketplace helps developers discover Actions.

It should not be treated as an enterprise trust registry.

## A verified creator is not the same as verified code

The verified-creator badge is particularly easy to overinterpret.

GitHub describes Marketplace verification primarily in terms of organisational identity. The organisation must verify its domain, display a verified badge and provide a confirmed email address through which GitHub can contact it.

Those checks are useful. They make impersonation more difficult and help establish that an Action is associated with the organisation it claims to represent.

But identity verification is not the same as continuous security assurance.

It does not mean:

- every release of every Action has been independently audited;
- the publisher's development environment cannot be compromised;
- maintainer credentials cannot be stolen;
- mutable tags cannot be repointed;
- dependencies cannot become vulnerable;
- the release process cannot be poisoned.

The distinction became painfully concrete in March 2026.

Checkmarx, an established application-security company and verified Marketplace creator, reported that attackers gained unauthorised access to its GitHub repositories. Malicious payloads were injected into its AST and KICS GitHub Actions before the affected tags were revoked.

The lesson is not that verified creators are untrustworthy.

The lesson is that a verified identity cannot make a software supply chain infallible.

## Tags look like versions, but they are references

Many workflows consume Actions using a reference such as:

```yaml
- uses: some-organisation/some-action@v3
```

This is readable, convenient and easy to maintain.

It may also be mutable.

A Git tag or branch can be moved to point to a different commit. A workflow referencing that tag can therefore execute different code in the future without any corresponding change appearing in the consuming repository's workflow file.

GitHub recommends pinning Actions to a full-length commit SHA and states that this is currently the only way to consume an Action as an immutable release.

```yaml
- uses: some-organisation/some-action@8f4b7f84864484a7bf31766abe9204da3cbe65b3
```

That substantially improves security.

But SHA pinning is not a complete solution.

The organisation must still determine whether the pinned commit was trustworthy in the first place. It must also review updates, identify vulnerable versions and roll forward without creating an unmanageable maintenance burden.

The Action may download additional software during execution. A pinned entry point can still invoke:

- package managers;
- installation scripts;
- remote APIs;
- container images;
- binaries downloaded at runtime.

Those dependencies may not be equivalently pinned.

Immutability narrows the problem.

It does not eliminate the supply chain.

## Not all Actions have the same shape

GitHub Actions can execute in several forms, each with different security implications.

### JavaScript Actions

JavaScript Actions commonly commit bundled JavaScript into the repository.

The source may be written in TypeScript, but the runner executes generated files such as `dist/index.js`.

Reviewing the human-readable source is therefore not enough.

A consumer must either trust that the committed bundle was produced from that source or independently reproduce and compare it.

### Container Actions

Docker container Actions introduce another chain of trust.

The Action may build a container from a Dockerfile in the repository, or it may reference an existing image.

The job is then relying not only on the Action repository, but also on:

- the container registry;
- the image tag or digest;
- the container build process;
- the base image;
- operating-system packages;
- packaged tools and dependencies.

The apparent dependency:

```text
organisation/action@version
```

may therefore conceal a wider graph:

```text
Action repository
    ↓
Dockerfile or image reference
    ↓
Container registry
    ↓
Base image
    ↓
Operating-system packages
    ↓
Downloaded tools and dependencies
```

What looks like one approved component may actually represent several independently mutable supply chains.

## Workflows can execute automatically

The risk is amplified by GitHub Actions' event-driven model.

Once a workflow file reaches the default branch, it can run automatically in response to configured events.

These may include:

- a push;
- a pull request;
- a release;
- an issue or comment;
- another workflow completing;
- a schedule;
- a manually initiated dispatch.

Some of the data associated with those events may be influenced by an attacker.

Pull-request titles, branch names, issue bodies and comments can cross from GitHub event data into shell scripts or automation logic.

The workflow is therefore not only a static pipeline definition.

It is an event-processing program operating across trust boundaries.

A workflow can be secure for one trigger and dangerous for another.

A job that is harmless when initiated by a trusted maintainer may expose credentials when executed for a pull request from a fork.

Small changes to any of the following can substantially alter the security model:

- the trigger;
- the actor;
- token permissions;
- expression handling;
- repository state;
- runner environment;
- access to secrets.

Those changes may not look dramatic during code review.

This is one reason GitHub Actions security is full of edge cases. The outcome depends on the interaction between several controls rather than one obviously dangerous line of YAML.

## The runner is part of the attack surface

Even a perfectly reviewed Action still executes somewhere.

That runner environment forms part of the security boundary.

A runner may contain preinstalled tools, language runtimes, package managers and system libraries. It may have network access to internal services. It may retain files from earlier jobs. It may expose the host's container runtime or execute jobs with elevated privileges.

With self-hosted runners, the organisation also owns questions such as:

- Is the runner ephemeral?
- Can one repository affect another?
- What remains on disk after a job?
- What internal systems can the runner reach?
- How is the runner image built and patched?
- Can workflow code escape into the host?
- What happens if a job is deliberately hostile?

These are not secondary infrastructure concerns.

They determine the blast radius of a compromised workflow.

A workflow cannot be secured solely by examining its YAML. The environment in which it runs determines what the workflow can actually reach, steal or change.

## CI/CD permissions are unusually valuable

GitHub Actions workflows frequently exist to perform privileged operations.

They may:

- publish artifacts;
- create releases;
- push container images;
- update repositories;
- authenticate to cloud platforms;
- sign software;
- deploy applications.

This means CI/CD credentials are not ordinary application secrets.

They are capabilities to alter the software-delivery process itself.

A compromised workflow may steal those capabilities directly. It may also:

- modify an artifact without stealing a credential;
- poison a build cache;
- alter a release;
- inject code into a package;
- create a persistence path that survives after the workflow completes.

The right security question is therefore not:

> Can we guarantee that every Action we use will remain secure?

We cannot.

A more useful question is:

> If one of our Actions becomes malicious, what can it reach, steal or change?

That changes the objective from perfect prevention to controlled failure.

Controls such as SHA pinning, least-privilege tokens, short-lived cloud identities, isolated runners, restricted network paths and protected environments then become layers in a system designed to limit compromise.

## Enterprise controls introduce another hard problem

The obvious reaction is to prohibit external Actions.

That can reduce risk.

It can also remove much of the value that made GitHub Actions attractive.

Teams may be forced to reimplement common capabilities. Central platform groups can become approval bottlenecks. Security updates may take longer because internal forks fall behind upstream releases.

Developers may also copy scripts directly into repositories, making usage harder to discover and govern.

An unrestricted ecosystem is dangerous.

A completely closed ecosystem can become stagnant and expensive.

The real enterprise challenge is to find a defensible point between them:

- enough restriction to control the supply chain;
- enough standardisation to make secure choices easy;
- enough automation to keep approved dependencies current;
- enough flexibility that teams do not route around the platform.

This is not merely a policy-setting exercise.

It is a platform-design problem.

The secure path must also be the easiest path.

## Frontier models raise the stakes

Many GitHub Actions weaknesses are not new.

Mutable references, excessive token permissions, unsafe triggers and injection through untrusted input have existed for years.

What is changing is the cost of discovering and exploiting them.

Frontier models can help attackers:

- inspect large numbers of public workflows;
- reason about event paths;
- identify dangerous permission combinations;
- generate targeted payloads;
- adapt attacks to specific repositories and workflow structures.

They also create an entirely new workflow category: Actions in which models or agents consume untrusted repository content and then use tools capable of modifying code or executing commands.

AI does not create the underlying trust-boundary failures.

It makes finding and operationalising them cheaper.

The defensive implication is important.

Security approaches that rely on obscurity, manual inspection or attackers overlooking subtle workflow behaviour will become progressively less reliable.

## There is no single GitHub Actions security control

It is tempting to reduce this problem to one rule:

- pin every Action;
- allow only verified creators;
- use self-hosted runners;
- block third-party Actions;
- scan every workflow;
- mandate least privilege.

Each of those controls can be useful.

None is sufficient.

GitHub Actions security spans at least six connected layers:

1. Publisher trust - who controls the Action and its release process?
2. Dependency integrity - what exact code, container and transitive components will execute?
3. Workflow design - which events and untrusted inputs can reach privileged operations?
4. Identity and permissions - what credentials and capabilities are available to the job?
5. Runner security - where does the job execute, and what can that environment reach?
6. Enterprise governance - how are usage, exceptions, upgrades and incidents managed at scale?

A weakness in any one layer can undermine controls in another.

That is why securing GitHub Actions is hard.

The platform combines open-source reuse, event-driven automation and privileged execution. Each is powerful independently. Together, they create a system in which trust can enter through many routes and propagate farther than expected.

The answer is not to abandon GitHub Actions.

It is to treat it as critical software-supply-chain infrastructure rather than convenient repository automation.

Over the rest of this series, I will examine the individual parts of that problem:

- how third-party Actions should be evaluated;
- why immutable references matter;
- how triggers and permissions create hidden trust boundaries;
- how runners affect blast radius;
- how enterprises can govern the ecosystem without destroying the developer experience that made it valuable in the first place.
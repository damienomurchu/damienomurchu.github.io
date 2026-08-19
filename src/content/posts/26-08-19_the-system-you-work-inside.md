---
title: "The System You Work Inside"
description: "Transforming my working environment from a collection of tools into a personal platform."
slug: "the-system-you-work-inside"
pubDate: 2026-08-19
modDate: 2026-08-19
draft: true

category: engineering

tags:
  - Personal Systems
  - Work & Organisations
---

# Designing the Engineering Conditions

*A workstation is not just where engineering happens. It is part of the system that makes the work possible.*

In an earlier piece, *Design the Conditions*, I argued that environment is often more reliable than motivation. If I want a behaviour to persist, I should make it easier to perform, harder to avoid and less dependent on how I happen to feel that day.

Over the past few months, I have been applying that idea more deliberately to my engineering work.

I rebuilt a Linux laptop. I consolidated my dotfiles. I refined my shell, created scripts for repeated actions and gave the machines around me clearer roles. I reorganised my desk, introduced more deliberate working modes and carried the visual language of this site into the tools I use to write it.

None of these changes is remarkable on its own. Together, they have changed how I think about the environment in which I work.

I am not assembling the perfect setup. I am building a personal engineering environment: one that protects attention, exposes important state, reduces repeated decisions and makes useful behaviour easier to sustain.

## A setup is not a system

Most working environments are accumulated rather than designed.

We install tools when we need them, copy configuration between machines and add aliases when commands become annoying. Old applications remain because we cannot remember whether something still depends on them. Eventually, the machine works, but the reasons why it works are distributed across memory, shell history and accidents we have forgotten.

That is a setup. It is not yet a system.

A system has boundaries. It has owners. It distinguishes durable configuration from disposable state and makes clear which parts are authoritative. It can be changed without requiring its creator to reconstruct years of decisions from memory.

This distinction is obvious when designing a platform for other engineers. I would not deliberately build a shared engineering platform from undocumented installations, overlapping package managers, hidden state and configuration stored on one irreplaceable machine. Yet it is easy to tolerate exactly those conditions in a personal workstation.

I began asking the same questions of my own environment that I would ask of a platform. What capabilities should it provide? What owns each dependency? Which state should survive the loss of a machine? What should remain consistent across operating systems, and where should they be allowed to differ? Can I reproduce the important parts? Can I reverse a change safely?

The tools matter, but those questions matter more. They turn a collection of preferences into an environment I can reason about.

## Start with attention

Before the operating system, editor or shell, there is the physical environment in which I use them.

My main workspace has gradually become more deliberate: a centred ultrawide monitor, an iPad mounted vertically beside it, whiteboards for persistent context, warmer indirect lighting, controlled cable routing and fixed places for the small objects I use repeatedly.

The objective is not a desk optimised for photographs. It is a space that does not keep asking for my attention.

The ultrawide is the main engineering surface. The iPad is not asked to imitate a laptop; it has a narrower role as a reading, writing and reference device. The whiteboards hold questions, decisions and active threads that would otherwise disappear behind windows or remain in working memory.

Even lighting and cable management belong to the same system. A badly placed cable, harsh light or awkwardly positioned accessory is trivial once. Repeated several times a day, it becomes part of the cost of working.

No single change produces a dramatic gain. That is not how environments work. Their influence is cumulative and often invisible. They remove small decisions and interruptions before those costs have to be consciously noticed.

A good environment should preserve attention for the work, not become the work.

## Give every machine a job

I used to think mainly in terms of primary and secondary devices. I now find it more useful to give each machine a defined role within the wider system.

My Mac mini is the stable centre. It is my primary workstation, the home of heavier local compute, a host for containers and local AI models, and a test bed for workflows that may later make their way onto my work MacBook Pro.

My ThinkPad X1 has become a second primary workstation with a different emphasis. It is a portable Linux operator environment: capable of development, infrastructure administration, Kubernetes work and remote access without existing merely as a thin client for the Mac.

I do not judge it mainly by benchmark scores. I care whether it remains cool, quiet and responsive, whether it behaves predictably on battery and whether I can work on it for several hours without the machine itself becoming the subject. Performance only matters in relation to the work being performed.

The iPad has a deliberately constrained role. It is primarily a thinking and reading device, particularly for long-form material and technical PDFs. It became more useful when I stopped trying to turn it into an inferior laptop.

My personal cloud follows the same principle. A small management node handles persistent operational services. The Mac mini carries heavier workloads. Additional compute nodes can be introduced when there is a real reason to introduce them.

The topology is modest, but the principle scales: responsibilities should drive placement. Hardware becomes easier to reason about when each machine has a job.

## Standardise the model, not the implementation

Once several machines are involved, there is a temptation to make them identical.

That does not survive contact with different operating systems. macOS and Fedora have different strengths, package ecosystems and desktop conventions. Forcing them into a superficial imitation of one another would create more conditional configuration while hiding the advantages of both.

What I want is not identical software. I want an equivalent operating model.

I want familiar shell behaviour, predictable navigation, consistent Git conventions, fast access to project commands and enough visible context to know which machine, repository, shell or Kubernetes environment I am operating in. The application providing a capability can change while the mental model remains stable.

Raycast can be the launcher on macOS while Rofi fills that role on Linux. macOS can retain its native desktop while the X1 uses Fedora, KDE as a complete baseline and Sway as a more focused keyboard-driven environment. The terminal application can differ while Fish, Starship and the underlying command vocabulary remain familiar.

The durable abstraction is the operator experience. Everything platform-specific is an adapter.

Portability of mental models matters more than visual or technical sameness.

## Turn preference into configuration

For years, much of my environment existed as implicit knowledge: packages I knew to install, settings I remembered changing and configuration copied from whichever machine happened to contain the latest version.

I am now treating my dotfiles as a declarative specification of the behaviour I want from an engineering environment.

Chezmoi provides the mechanism, but the useful work has been deciding what belongs in the system. Shell configuration, Git behaviour, editor defaults and application preferences are durable intent. Credentials, histories, caches, application databases and runtime state are not.

The model has three layers:

1. **Capabilities** define what software must exist.
2. **Configuration** defines how that software should behave.
3. **State** contains identity, credentials, history and persistent data.

Those layers should not be collapsed into one directory and copied everywhere.

The same separation applies to a containerised development environment. A Dockerfile defines installed capabilities. Dotfiles define user behaviour. Compose defines runtime resources and mounted state. Each layer changes for a different reason and should have a clear owner.

Package management needs the same clarity. On the X1, DNF owns system packages, Flatpak owns suitable desktop applications, `mise` manages language runtimes and selected development tools, and `uv` manages Python tooling. Chezmoi owns configuration. Git records provenance. Anything placed in `~/.local/bin` should be there deliberately, not because I have forgotten how it was installed.

Entropy arrives quietly. Six months later, the important question is not just whether a command works. It is whether I know why it works, how it got there and what is responsible for keeping it current.

## Build an operator interface

My command-line environment is converging on a relatively small vocabulary: Fish, Starship, Zellij, GitUI, `fzf`, `ripgrep`, `fd`, `bat`, `jq`, `yq`, `uv` and `mise`.

The individual choices are less important than the properties they share. They are fast, composable and discoverable enough to use without turning mastery of the tool into a separate project. They expose useful state without filling the screen with noise.

This is why I do not want the most minimal prompt possible. When I move between local machines, SSH sessions, Git repositories and Kubernetes clusters, the shell, host, branch and active context can all be operationally important.

Minimalism is not the absence of information. It is the removal of information that does not earn its cognitive cost.

That principle is also shaping the Linux desktop. My interest in Sway is not primarily about memory consumption. It is about creating a predictable, keyboard-driven surface with fewer accidental behaviours. KDE remains available as a complete environment and integration layer; Sway gives me a narrower operator interface when that is what the work requires.

The result should feel controlled without becoming brittle. I prefer explicit bindings and a few strong conventions over elaborate rules attempting to predict where every application should open.

## Put automation beneath the interface

I have also been extracting repeated actions into a `personal-automation` repository.

One command can inspect repository changes, synchronise with the remote, generate a proposed commit message, show what it intends to do, request confirmation and push the result. Its details will evolve. The important decision is that the capability exists independently of the interface used to invoke it.

The same command can run from a terminal, appear in Raycast, be called from Rofi or sit behind a Stream Deck button. If any of those interfaces is replaced, the useful part survives.

Durable capabilities should sit beneath replaceable interfaces.

It is easy to bury automation inside a launcher, desktop macro or proprietary device. That works until the interface changes. A named command with clear behaviour is a stronger unit of reuse. The launcher, shortcut or physical button should be an adapter, not the only place where the workflow exists.

## Make modes explicit

One of the more unusual parts of the environment is an emerging set of named working modes: BUILD, READ, DESIGN, EXPLORE, CONNECT and REFLECT.

These are not groups of applications. They describe the kind of cognitive work I am trying to perform.

BUILD should lead towards a working artifact. READ should protect sustained attention. DESIGN should expose constraints and trade-offs. EXPLORE should broaden the search space. CONNECT should bring separate ideas together. REFLECT should turn activity into understanding.

A physical control surface can make those modes visible, but the buttons are not the system. The value lies in the transition: changing what is open, which commands are close at hand, what information is visible and what kind of output I expect to produce.

This is attention management expressed as state management.

Instead of asking my brain to hold every possible workflow at once, the environment can narrow the active possibility space. The useful question becomes not just *which application do I need?* but *what kind of work am I here to do?*

## Build somewhere the consequences are real

My personal cloud has become another part of the engineering environment.

Self-hosting can become either a collection of convenient services or an elaborate attempt to reproduce a small enterprise at home. Neither is especially interesting to me. Its value is giving me somewhere to practise end-to-end ownership.

Every service introduces real questions about deployment, networking, identity, upgrades, observability, backup, recovery and documentation. The consequences are limited, but they are not imaginary. If a service fails, data is lost or an upgrade goes badly, I own the result.

I am gradually defining an operational envelope that each service should inherit: a known deployment method, controlled exposure, authentication where required, monitoring, owned persistent data, backup and enough documentation to recover without depending on memory.

Docker Compose is currently the right deployment unit. Cloudflare Tunnel and Access provide controlled exposure. Uptime Kuma monitors availability. Restic protects service data. ADRs record decisions such as how services are exposed and how ports are allocated.

This is intentionally smaller than an enterprise platform. The point is not to perform enterprise infrastructure at home. It is to maintain a reality-tested environment in which architecture remains connected to operation, failure and recovery.

## Make experience produce artifacts

The environment should produce more than completed tasks.

An investigation can become a script. A recurring decision can become an ADR. A failure can become a runbook. A configuration improvement can move into the dotfiles repository. A pattern that survives several projects can become an article here.

My knowledge and writing systems are increasingly designed around that progression. Ideas begin as seeds. The useful ones grow into drafts. Git-backed repositories hold the durable source, while the publishing workflow moves finished pieces into Forged.

The visual design supports the same continuity. The warm dark palette, restrained surfaces, serif typography for prose and monospace typography for machine-facing information now appear across the site and the tools I use to write it. That coherence is not essential, but it is useful. Moving between tools feels less like entering unrelated environments.

More importantly, the distance between experience and durable output is getting shorter:

**Experience → observation → artifact → reuse → publication → better future work.**

That is the loop I care about. The environment should not merely help me finish today's work. It should allow today's work to improve the system in which tomorrow's work happens.

## Coherence has a cost

There is an obvious failure mode in all of this: configuring the environment can become a substitute for using it.

Tooling work is seductive because it is bounded, visible and immediately satisfying. Real engineering and writing are often ambiguous. It is easy to spend an afternoon improving the prompt rather than confronting the difficult problem the prompt was supposed to help solve.

Every abstraction also creates something new to own. Dotfiles, scripts, container images, themes, launchers and automation repositories all require maintenance. A personal platform can accumulate exactly the kind of complexity it was intended to remove.

I therefore need a threshold for systematising a change. Has the friction occurred repeatedly? Does the solution need to work on more than one machine? Would getting it wrong have meaningful consequences? Will I otherwise pay the cost of rediscovery? Does capturing it create something reusable?

If the answer is no, the boring local fix may be the correct one.

I also need to resist forced uniformity. Common configuration should dominate, but machines and operating systems need explicit exceptions. Equivalent capabilities are more maintainable than pretending every environment is identical.

None of this has a final form. Tools will be replaced. Machines will change roles. Some automation will prove more expensive than the problem it solves. The aim is not to freeze the environment. It is to give it stable principles and replaceable implementations.

## The environment that builds the engineer

The clearest way I can describe what I have been constructing is a personal platform for engineering work.

Its user is my future self.

That framing changes the standard. A good personal platform should reduce cognitive load, expose important state, provide safe defaults, preserve the reasons behind non-obvious decisions and make repeated actions cheaper. It should recover cleanly from change. It should allow useful improvements to spread instead of remaining trapped on the machine where they were discovered.

The tools are only current implementations of those ideas. Fish, Sway, Chezmoi, Raycast, Rofi or a Stream Deck may eventually be replaced. The durable system lies beneath them:

- give components clear roles;
- separate capabilities, configuration and state;
- standardise mental models rather than machinery;
- keep consequential state visible;
- place automation beneath the interface;
- prefer reversible changes;
- turn repeated experience into reusable artifacts;
- accept maintenance only when it purchases recurring leverage.

This is platform engineering at personal scale, but it is also a continuation of the original idea behind designing the conditions.

The environment is not separate from the work. It influences which work begins, how much attention survives, whether good practices remain easy under pressure and what is left behind when the immediate task is finished.

I have been shaping that environment deliberately. In return, the work performed within it is shaping how I think, decide and engineer.

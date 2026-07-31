---
title: "I Never Meant to Build a Personal Cloud"
description: "What began as a home AI lab became a personal platform for experimentation, self-hosting, learning, and building future capabilities."
slug: "i-never-meant-to-build-a-personal-cloud"
pubDate: 2026-07-31
modDate: 2026-07-31
draft: false

category: engineering

tags:
  - Engineering

series:
  id: "personal-cloud"
  title: "Building a Personal Cloud"
  description: "Field notes from building a private platform for local AI, experimentation, and self-hosting."
  order: 1
featured: true
---

## It Started With Local AI

I never set out to build a personal cloud.

I bought a Mac mini because I wanted to experiment with local AI models. It was powerful enough to run useful models through Ollama, and it gave me the freedom to explore without watching API costs, worrying about usage limits, or depending entirely on services controlled by someone else.

At first, the goal was simple: run models locally and use them from the machine sitting on my desk.

That lasted about five minutes.

The models were useful, but their usefulness was constrained by where they were running. I did not want access to them only when I was sitting in front of the Mac mini.

I wanted to use them from my laptop, my iPad, my phone, and potentially from software I built elsewhere.

The moment I asked how to make that possible, the project stopped being about installing Ollama.

It became a platform problem.

## The Mac mini was only the spark

A powerful machine sitting at home changes the kinds of questions you start asking:

- Could it run local AI models? Certainly.
- Could it also host a private interface for interacting with them?
- Could I reach that interface securely when away from home?
- Could the machine run CI/CD agents, internal developer tools, or software supply-chain services?
- Could it become dependable enough to support other projects rather than remaining an experimental box under my desk?

Once personally owned compute becomes powerful, quiet, energy-efficient, and permanently connected, the economics of local infrastructure begin to change.

A home computer is no longer necessarily just a client used to access somebody else’s cloud. It can become a meaningful part of your own computing environment.

Local AI made that especially visible.

Running inference workloads locally provided an immediate reason to own capable hardware, but the same machine could support far more than inference.

The AI lab was only the first workload.

## From application to platform

My first instinct was to expose the models to other devices.

That immediately raised questions about networking, identity, access control, service discovery, certificates, domains, and remote administration.

Then came the operational questions:

- How would I know whether the service was available?
- How would I update it?
- What happened when the machine restarted?
- Where would configuration live?
- How would I recover it after a failure?
- How would I stop an experimental service from becoming an unmaintainable dependency?

These were no longer questions about one application.

They were questions about the environment in which applications would run.

The scope widened naturally:

```
Local AI model
    ↓
Remote access
    ↓
Identity and security
    ↓
Service hosting
    ↓
Monitoring and recovery
    ↓
A reusable platform
```

What started as a lab for exploring specific applications gradually became the foundation of a personal cloud.

The distinction matters.

A lab is somewhere you run experiments.

A platform provides reusable capabilities that make future experiments and services easier to build, operate, secure, and retire.

I wanted both.

## Why build it myself?

I have worked across much of the software delivery lifecycle.

I began in systems analysis, moved through software development and quality engineering, and eventually into cloud platforms, DevOps, DevSecOps, and operations.

That has given me deep experience in individual parts of the lifecycle, but professional systems are usually divided across teams.

One group designs the network. Another manages identity. Another operates the Kubernetes platform.

Application teams own their services. Security teams define controls. Operations teams respond when something breaks.

That separation is necessary at organisational scale, but it can make the whole system difficult to see.

Building a personal cloud creates a rare opportunity to own the complete lifecycle.

I get to define the requirements, choose the architecture, provision the infrastructure, configure the services, design the security model, establish observability, operate the platform, respond to failures, document decisions, and decide when something should be removed.

There is nowhere for ambiguity to hide.

Every trade-off eventually becomes my problem.

That is precisely what makes the project valuable.

It is a small enough environment for one person to understand, but complex enough to expose the same fundamental problems found in much larger platforms.

## Not everything belongs at home

Building a personal cloud does not mean attempting to replace every external service.

Some workloads are cheaper, safer, or more reliable when operated by somebody else.

Some services are not worth the maintenance burden. Others require availability, bandwidth, or operational maturity that would be unreasonable to reproduce at home.

Self-hosting can easily become an ideology: if something *can* be hosted locally, it therefore *should* be.

I do not find that particularly useful.

The better question is:

> Which capabilities are strategically valuable for me to own?

Local AI inference made sense because it supported experimentation and removed usage constraints.

Private development tools made sense because they could support future software projects.

A personal ebook service made sense because it gave me control over my own library.

Monitoring made sense because once services became useful, I needed to know whether they were working.

Each service needed to justify the operational responsibility it introduced.

The objective was never maximum self-hosting.

It was deliberate ownership.

## A cornerstone for other projects

The most important change in my thinking was recognising that the personal cloud was not merely another project.

It was infrastructure for projects I had not built yet.

A private AI interface could support writing, research, and software development.

CI/CD runners could support repositories and automation.

Storage services could support documents, books, media, and backups.

Monitoring could be reused by every future service.

Identity and access controls could provide a consistent security boundary.

Once those capabilities existed, each new project would no longer need to begin from zero.

That is the leverage of a platform.

The value does not come only from the services currently running on it.

It comes from reducing the cost of everything that might be built on top of it.

## Learning from platforms that succeed — and fail

Earlier in my career, I knew engineers who ran highly available Kubernetes clusters in their homes.

I admired the ambition, although I was never convinced that reproducing enterprise complexity was automatically a good use of personal time.

A three-node cluster can teach you a lot.

It can also create a part-time operations job that exists mainly to keep the cluster itself alive.

Professional platform work has shown me that technical sophistication and platform success are not the same thing.

Successful platforms tend to be understandable, secure by default, observable, recoverable, and easy to operate.

Failed platforms often accumulate technologies without developing coherent operating principles.

They optimise for what is interesting to build rather than what is valuable to maintain.

Eventually, the platform becomes more demanding than the workloads it exists to support.

I wanted to bring those lessons into this project from the beginning.

That meant resisting the temptation to start with Kubernetes simply because I could.

It meant treating identity as a primary boundary.

It meant documenting architectural decisions rather than relying on memory.

It meant designing for recovery, not just initial deployment.

And it meant accepting that boring infrastructure is often good infrastructure.

## Why call it a personal cloud?

The term *homelab* would be accurate, but incomplete.

A homelab is often understood as an environment for experimentation. My system certainly serves that purpose, but I also intend it to run services I use regularly and capabilities that other projects can depend upon.

Nor is it a private data centre in any meaningful sense.

It is small, heterogeneous, and deliberately constrained.

I use *personal cloud* because it describes the role I want the system to play.

It is a personally owned computing platform, accessible across devices and locations, providing reusable services under my control.

Some components run inside my home.

Some supporting services remain external.

The important boundary is not physical location.

It is architectural intent and ownership.

## The project that emerged

The initial platform is modest.

A Mac mini provides the primary compute capacity.

A Linux ThinkPad acts as a management and infrastructure node.

Services run using conventional container tooling. Remote administration is handled over a private network. Browser-facing applications sit behind identity-aware access controls.

Monitoring runs independently enough to detect when the main compute node disappears.

None of this is particularly revolutionary.

That is part of the point.

I am not trying to build the most sophisticated personal infrastructure possible.

I am trying to build a system that is useful, understandable, secure, recoverable, and capable of evolving over time.

The interesting work lies not in any individual technology, but in how the pieces fit together.

## Building from first principles

This series will document that process.

It will cover the decisions behind the platform rather than presenting a pile of configuration files as though they appeared fully formed.

I will explore what the platform is for, what belongs on it, and how different devices and workloads should be separated.

I will look at the access and identity model, the choice to favour deliberately simple infrastructure, and the role of observability and recovery.

I will also cover the less glamorous parts: documenting services, creating operational procedures, and deciding when the platform should grow — and when it should not.

The personal cloud began with a local AI model and a simple desire to access it from another device.

But that small request exposed a much larger opportunity.

Instead of building isolated services one at a time, I could build the underlying capabilities that made all of them easier.

I never intended to build my own cloud.

I simply followed the problem until that was what the problem required.
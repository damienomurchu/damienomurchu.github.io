---
title: The runner was easy. The platform was the real engineering
description: Self-hosting a GitHub Actions runner is easy. Turning runners into a secure, scalable, self-service organisational capability is a platform-engineering problem.
slug: building-a-runner-platform
pubDate: 2026-07-28
modDate: 2026-07-28
draft: false

category: engineering

tags:
  - Engineering
  - Tools & Automation

series: 
featured: false
---

## Simplicity can be deceptive

GitHub Actions made CI/CD feel unusually accessible.

A workflow lived beside the code it operated on. It could respond directly to repository events. Reusable actions could be published and consumed with relatively little ceremony. Developers did not need to leave GitHub or learn an entirely separate system before they could automate a build, test, or deployment.

Adoption moved quickly because the interface was compelling. But every GitHub Actions workflow eventually has to run somewhere.

For organisations able to use GitHub-hosted runners, much of that infrastructure could remain invisible. For organisations using GitHub Enterprise Server at the time, that was not an option. Teams that wanted to adopt Actions had to provide their own compute and operate their own runners.

On the surface, this looked easy. Download the runner agent, execute it on a machine, register it with GitHub, and give it a label. It is now ready to accept work.

That is enough to create a runner. It is nowhere near enough to create a runner platform.

## Local solutions appear before organisational ones

The earliest adopters across our organisation built their own solutions.

Some installed the runner agent on persistent virtual machines. Others created automated systems that provisioned ephemeral runners for individual jobs. Some implementations were basic, while others were sophisticated and thoughtfully engineered.

Each team was responding rationally to an immediate need. They wanted to use GitHub Actions, no central service existed, and operating their own runner was the shortest path forward.

The result was predictable. The organisation gradually accumulated a fragmented estate of critical CI/CD infrastructure.

Different teams used different operating systems, images, patching strategies, scaling approaches, credential mechanisms, network configurations, and security controls. Some runners were long-lived. Some were recreated between jobs. Some were closely maintained. Others quietly became part of the organisational furniture.

The workflows were visible in GitHub. The infrastructure executing them was much harder to see.

This is a common platform-engineering pattern. A capability is easy enough for individual teams to create locally, so local implementations spread before the organisation recognises the need for a shared solution.

By the time the need becomes obvious, the problem is no longer simply technical. It is also organisational.

Someone must decide what should be centralised, what should remain under team ownership, what guarantees the shared service will provide, and who will carry the operational burden.

## Capable teams wanted the platform too

It would have been easy to assume that a central runner service was mainly for teams that lacked the skills to operate their own infrastructure.

That was not what happened.

Even teams with sophisticated runner implementations were keen to move to a centrally managed service. Their existing systems were often good. The engineers responsible for them understood autoscaling, ephemeral compute, image management, security, and cloud infrastructure. They could continue operating those systems if they needed to.

They simply did not want to.

Running CI infrastructure was necessary, but it was rarely where those teams created distinctive value. Every hour spent patching runner hosts, updating images, debugging capacity problems, or responding to agent changes was an hour not spent on their own products.

That is one of the clearest signals that something belongs in a platform.

The demand does not only come from teams unable to build the capability themselves. It also comes from capable teams that understand exactly how much ownership costs.

A good internal platform is not a rescue service for weak engineering teams. It is a way to prevent many strong engineering teams from repeatedly solving the same undifferentiated problem.

## The runner was the smallest part of the problem

GitHub recommended Actions Runner Controller, commonly known as ARC, as the basis for our shared service.

ARC used Kubernetes to create and manage GitHub Actions runners. It offered an attractive foundation for ephemeral workloads and automated scaling. Rather than keeping fleets of persistent runner machines alive, runners could be created in response to demand and removed after completing their work.

This addressed part of the problem. It did not answer most of the questions we actually had.

How would teams onboard to the service? Which repositories and organisations would be allowed to use it? What runner environments would we support? How would workloads be isolated from one another? How would a workflow securely authenticate to a cloud account?

What happened when the runner platform was hosted in a different environment from the system a workflow needed to deploy into? How much customisation could users request? How would Windows workloads fit into a system primarily designed around Kubernetes and Linux containers? How would we detect capacity problems, stuck jobs, controller failures, or breaking changes?

And perhaps most importantly, how would three or four engineers operate the service while also owning several other platforms?

None of these questions were solved by installing a controller.

ARC was an important component, but components do not become platforms merely because they are centrally deployed.

## Multi-tenancy is a question of trust

The moment unrelated teams begin executing arbitrary workflow code on shared infrastructure, multi-tenancy becomes one of the defining concerns.

It is tempting to think of multi-tenancy as a scheduling problem: several workloads share a cluster, and Kubernetes decides where they run. The deeper issue is trust.

A CI job can execute code from a repository, install dependencies from the internet, access credentials, interact with internal networks, build deployable artifacts, and modify external environments. That makes a runner a particularly sensitive boundary.

A compromised workflow might attempt to access another workload, inspect the host, query the Kubernetes control plane, reach internal services, steal credentials, poison build outputs, or move laterally into environments reachable from the runner.

Ephemeral runners helped reduce some risks. A clean runner could be created for a job and destroyed afterwards, limiting the amount of state that survived between workloads.

But ephemerality was not the same as isolation.

A disposable workload can still cause significant damage during the period in which it exists. It can still access anything made available to it. It can still exploit excessive permissions, weak network boundaries, vulnerable dependencies, or an incorrectly configured cluster.

The question was therefore not merely whether runners were short-lived. It was what each runner was trusted to access, what could access the runner, and how far a compromise could spread.

Those questions affected cluster design, namespace boundaries, Kubernetes permissions, network policy, node configuration, image hardening, secrets management, and the degree to which different classes of workload could safely share infrastructure.

The technical architecture was really an expression of the trust model.

## Identity was more important than connectivity

Many workflows needed to interact with cloud environments.

The simplest approach would have been to place long-lived cloud credentials on the runners or store them as repository secrets. It would also have created a large and persistent attack surface.

A central runner service made that trade-off even less acceptable. When many organisations and repositories share a platform, static credentials become difficult to control, rotate, attribute, and contain. A compromised runner or workflow may gain access far beyond the job it was meant to perform.

The better model was based on short-lived, workload-specific identity.

A workflow should receive only the permissions it needs, for only as long as it needs them, based on a trust relationship tied back to the organisation, repository, branch, environment, or workflow invoking it.

This changed the problem from distributing secrets to designing identity.

That was a significant improvement, but it also made the platform boundary larger. Cloud IAM configuration, trust policies, GitHub identity claims, environment ownership, and onboarding processes all became part of the runner service.

Networking created a similar challenge.

The runner platform was centralised, while the environments workflows needed to reach were distributed across different networks and cloud accounts. It would have been easy to solve each requirement with another peering connection, firewall exception, proxy rule, or private endpoint.

Taken one at a time, each request could appear reasonable. Taken together, they could turn the runner platform into a highly connected bridge across the organisation.

That would make the platform convenient, but it would also increase the blast radius of a compromise and create an ever-growing operational dependency on the platform team.

The better question was not simply, “How can the runner reach this environment?”

It was, “What is the safest boundary at which this interaction should occur?”

Sometimes the answer was network connectivity. Sometimes it was workload identity. Sometimes it was a different deployment pattern entirely.

A platform team adds value partly by resisting the temptation to treat every user request as an infrastructure request.

## Self-service required deliberate constraints

A shared service could not depend on engineers manually configuring every new repository.

The organisation was adopting GitHub Actions too quickly, and the platform team was too small. Manual onboarding would have made the team a permanent bottleneck.

We needed self-service, but self-service does not mean allowing every user to configure every aspect of the underlying system.

In practice, sustainable self-service required us to decide which choices the platform would expose and which it would deliberately remove.

Users generally did not need to understand the Kubernetes controller, runner pods, autoscaling configuration, node pools, cluster permissions, or upgrade process.

They needed to know which runner environments were available, what guarantees those environments offered, how to request access, how to authenticate to their target systems, and what to do when they needed a capability outside the supported path.

The useful abstraction was not “here is access to our ARC installation.”

It was closer to “here are the supported execution environments your workflows can depend on.”

That distinction mattered.

Exposing the underlying machinery would have transferred complexity rather than removing it. Hiding everything without defining clear behaviour would have created a black box that users could not reason about.

The platform needed a stable contract. That contract included supported runner types, expected tooling, resource limits, security boundaries, authentication patterns, maintenance responsibilities, and the line between platform problems and workflow problems.

Good platform abstractions do not eliminate complexity. They decide where complexity should live.

## Supporting everything would have meant supporting nothing well

Once a shared runner service existed, requests for variation naturally followed.

A team needed a particular tool installed. Another needed a larger machine. Another wanted a persistent cache. Another needed access to an internal network. Another had a Windows workload. Another wanted its own customised runner image.

Every request could be justified in isolation. The problem was cumulative.

Each runner variation created another image to patch, test, secure, document, monitor, and support. Each network path created another dependency. Each exception weakened the consistency of the service. Each bespoke environment increased the amount of knowledge the platform team needed to retain.

This was especially important because the team operating the platform consisted of only three or four engineers, all of whom worked on other services too.

The architecture therefore had to account not only for technical scale, but also for team scale.

A design that could theoretically support every use case was not useful if it required a dedicated operations team to keep it alive.

We had to standardise aggressively. That meant a limited number of supported runner environments, automated image construction, consistent security tooling, reusable onboarding patterns, common observability, and clear criteria for when a request should become a platform capability rather than an exception.

Constraints were not a failure of the platform. They were part of the product.

Without constraints, the shared service would have become a collection of centrally owned bespoke solutions. The infrastructure would have been centralised, but the operational model would still have resembled the fragmented state we were trying to replace.

## Open-source software gave us a foundation, not an operating model

The early road with ARC was rough.

The project could demonstrate how to create runners, but the documentation available at the time did not cover many of the concerns that mattered at enterprise scale.

We needed to understand high availability, scaling behaviour, controller upgrades, runner registration, GitHub job assignment, private networking, image management, observability, and failure recovery.

Much of that understanding came through experimentation.

Some configurations were technically valid but operationally poor. Some behaviours were not documented clearly. Some expectations based on other CI/CD systems did not hold. Some changes to the GitHub runner agent introduced effects that reached all the way into users’ workflows.

Windows support introduced further complexity. It was not on the same supported path as Linux-based runners, and examples for operating it through ARC were limited. We had to bridge the gap between what the project provided and what our users required.

This is another recurring platform-engineering pattern.

An open-source component may solve the central technical mechanism without solving the organisational capability.

A controller can reconcile resources. A scheduler can place workloads. An identity provider can issue credentials. A workflow engine can execute jobs.

The platform team still has to turn those mechanisms into a dependable service. That requires architecture, operating procedures, support boundaries, upgrade strategies, security controls, documentation, observability, and judgement.

The gap between “the software works” and “the organisation can depend on this” is where much of platform engineering happens.

## Maturity elsewhere could still break us

The runner platform did not operate in isolation.

It depended on Kubernetes, GitHub Actions, the runner agent, ARC, cloud infrastructure, container images, authentication systems, security tooling, and users’ workflows.

Each of those systems evolved independently.

GitHub Actions itself was still maturing. Some behaviours were poorly documented or inconsistent with what users expected. Runner-agent updates occasionally introduced breaking changes that required workflows to be modified. Controller changes altered deployment and scaling models. Kubernetes upgrades affected the underlying platform. Security requirements changed as new risks were discovered.

This meant the service could be operationally healthy while still causing user-visible failures.

The cluster might be running. The controllers might be available. The runners might be registering successfully.

But a change in the runner agent, an action dependency, a permission model, or GitHub’s scheduling behaviour could still break workflows across the organisation.

That forced us to think beyond infrastructure monitoring.

We needed to understand the full service path from a workflow being triggered to a job being scheduled, a runner being created, credentials being issued, dependencies being downloaded, and the workflow reaching its target environment.

A platform is only as reliable as the user journey it enables.

Monitoring individual components is necessary, but it is not enough. The system must also be observed from the perspective of the capability users are trying to consume.

## The interface was simple because the system was not

From the user’s perspective, the final interaction could be remarkably small.

A workflow referenced a runner label.

Behind that label sat Kubernetes controllers, autoscaling, hardened images, cloud identity, network design, secrets handling, policy enforcement, logging, metrics, upgrades, vulnerability management, support processes, and operational ownership.

That asymmetry was the point.

The platform absorbed complexity so that every application team did not have to rebuild and operate the same machinery.

But hidden complexity still has to be owned somewhere.

It must be made observable. It must be documented. It must have boundaries. It must be designed so that a small team can maintain it when individual engineers are unavailable, priorities shift, dependencies change, and incidents occur.

The simplicity of the user interface was not evidence that the problem was simple. It was evidence that the complexity had been deliberately moved.

## Centralised infrastructure is not automatically a platform

It is possible to centralise runners without creating a platform.

A team could deploy ARC, operate a shared Kubernetes cluster, publish a few runner labels, and declare the problem solved.

That would produce shared infrastructure.

A platform requires more.

It needs a coherent user experience, self-service onboarding, secure defaults, supported patterns for identity and connectivity, a deliberate multi-tenancy model, clear ownership boundaries, observability based on user outcomes, and an operating model that fits the team responsible for it.

Most importantly, it needs to reduce the total burden placed on the organisation rather than merely transferring that burden to a central team.

That is why self-hosted GitHub Actions runners are such a useful platform-engineering case study.

The core technical mechanism is easy to understand. A runner accepts a job and executes a workflow.

Everything that makes that capability safe, scalable, dependable, and usable is where the real engineering begins.

The runner was easy.

The platform was the real work.

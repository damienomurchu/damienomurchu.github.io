---
title: "The Runner Is Part of the Security Boundary"
description: "Runner isolation, persistence and network access materially change the threat model for GitHub Actions."
slug: "gha-runner-security-boundary"
pubDate: 2026-10-23
modDate: 2026-10-23
draft: false

category: engineering

tags:
  - Engineering

series:
  id: "github-actions-security"
  order: 4
featured: true
---

## Trusted Code Still Needs Somewhere to Execute

In Part 3, we looked at why pinning GitHub Actions to full commit SHAs is necessary, but does not guarantee reproducible or trustworthy execution.

There is another part of the problem.

Even if we have reviewed an Action, pinned it appropriately, and accounted for its dependencies, that code still needs somewhere to execute.

That somewhere is the runner.

It is tempting to think of a runner as little more than compute capacity. A machine picks up a job, executes some instructions, returns a result, and moves on.

Except that a runner is also an execution environment. It has a filesystem, an identity, credentials, network access, and some form of lifecycle.

All of those characteristics influence what happens when something executing inside a workflow turns out to be malicious.

The same compromised Action executing on an isolated, disposable runner presents a very different risk from one executing on a persistent machine with broad access to internal infrastructure.

The code has not changed.

The potential consequences have.

## Hosted and Self-Hosted Are Different Trust Models

GitHub Actions gives us two broad approaches to execution infrastructure: GitHub-hosted and self-hosted runners.

For standard GitHub-hosted runners, GitHub manages the underlying infrastructure and provisions a fresh virtual machine for each job. Once execution finishes, that environment is discarded.

This provides a useful security property. Changes made to the environment during one job do not ordinarily survive into the next.

It does not mean the job itself is safe.

Malicious code can still access credentials made available during execution, interfere with build outputs, modify artifacts, or communicate with external systems. A disposable execution environment limits persistence. It does not prevent a compromise while the job is running.

Self-hosted runners introduce a different set of considerations.

There are plenty of legitimate reasons to operate them. Specialised tooling, predictable capacity, cost, performance, private network connectivity, and greater control over execution infrastructure are all reasonable motivations.

But self-hosting also means assuming responsibility for security properties that GitHub would otherwise provide or manage.

In particular, GitHub does not guarantee that self-hosted runners execute in a clean, isolated environment.

That is now our problem to solve.

And the consequences of getting it wrong become clearer when we look at what can survive between jobs.

## Persistence Is the Problem You Need to Account For

Consider a self-hosted runner registered at organisation level.

It picks up a workflow, executes the job, reports success, and becomes available for another job.

Nothing particularly unusual about that.

Now imagine that one of its workflow steps executes malicious code.

Depending on the privileges available, that code might modify local tooling, leave files outside the working directory, start a background process, capture credentials, or interfere with the environment in ways that are not immediately visible.

The workflow might even complete successfully.

If the same machine subsequently executes another job, we now have a problem that extends beyond the original workflow.

This is why cleaning a workspace is not equivalent to providing a clean execution environment.

Deleting a repository checkout does not undo arbitrary changes made to the host.

GitHub recommends ephemeral self-hosted runners for autoscaling, where a runner accepts one job before being automatically deregistered.

That is a sensible starting point, but there is an important distinction worth making.

**An ephemeral runner registration does not automatically mean ephemeral infrastructure.**

If we deregister a runner but reuse its underlying machine, filesystem, or execution environment without properly recreating it, we may still carry the consequences of one job into another.

The property we actually want is that each job begins from a known, clean execution environment, with no unintended state inherited from a previous workload.

Ephemerality needs to be designed into the infrastructure lifecycle, not simply the runner registration.

## A Container Is Not Automatically a Security Boundary

One approach to managing this lifecycle is to provision runners dynamically using containers.

Kubernetes makes this particularly attractive. We can schedule runner workloads, scale capacity in response to demand, and remove execution environments once jobs have completed.

Actions Runner Controller (ARC) provides a way of managing GitHub Actions runners using this model.

Having spent a considerable amount of time operating this kind of infrastructure, I think there is a lot to like about the approach.

It also introduces a trap.

It is easy to equate running a job inside its own container or Kubernetes pod with having sufficiently isolated that job.

Those are not necessarily the same thing.

Containers generally share the underlying host kernel. Their isolation depends on how they are configured, which privileges they receive, what host resources are exposed, and what capabilities are available to the processes running inside them.

A runner with privileged access, host filesystem mounts, access to a container runtime socket, or excessively permissive Kubernetes credentials may have considerably more influence over its surrounding infrastructure than intended.

And if the runner can compromise the host or interfere with the orchestration environment, the fact that it was originally provisioned as a disposable container offers limited comfort.

None of this makes containerised runners inherently unsuitable.

It means we need to be precise about what we are isolating, from what, and which assumptions that isolation depends on.

A dedicated VM, a container, and a more strongly isolated execution environment are not interchangeable simply because each can run a GitHub Actions job.

The appropriate choice depends on the workload and the security boundary we need to maintain.

## The Runner Can Reach More Than the Workflow Declares

There is another aspect of runner security that I think is easy to underestimate, particularly with self-hosted infrastructure.

Network reachability.

Consider why an organisation might deploy runners inside its own AWS environment.

Perhaps workflows need access to private artifact repositories, internal APIs, deployment endpoints, EKS clusters, or infrastructure that is deliberately unavailable from the public internet.

All perfectly reasonable requirements.

But consider that environment from the perspective of malicious code executing inside a workflow.

What can it reach?

Can it communicate with internal services? Does the underlying compute environment provide an IAM role? Are cloud metadata endpoints accessible? Are there credentials, sockets, or mounted resources available beyond those explicitly supplied by the workflow?

A malicious Action does not necessarily need a repository secret to cause damage.

It may be able to make use of the runner's existing infrastructure permissions or network position.

This is an important distinction because we tend to discuss workflow credentials in terms of `GITHUB_TOKEN`, repository secrets, environment secrets, and OIDC.

Those controls matter. We should minimise token permissions, avoid unnecessary long-lived credentials, and scope cloud access appropriately.

But restricting the credentials explicitly passed into a job is only part of the problem.

A narrowly scoped `GITHUB_TOKEN` does not compensate for an overly permissive IAM role attached to the underlying compute.

Likewise, a runner being deployed in a private subnet tells us very little about its security if that subnet has broad connectivity to sensitive internal systems.

The runner's infrastructure identity and network position are part of the workflow's effective capabilities, whether or not they appear anywhere in the workflow YAML.

## Shared Infrastructure Means Shared Consequences

The next consideration is how runners are shared.

From a platform engineering perspective, shared runner fleets make considerable sense. Centralised management, improved utilisation, consistent tooling, and reduced duplication are all desirable properties.

But sharing infrastructure also requires us to think about the relationships between the workloads consuming it.

Imagine an organisation using the same runner fleet for routine pull request validation and production deployments.

The first workload may involve executing code that has not yet been reviewed or merged.

The second may require elevated permissions, sensitive credentials, and connectivity to production infrastructure.

They are both GitHub Actions jobs, but they do not have the same trust requirements.

If they share persistent execution environments, overly permissive underlying infrastructure, or access to common sensitive resources, a compromise in the less trusted workload may have consequences for the more privileged one.

Runner groups can restrict which repositories and workflows have access to particular runner resources. They are useful for controlling where jobs are scheduled.

But access to a runner group and isolation of the underlying infrastructure are separate concerns.

We need to consider both.

There is no requirement for every repository to have dedicated infrastructure, nor is a shared fleet inherently a bad design.

The question is whether workloads with different trust and privilege requirements are sharing a boundary they should not be sharing.

Operational convenience should not be the only thing determining that boundary.

## Assume One Job Will Be Compromised

I think this is a useful starting point when evaluating runner infrastructure.

Rather than beginning with a particular deployment technology, assume that one workflow job executes malicious code.

It could arrive through a compromised third-party Action, an untrusted dependency, a pull request, or a mistake in the workflow itself.

The initial cause is less important for this exercise than what follows.

What can that code access?

What credentials are available to it, and what permissions does the underlying infrastructure provide?

Which internal systems can it reach?

Can it modify the execution environment beyond its own job? Could those modifications survive once the job finishes?

Can it influence another workload, compromise the host, or interfere with the infrastructure responsible for provisioning future runners?

And, perhaps most importantly, what do we need to destroy, rebuild, or revoke before we can reasonably trust that environment again?

The answers tell us considerably more about the security of our runner platform than whether we describe it as hosted, self-hosted, containerised, or ephemeral.

They also give us a basis for making practical design decisions.

Disposable execution environments reduce opportunities for persistence. Separating workloads by trust and privilege reduces the potential for one compromised job to affect another. Restricting infrastructure permissions and network connectivity limits what malicious code can do during execution.

There are operational considerations too. If our runners are disposable, their diagnostic and security logs need to survive somewhere outside the execution environment. Otherwise, destroying a compromised runner may also destroy useful evidence of what happened.

None of these controls guarantees that the code executing inside a workflow is trustworthy.

That is not what they are intended to do.

They are there to limit the consequences when it isn't.

## The Workflow Is Only Part of the Threat Model

Across the first three parts of this series, we have looked at the risks introduced by third-party Actions, the dependency decisions involved in using them, and the limitations of pinning those dependencies.

All of those discussions focus primarily on the code we choose to execute.

But execution does not happen in isolation.

A workflow with carefully reviewed dependencies, appropriately pinned Actions, and restricted GitHub permissions can still execute on infrastructure with excessive privileges, persistent state, or unnecessary access to sensitive systems.

And conversely, a well-designed runner platform can materially constrain the impact of a compromised Action.

This is why I think it is a mistake to treat runner architecture as simply an operational concern, separate from GitHub Actions security.

The runner determines what our workflow can access, what it can influence, and potentially what it can leave behind.

**The security boundary does not end at the workflow YAML.**

---

### References

- [GitHub — Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub — Self-hosted runners reference](https://docs.github.com/en/actions/reference/runners/self-hosted-runners)
- [GitHub — Managing access to self-hosted runners using groups](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/manage-access)
- [GitHub — Actions Runner Controller](https://docs.github.com/en/actions/concepts/runners/actions-runner-controller)

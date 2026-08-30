---
title: "Find the Bottleneck"
description: "Personal systems are not really about productivity. They are about identifying and removing the constraints that limit our ability to turn effort into impact, influence and results."
slug: "find-the-bottleneck"
pubDate: 2026-09-01
modDate: 2026-09-01
draft: false

category: engineering

tags:
  - Personal Systems
  - Engineering

series: 
featured: false
---

# Find the Bottleneck

I have spent a lot of time over the last few years improving the systems around how I work.

I have built small CLI tools to capture decisions, actions and friction. I keep operational documentation in Git. I automate repeated actions, maintain conventions for how things are organised, and increasingly use tools like Raycast, Stream Deck and window management automation to move between different working states with less effort. I have built workflows around writing, publishing, knowledge capture and review, and I deliberately think about my working environment as a system rather than a loose collection of applications.

Taken individually, some of this can look like productivity optimisation, or perhaps just an engineer finding increasingly elaborate ways to avoid clicking things.

But that isn't really what connects it.

All of these things are attempts to solve the same underlying problem:

**Identifying and addressing the bottlenecks in ourselves and the systems around us that prevent us from scaling our impact, influence and results.**

## We are systems too

Engineers already understand this idea when dealing with technical systems.

When a service is performing badly, we do not usually respond by making every component faster. We try to understand where the constraint actually is. Perhaps a database is saturated, work is queueing behind a limited worker pool, releases depend on a slow manual approval process, or the actual bottleneck is an organisational dependency rather than the technology at all.

Optimising something that is not constraining the system may make that component objectively better while doing almost nothing for the performance of the system as a whole.

I think personal effectiveness works in much the same way.

At any point there is some constraint limiting our ability to turn effort into useful results. The difficult part is that the constraint does not remain in the same place.

At one stage it may simply be knowledge or technical capability. Later it might be attention, memory, communication, coordination, energy, influence, or our ability to reliably follow through on commitments. It might be the difficulty of retrieving something we already learned, the number of decisions we repeatedly force ourselves to make, or the amount of context we have to reconstruct every time we return to a piece of work.

Working harder does not necessarily address any of those things.

Sometimes it just pushes harder against the wrong part of the system.

## The bottleneck moves

Early in a career, capability is often the obvious constraint. You simply need to know more and become better at doing the work, which makes learning enormously valuable.

Eventually that changes.

You become capable of solving most of the technical problems in front of you, but find that you cannot keep all of the surrounding context in your head. So you start writing more things down.

That helps, until the problem becomes finding what you wrote.

Now memory is no longer the primary constraint. Retrieval is.

You improve the structure of your notes, documentation or repositories. Later, perhaps you notice that starting certain kinds of work involves repeatedly opening the same applications, arranging the same windows, finding the same files and mentally reconstructing the same context. The constraint has moved again, this time towards activation energy and coordination.

Eventually even execution itself may stop being the biggest limitation. Your ability to communicate an idea, influence a decision, make your work visible, or help other people operate more effectively might matter far more than your individual throughput.

This is one reason I have become increasingly sceptical of generic productivity systems.

Someone else's workflow is an optimisation for someone else's constraints.

The interesting question is not *what system should I copy?*

It is:

**What is constraining me now?**

## Friction is telemetry

One of the more useful changes in how I think about work has been learning to treat recurring friction as telemetry.

Something I repeatedly forget is a signal. So is a command I repeatedly reconstruct, a piece of information I know exists but cannot find, a workflow with several unnecessary steps, or a decision I find myself making again and again.

The irritation itself is not the interesting part. The repetition is.

Recurring friction is often evidence that the human operator is compensating for a weakness in the surrounding system.

That does not mean every inconvenience deserves automation. Quite the opposite. Automating a process that happens twice a year is often just another way to create maintenance work.

The useful question is whether the friction occurs frequently enough, or is expensive enough when it occurs, that addressing it materially improves the system.

A thirty-second inconvenience encountered once is probably irrelevant.

A thirty-second interruption that breaks concentration twenty times a day is not.

## Moving the bottleneck is not the same as removing it

There is another trap I have encountered repeatedly: improving one stage of a workflow without looking at what happens downstream.

Capture is a good example.

I care a lot about making it easy to capture actions, decisions, follow-ups, ideas and moments of friction. The reason is obvious: if recording something requires too much effort, eventually I will stop doing it.

But making capture effortless does not make the system effective.

If the captured information is never reviewed, acted upon or converted into something durable, I have not solved the problem. I have simply moved the bottleneck from capture to processing.

This happens constantly in personal knowledge management. We build increasingly sophisticated inboxes and wonderfully frictionless ways to save information, then quietly accumulate a large pile of things we never look at again.

The actual loop is closer to:

**Capture → Review → Decide → Act → Learn → Codify**

Every stage matters.

If things reliably enter the system but rarely emerge from the other side, optimising ingestion further is unlikely to help.

I see the same thing in writing. Generating ideas has rarely been the difficult part for me. Turning those ideas into finished writing is harder. Extracting worthwhile ideas from conversations and experiences before they disappear is another problem entirely.

The bottleneck is not necessarily creation.

Often it is processing.

## We spend a surprising amount of time coordinating with ourselves

A large amount of personal overhead comes from communicating poorly with our past and future selves.

Where did I put that?

How did I solve this last time?

Why did I make this decision?

What was I doing when I stopped working on this?

What command did I use?

What did I promise somebody I would follow up on?

What was the next step?

Every time those questions have to be answered from scratch, we pay a reconstruction cost.

This is why I increasingly value things that are almost aggressively boring: predictable repository structures, terse documentation, conventions, decision records, scripts, structured capture and version-controlled configuration.

None of those things are particularly interesting in isolation.

Their value is that they allow useful decisions to survive the moment in which they were made.

They reduce the amount of state I need to carry around in my own head and make it easier for future me to resume where current me stopped.

That is leverage.

## Make repeated decisions disappear

Some decisions deserve thought.

Most repeated decisions do not.

Where should this file live? How should I start a new article? How should this repository be structured? How do I publish something? What do I open when I enter a particular working mode? Where do I record something that needs following up?

If the answer is effectively the same every time, there is little value in repeatedly deciding it.

A convention is a decision made once.

A good default is stored judgement.

An automation is a decision that has become infrastructure.

This is one of the things I find most compelling about building personal systems. A small amount of thought today can remove hundreds of tiny decisions from the future.

The benefit is not the seconds saved by avoiding a click.

It is the attention that is no longer spent on something that does not deserve it.

## Externalise operational state

Computers are much better at storing state than humans are.

Yet we routinely build working environments that depend heavily on remembering things ourselves.

That seems backwards.

Tasks should live in a system designed for tasks. Decisions should be recorded somewhere they can be rediscovered. Commands that matter should become scripts or documentation. Configuration should live in version control. Repeated workflows should have names. Commitments should have an explicit mechanism for resurfacing them.

The objective is not to externalise thinking.

It is to externalise the parts that do not require thinking.

Human attention is expensive. Using it as a storage medium is a poor allocation of resources.

## Scale judgement, not activity

Eventually there is a harder constraint that no productivity system can remove: time.

There are only so many hours in a day, and increasing impact indefinitely by simply completing more tasks is impossible.

The answer has to become leverage.

You build something once that can be reused many times. You automate a process that previously required repeated effort. You document something so that the next person does not need you to explain it. You create a platform that makes an entire group more effective. You make a decision that prevents a category of future problems. You write something that changes how other people understand a problem.

In each case, the impact of the work escapes the hour in which the work happened.

That changes the optimisation target.

The question is no longer:

**How can I do more?**

It becomes:

**How can more useful results emerge from the same amount of attention?**

That is a much more interesting problem.

## The system itself can become the bottleneck

There is, of course, an obvious danger in all of this.

Once you start viewing your working environment as a system, improving the system can become endlessly interesting. There is always another automation to build, another tool to try, another abstraction to introduce, another workflow to formalise and another piece of configuration to refine.

At some point, the productivity system can become the thing consuming the productivity.

I am increasingly wary of this.

My preference now is to let the problem earn the solution.

Experience the friction first. Notice whether it repeats. Understand what it is actually costing. Then decide whether an intervention is justified.

Only after that should the solution become a convention, workflow or automation.

Otherwise it is remarkably easy to build infrastructure for behaviours you do not actually have.

## There is no final system

I no longer think there is a final form of any of this.

There cannot be, because improving one constraint changes the system.

The thing that limited me five years ago is not necessarily what limits me today. Hopefully the thing limiting me today will not be what limits me five years from now.

That is not a failure of the system.

It is the point.

As capability grows, the constraint moves. The job is to notice where it moved to.

So the most useful question may not be *how can I become more productive?*

It may be:

**What is currently limiting the amount of useful impact I can create?**

Sometimes the answer will be technical capability. Sometimes it will be attention, energy, communication, influence, poor retrieval, lack of follow-through, excessive coordination, or simply spending time on work that does not matter enough.

Find the constraint.

Address it.

Then look again.

Because the purpose of a personal system is not to become increasingly organised.

It is to keep increasing the capability and leverage of the person operating inside it.


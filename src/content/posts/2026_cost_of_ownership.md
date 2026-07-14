---
title: Hidden costs of ownership
description: The obligations, friction, and opportunity costs hidden behind acquiring and keeping things.
slug: cost-of-ownership
pubDatetime: 2026-07-12T00:00:01Z
modDatetime: 2026-07-12T00:00:01Z
draft: false

category: engineering

tags:
  - Personal Systems

series: 
featured: false
---

## Initial cost != total cost

The price of acquiring something is rarely its true cost. The purchase price is merely the most visible part: a number that appears on a receipt, an invoice, or a budget request. It is concrete, immediate, and easy to compare. The rest of the cost is distributed across the future, where it becomes much harder to see.

Anything we own must be stored, maintained, understood, secured, upgraded, worked around, or eventually disposed of. It occupies physical space, mental space, organisational space, or some combination of all three. Even something that is free can be expensive to own.

I understand this instinctively in my professional life. When assessing a tool or platform, I rarely consider only what it costs to acquire. I think about operational burden, maintenance, support, security, integration, migration, documentation, and the long-term consequences of introducing it into an organisation.

I am much less consistent about applying the same thinking to my personal life.

## Acquisition Is an Event. Ownership Is a System.

Buying something happens once. Owning it continues.

That distinction matters because the initial transaction is usually the easiest part of the relationship. The deeper costs emerge later, often in small and seemingly insignificant increments.

A physical object needs somewhere to live. It may need cleaning, repairing, charging, insuring, organising, or replacing. A piece of software needs updating, configuring, learning, backing up, and occasionally migrating away from. A service needs monitoring and someone who knows what to do when it stops working.

None of these costs may be particularly large in isolation. The problem is accumulation.

A single object rarely creates intolerable clutter. One application rarely destroys a workflow. One additional platform rarely overwhelms an engineering team. But ownership scales poorly when every new thing introduces another set of obligations, decisions, dependencies, and failure modes.

The dangerous cost is not always money. More often, it is the gradual fragmentation of attention.

## The Maintenance Tax

Maintenance is the most obvious hidden cost of ownership, but even this is usually underestimated.

We tend to imagine maintenance as occasional repair: something breaks, we fix it, and the object returns to normal. In reality, maintenance includes all the effort required to keep something useful. It includes remembering where accessories are stored, finding replacement parts, learning how something works, installing updates, managing subscriptions, keeping documentation current, and retaining enough knowledge to troubleshoot problems months later.

In software engineering, we understand this as operational ownership. A service does not stop costing us once it reaches production. It requires monitoring, incident response, dependency upgrades, security patches, capacity planning, support, and eventually decommissioning.

The same principle applies outside work. A cheap appliance that breaks frequently may cost more than an expensive reliable one. A bargain piece of furniture that is awkward to move may extract its price every time the room is rearranged. A self-hosted service might be free in monetary terms while consuming hours of attention every month.

Maintenance is not merely what happens when something breaks. It is the ongoing tax required to prevent it from becoming useless.

## The Cost of “Good Enough”

I recently bought a desk that is good enough. It is sturdy, looks fine, and performs its primary function, but it is missing one feature that increasingly matters to me: built-in cable management.

That omission seemed minor when I bought it. Cable management is not the primary purpose of a desk, and it felt unreasonable to reject an otherwise suitable option because of it. The problem is that small design omissions become recurring friction.

The lack of cable management means additional trays, clips, ties, and improvised solutions. It makes the desk harder to keep tidy and more annoying to reconfigure. Every new device introduces another small negotiation with the physical constraints of the desk.

None of these problems justify replacing it, and that is precisely why the decision has such persistence.

A terrible desk would be easy to replace. A perfect desk would not need replacing. A desk that is good enough but consistently irritating occupies the awkward territory between the two. It does not fail severely enough to force action, but it creates enough friction to be noticed repeatedly.

This is one of the least obvious costs of ownership: the power of an adequate existing solution to prevent the adoption of a substantially better one.

Once we own something, the comparison is no longer between two products. It is between the full cost of the new product and the perceived cost of continuing with the existing one. The existing thing feels free because we have already paid for it, but continuing to own it is not free. Its future friction remains unpaid.

## Ownership Creates Opportunity Cost

Every choice closes other choices.

Money spent on one thing cannot be spent elsewhere, but the opportunity cost of ownership goes beyond the original purchase. Once we possess something that is broadly sufficient, we are less likely to consider alternatives.

We do not buy the better chair because we already have a chair. We do not redesign the workflow because the current process technically works. We do not replace the platform because migrating would be disruptive. We continue to pay for yesterday’s decision because the cost is spread thinly enough to remain tolerable.

This is path dependence: previous decisions constrain the decisions available to us now.

The effect can be particularly strong when the existing system carries accumulated investment. We have learned how to use it, configured it, integrated it with other systems, built habits around it, and perhaps convinced other people to adopt it. Replacing it means accepting that some of that investment will not be recovered.

This is where ownership interacts with the sunk-cost fallacy. We treat past expenditure as a reason to preserve the current arrangement, even though the better decision should be based entirely on future costs and benefits.

Sometimes, the highest impact move is to replace the thing that still works—not because it is broken, but because its continued existence prevents a disproportionately better system from taking its place.

## Clutter Is Not Passive

Physical clutter is often discussed as an aesthetic problem, but its deeper cost is cognitive.

Every visible object is a small piece of unresolved information. It may represent something to organise, repair, use, sell, store, or decide upon. Even when we are not actively thinking about it, the object contributes to the environment our attention must process.

The same is true of digital clutter. Unused applications, abandoned repositories, stale documents, unread newsletters, dormant subscriptions, and half-configured services do not merely sit there. They expand the surface area of our lives.

They create more places to search, more systems to remember, more notifications to interpret, more credentials to protect, and more uncertainty about where the current version of something lives.

We often underestimate this because the cost of any individual item is nearly zero. The psychological cost emerges from the total number of unresolved objects and systems competing for a small amount of attention.

Things we own become a source of low-level friction. That friction is rarely dramatic enough to identify as a problem, but it can shape how calm, focused, and capable we feel. An environment does not need to be visibly chaotic to be operationally expensive.

## Names Also Have a Cost of Ownership

Not everything we own is physical. Organisations also own concepts, interfaces, terminology, and names.

One of the services I own at work is called Code Scan. It is our managed SonarQube service.

The name is understandable. It describes, in broad terms, something the service does. It is also so generic that it creates problems.

“Code scanning” could mean static analysis, dependency scanning, secret scanning, container scanning, infrastructure-as-code scanning, or several other security activities. As the organisation’s capabilities grow, the name becomes increasingly ambiguous.

The service still works, and the name has not technically failed. Yet every conversation now carries a small translation cost.

People must learn that Code Scan refers specifically to our SonarQube service rather than the wider category of code-scanning tools. Documentation must compensate for the ambiguity. New services must be named around terminology that has already been claimed. The organisation’s mental model becomes slightly harder to understand.

Changing the name now would also have a cost. Documentation would need updating. Integrations might contain references to the old name. People would continue using the previous terminology. For some period, both names would coexist, increasing confusion before eventually reducing it.

This is the cost of ownership applied to language.

Names create interfaces between people and systems. Once adopted, they accumulate dependencies just as software does. A weak name is not merely a branding problem; it is a form of conceptual technical debt. The initial naming decision may take minutes, but the organisation may live with its consequences for years.

## Switching Costs Protect Weak Systems

The longer we own something, the more tightly it becomes connected to everything around it.

A desk determines the position of monitors, cables, drawers, and lighting. A software tool accumulates integrations, documentation, permissions, and trained users. A name becomes embedded in meetings, dashboards, repositories, and organisational vocabulary.

These connections increase the cost of change.

That can be useful. Stability has value, and constant replacement is its own form of waste. Switching tools every time something shinier appears produces fragmentation, migration fatigue, and shallow expertise.

But switching costs also protect mediocre systems from competition. An existing solution does not need to remain the best option; it merely needs to be less painful than changing it.

This creates a dangerous asymmetry. The costs of migration are visible and concentrated, while the costs of staying are dispersed and normalised. One appears as a project requiring time, money, and approval. The other appears as another year of small frustrations.

As a result, we often demand overwhelming evidence before replacing something, even though we required far less evidence before adopting it.

The better question is not simply, “Does the current thing still work?” It is, “Knowing what we know now, would we choose this again?”

If the answer is no, continued ownership deserves scrutiny.

## Own Fewer Things, but Own Them Deliberately

The obvious conclusion might be that we should own as little as possible. There is some truth in that. Every reduction in possessions, tools, services, and systems reduces the surface area we must maintain. Simplicity creates capacity.

But ownership itself is not the problem. Poorly considered ownership is.

Some things repay their costs many times over. A well-designed tool can eliminate recurring friction. A reliable system can reduce uncertainty. A carefully chosen object can make an activity easier or more enjoyable for years.

The goal is not minimalism for its own sake. It is to maintain a higher standard for what we allow to create ongoing claims on our time and attention.

Before acquiring something, it is worth asking what maintenance it will require, what space it will occupy, and what decisions it will create. We should consider what other options it might discourage us from considering, how difficult it will be to replace or remove, and what dependencies will form around it.

Perhaps the most useful question is this: would I still want to own this if the purchase price were zero, but all the ongoing obligations remained?

These questions are useful for furniture, software, subscriptions, services, processes, and platforms. They apply to almost anything that persists beyond the moment of adoption.

## The Cost Continues Until the Thing Is Gone

The true cost of ownership is the sum of all the future attention a thing demands. That includes maintenance, storage, learning, administration, opportunity cost, switching cost, and the subtle friction created by living with something that is almost—but not quite—right.

The initial price is merely the admission fee.

Once we recognise this, a cheaper purchase may no longer look cheaper, and a free tool may no longer look free. Keeping an existing system may no longer appear to be the conservative option.

Sometimes the highest-leverage decision is to buy the better thing from the beginning. Sometimes it is to replace something before it fails, or to rename a system while the change is still manageable. And sometimes it is simply to remove something that has quietly been charging rent in our lives for years.
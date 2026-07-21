---
title: "How judgement, not technical skill, defines a senior engineer"
description: Why technical ability is only the foundation of seniority, and sound judgement determines who can be trusted with consequential engineering decisions.
slug: "judgement-defines-a-senior-engineer"
pubDatetime: 2026-07-20T00:00:01Z
modDatetime: 2026-07-20T00:00:01Z
draft: false

category: engineering

tags:
  - Engineering
  - Work & Organisations

series: 
featured: true
---

## Seniority begins where certainty ends

I have worked with technically accomplished engineers whom I would not trust to make a critical production change. They could understand the system, write the code, and navigate difficult technical problems. Some had senior titles and longer careers than most of the engineers around them.

But when a change was difficult to reverse, when several teams depended on the outcome, or when the requirements were incomplete, I did not trust the decisions they were likely to make. The problem was not whether they could deliver a solution. It was whether they would identify the right problem, choose a proportionate solution, recognise the important risks, and understand the wider consequences of the work.

That distinction is central to engineering seniority.

Technical skill determines what an engineer is capable of building. Judgement determines what they decide should be built, how it should be introduced, and whether the result will remain valuable after the implementation is complete.

At junior levels, technical ability is usually the dominant constraint. Engineers need to learn how systems work, how to write maintainable software, how to debug failures, and how to use the tools of the profession. As an engineer becomes more senior, however, the nature of the constraint changes.

The difficult question is no longer simply:

> Can you implement this?

It becomes:

> What is the right thing to do here?

That question contains many others. What problem are we actually solving? Which risks deserve attention? What can safely be deferred? How much complexity is justified? Who will operate the result? How easily can the decision be reversed? What are we making easier, and what are we making harder?

These are not questions separate from technical engineering. They are what technical engineering becomes when the scope and consequences increase.

## Technical skill creates the decision space

Sound engineering judgement depends on technical competence. An engineer cannot properly evaluate trade-offs they do not understand. They cannot distinguish a safe shortcut from a reckless one without understanding the system underneath it, and they cannot anticipate failure modes if they lack a sufficiently accurate model of how the technology behaves.

Technical depth creates the decision space. It gives an engineer more possible approaches, a better understanding of their consequences, and a greater ability to detect when an apparently simple solution hides significant risk.

But having more options does not guarantee a better choice. A highly capable engineer can still over-engineer a straightforward problem, introduce an unnecessary technology, construct an elegant abstraction nobody needs, or optimise a system whose real constraint lies elsewhere. The implementation may be sophisticated while the decision remains poor.

Technical skill answers:

> What could we build?

Judgement answers:

> Which option best serves the system, the organisation, and the people who will inherit it?

As an engineer’s scope grows, the second question becomes increasingly important.

## Experience does not automatically become judgement

Judgement is usually built through experience. Engineers encounter failures, migrations, ambiguous requirements, operational constraints, difficult stakeholders, production incidents, and decisions that looked reasonable but produced unexpected consequences. These experiences can compound into better instincts, but only if someone learns from them.

Ten years in engineering is not necessarily ten years of development. It can be one narrow year repeated ten times.

Two engineers can pass through the same incident and extract entirely different value from it. One remembers the immediate cause and the eventual fix. The other asks why the failure was possible, which assumptions proved false, what signals were ignored, why the safeguards did not work, and whether the same weakness exists elsewhere.

The second engineer is doing more than accumulating experience. They are converting specific events into reusable models.

That is why seniority is not a linear function of tenure. Some engineers progress faster because they extract more from each experience. They reflect, compare situations, update their assumptions, and recognise recurring patterns across different systems. Others accumulate time without significantly changing how they reason.

The important variable is not simply how much an engineer has seen, but how effectively they convert what they have seen into better future decisions.

## Judgement can transfer, but technical depth still has to be earned

I entered software engineering after working in another professional field. When I began as an intern and junior engineer, I had substantial technical ground to cover. I needed to build the depth required to understand systems properly, produce strong implementations, diagnose failures, and make decisions grounded in engineering reality.

That technical development was essential to my progression. But I was not starting from zero in every dimension.

I already had experience dealing with ambiguity, separating stated requirements from underlying needs, prioritising competing work, communicating across organisational boundaries, and recognising that technically correct work can still fail when it ignores context. Those capabilities did not substitute for technical competence; they helped me acquire and apply it more effectively.

This is one reason some career switchers progress quickly once their technical ability catches up. Judgement developed in another field is not perfectly transferable, but parts of it often are. The ability to assess incomplete information, understand incentives, anticipate second-order effects, communicate uncertainty, and recognise when confidence exceeds evidence remains useful across domains.

A mature career switcher may begin with less technical knowledge than a graduate who has spent years programming. They may still be better prepared to learn from consequences, recognise patterns, and understand how engineering work interacts with the wider organisation.

They cannot bypass the technical apprenticeship, but they may be able to extract more from it.

## Poor judgement often looks like misplaced attention

Poor engineering judgement is not always dramatic. It often appears as an inability to distinguish what matters from what merely exists.

I once worked with an engineer who was more senior than several others both in organisational level and in years of experience. Their technical proposals frequently contained substantial detail, but the attention was often directed toward marginal concerns while larger risks, dependencies, and operational consequences remained underexplored.

The problem was not an inability to analyse. It was an inability to weight the analysis appropriately.

This is a common failure mode in engineering: majoring in the minors. A proposal may spend pages on an implementation detail while saying little about ownership. A review may identify dozens of theoretical risks without distinguishing the probable from the merely possible. A technically elegant design may ignore migration cost, support burden, or the reality that another team must operate it.

Weak judgement often shows itself through disproportion. The solution is larger than the problem. The certainty is stronger than the evidence. The attention given to an issue is disconnected from its likely consequence.

Other signals include proposing solutions before understanding the problem, optimising for theoretical purity while ignoring operational reality, treating all risks as equally important, and repeatedly choosing technically interesting work over valuable work.

Skill without judgement tends to produce sophisticated but immature solutions. The work may demonstrate what the engineer knows, but not necessarily that they understand what the situation requires.

## The trust test

A practical way to think about seniority is through trust.

Who would you trust to lead a consequential change when the requirements are incomplete, the deadline is real, several teams have conflicting interests, and there is no obviously correct answer?

The person you choose may not be the deepest specialist in every technology involved. But they will usually have sufficient technical depth to understand the important parts of the system and enough judgement to know where their understanding ends.

They will identify the consequential unknowns rather than pretending uncertainty does not exist. They will seek input without surrendering ownership, make risks visible, keep the solution proportional to the problem, and preserve reversibility where possible. They will also know when the technically strongest local solution creates a worse overall system.

That is engineering judgement in practice. It is why the people trusted with the most consequential work are not always those with the longest CVs, the loudest opinions, or the greatest command of technical vocabulary.

Trust emerges from repeated evidence that someone will make sound decisions under imperfect conditions.

## Seniority is visible in how scope is handled

I was promoted into a team and technical lead position ahead of engineers who had longer technical tenures and, on paper, more experience. Technical capability was not incidental to that decision. The role required enough depth to understand complex systems, challenge implementation choices, diagnose difficult problems, and guide the technical work of others.

The differentiator was how that capability was applied across a wider scope.

The work was no longer only about producing strong technical solutions. It involved determining which problems mattered, sequencing work, balancing delivery with operational risk, understanding organisational constraints, creating clarity where the direction was incomplete, and making decisions that other engineers and teams could safely build upon.

This is the broader pattern behind engineering progression. A junior engineer is often asked to implement a defined change. A senior engineer is increasingly expected to shape the change: to clarify the problem, identify the constraints, compare approaches, and ensure that the implementation will hold up in practice.

At staff or principal scope, the question broadens further. Is the organisation solving the right problem? Are several teams independently compensating for the same missing capability? Does the proposed solution improve the wider system, or merely move complexity across a boundary?

At each stage, technical competence remains necessary. What changes is the radius over which that competence must produce good decisions.

## Judgement is also visible in what does not get built

Technical output is visible. Good judgement is often less visible.

The unnecessary migration that never happened, the platform that was not introduced, the outage avoided through a cautious rollout, and the maintenance burden prevented by choosing a simpler design rarely attract much attention. Yet these may be among the most valuable decisions a senior engineer makes.

Senior engineers create value partly through subtraction. They reduce unnecessary scope, resist premature abstractions, challenge false urgency, avoid creating accidental platforms, simplify ownership, and sequence work so that important uncertainty is resolved before the organisation commits heavily.

They also recognise when boring technology is the more sophisticated decision.

A junior engineer often demonstrates value through what they can build. A senior engineer increasingly demonstrates value through knowing what does not need to be built, what should not be built yet, and what must be understood before anyone starts building.

## Judgement without humility becomes dogma

Experience can improve judgement, but it can also harden into ego.

An experienced engineer may begin to mistake pattern recognition for certainty. They have seen similar situations before, so they assume they already understand the current one. Past experience then stops being evidence and becomes authority.

Good judgement requires the ability to use experience without becoming trapped by it. A strong engineer should be able to say:

> I have seen this pattern before, but I may be wrong about whether it applies here.

That does not mean becoming indecisive or retreating into performative uncertainty. It means developing calibrated confidence: being decisive when the evidence is strong, cautious when it is weak, and willing to update when reality disagrees.

Without confidence, an engineer may avoid making necessary decisions. Without humility, they may stop noticing when their decisions are wrong.

Experience should make an engineer less naïve, but not less curious.

## How engineers can develop better judgement

Judgement develops faster when experience is examined rather than merely endured.

After an important decision, do not review only whether the outcome was good or bad. Examine the quality of the reasoning that produced it. What assumptions were made? Which proved correct? Which were wrong? What evidence was available at the time? What was overlooked? Did the decision succeed because the reasoning was sound, or because the team was fortunate?

Good outcomes can come from poor decisions, and good decisions can occasionally produce bad outcomes. Learning requires separating the two.

Engineers should also seek exposure to consequences, not only implementation. Building a service teaches one set of lessons. Operating it teaches another. Supporting its users reveals costs that are invisible during design. Participating in incidents exposes the difference between how a system was expected to behave and how it behaves under pressure.

The wider the feedback loop, the better the raw material for judgement.

It is also useful to study engineers whose decisions you trust. Do not simply copy their conclusions. Observe how they frame problems, identify important unknowns, compare trade-offs, distinguish reversible from irreversible decisions, and communicate uncertainty.

The transferable skill lies in the reasoning process, not in memorising what someone decided in a particular situation.

Finally, resist the urge to demonstrate seniority through complexity. The desire to prove technical sophistication is one of the easiest ways to produce immature engineering decisions.

Strong engineers rarely need every solution to display the full extent of their abilities. Their sophistication is visible in the appropriateness of the result.

## How mentors can teach judgement

Mentoring judgement requires more than reviewing code or supplying better answers. A mentor who always gives the answer may improve the immediate outcome while slowing the development of the engineer.

A better approach is to make the reasoning visible. Ask what problem the engineer believes they are solving. Ask which constraints matter most, what alternatives they considered, what could fail, who inherits the operational cost, and what evidence would cause them to change direction.

The goal is not to force the engineer toward the mentor’s preferred answer. It is to improve the structure of the decision.

Mentors can also expose engineers to the parts of work that are often hidden from implementation roles: planning, incident response, stakeholder conversations, operational reviews, trade-off discussions, and the consequences of previous architectural decisions.

Judgement develops when engineers see the whole system around the code.

A useful mentoring question is:

> What would have to be true for this to be the right decision?

That question forces assumptions into the open.

Another is:

> Which part of this decision will be most expensive to reverse?

That shifts attention from immediate implementation toward longer-term consequence.

## How organisations can recognise judgement

Organisations often claim to value judgement while promoting people using easier-to-measure proxies. Years of experience, qualifications, visible technical output, architectural complexity, and performance during interviews are all easier to assess than decision quality, but they are incomplete signals.

One organisation I worked in placed significant weight on experience and formal qualifications. This made it easier for people to appear senior on paper without consistently demonstrating senior-level judgement.

Another organisation was much better at identifying technical strength and experience with hard problems, but gave insufficient weight to how engineers affected the people and systems around them. As a result, some personally toxic engineers progressed further than they should have.

This is not merely a failure to value “soft skills.” An engineer who hoards information, damages collaboration, dismisses operational concerns, creates unnecessary dependency on themselves, or reduces the effectiveness of the surrounding team is exercising poor engineering judgement.

At senior levels, the unit of evaluation cannot remain the individual’s technical output. Organisations should examine the quality of the decisions an engineer enables.

Do their solutions reduce or increase long-term complexity? Do they improve the decisions of others? Do they identify risks early? Do they create clarity under ambiguity? Do the systems they influence become easier to operate, change, and understand?

Promotion evidence should include decisions, not only deliverables. What was the context? What alternatives existed? What trade-offs were made? What consequences followed? What did the engineer learn when reality differed from the plan?

The purpose is not to reward people for always being correct. It is to recognise those who consistently improve the quality of consequential decisions.

## Practical questions for consequential engineering decisions

No checklist can replace judgement, but a small set of questions can improve it.

Before committing to a significant technical direction, ask:

1. **What problem are we actually solving?**
   Separate the underlying need from the first requested implementation.
2. **What happens if we do nothing yet?**
   Not every problem requires immediate intervention.
3. **Which constraints genuinely matter?**
   Distinguish hard constraints from preferences, habits, and assumptions.
4. **What is the smallest responsible solution?**
   Avoid both reckless shortcuts and unjustified complexity.
5. **What are the likely failure modes?**
   Focus first on probable and consequential risks.
6. **Who will own and operate the result?**
   Delivery is only the beginning of the system’s life.
7. **What are we making harder elsewhere?**
   Local simplification often exports complexity across a boundary.
8. **How reversible is the decision?**
   Move quickly on reversible choices and more carefully on irreversible ones.
9. **What evidence would change our direction?**
   Define the conditions under which the current reasoning should be revisited.
10. **What will this decision teach us?**
    Prefer approaches that reduce important uncertainty early.

The value of these questions is not that they produce a single correct answer. They widen the frame before the organisation commits to one.

## Seniority is the quality of the decisions you can be trusted to make

Technical skill matters enormously. Without it, judgement becomes detached from engineering reality. An engineer cannot make consistently sound technical decisions without understanding the systems involved.

But technical skill is the foundation of seniority, not its final form.

As engineers progress, their contribution shifts from executing known solutions toward navigating uncertainty, making trade-offs, managing consequences, and improving the decisions of the people around them.

That is why tenure is not enough. Technical brilliance is not enough. Confidence is not enough.

A senior engineer is someone who can be trusted to exercise sound technical judgement when the answer is unclear and the consequences matter.

Their ceiling is determined not merely by what they know how to build, but by the quality of the decisions they make about what should be built, how it should be introduced, and what the organisation should deliberately leave undone.
---
title: The dashboard is not the work
description: Observations and fallacies of developer metrics
slug: 
pubDatetime: 2026-07-10T00:00:01Z
modDatetime: 2026-07-10T00:00:01Z
draft: false

category: engineering

tags:
  - Work & Organisations

series: 
featured: false
---


# The Dashboard Is Not The Work

There is a growing temptation in software organisations to make developer productivity more visible. On the surface, this sounds reasonable. Software is expensive, engineering teams are hard to understand from the outside, and leaders want to know whether investment is turning into progress. Developer experience matters. Friction matters. Delivery health matters.

Measurement is not the problem.

The problem begins when organisations measure what is easy to count, then quietly start pretending those numbers represent engineering performance. Pull requests created. Lines of code added. Lines of code deleted. Tickets closed. AI suggestions accepted. AI-generated code volume. Tool usage. Activity. Throughput. Motion. These things are visible, but visibility is not the same as value.

## Visibility is not performance

Developer metrics often optimise for visibility, not performance. They make work legible to people who are not close enough to understand the work. That can be useful when the metrics expose genuine friction in the system. It becomes dangerous when those same metrics are used to shape developer behaviour without understanding what good engineering actually looks like.

A developer can create many pull requests and still make the system worse. A developer can add thousands of lines of code and still be solving the wrong problem. A developer can delete very little code and still be doing deep, valuable work. A developer can spend a day debugging something subtle, prevent a future incident, and produce almost no visible output.

A developer can stop a bad idea from becoming a six-month mistake. They can improve a design in a conversation. They can unblock five other people without committing anything. They can understand a fragile legacy system well enough to avoid breaking it. Where does that appear on the dashboard? Usually nowhere.

That is the problem. The most visible work is not always the most valuable work. Sometimes the most valuable engineering work is the work that prevents unnecessary work from existing at all.

## Metrics become incentives

The real danger is not that metrics are incomplete. All metrics are incomplete. All models simplify reality. The danger is when incomplete metrics become incentives.

Once teams know they are being measured by pull request volume, lines changed, tickets closed, or AI usage, behaviour will shift. Not always dramatically. Not always consciously. But it will shift. More small pull requests. More visible activity. More performative updates. More generated code. More movement that looks good from far away and smells strange up close.

An organisation may believe it is improving productivity, when it has actually created a theatre for productivity-shaped behaviour. People become incentivised to look good rather than be good. That is not engineering improvement. That is dashboard appeasement.

## AI makes this worse

AI makes bad developer metrics even more dangerous. If we measure lines of code, AI can create more lines. If we measure pull requests, AI can help create more pull requests. If we measure suggestions accepted, AI can increase suggestion acceptance. If we measure usage, people can use AI more.

None of that proves better engineering. AI usage metrics are not a measure of AI savviness. They measure how much is coming through the pipe, not the quality of what comes out the other end.

A poor engineer with AI can generate more poor code faster. A strong engineer with AI may use it sparingly, precisely, and with judgement. One might look more “AI-enabled” on a dashboard. The other might actually be better.

This is the absurdity of measuring tool usage instead of engineering outcomes. It is like measuring a carpenter by how many times they touched the hammer.

## Good engineering is often qualitative

The best developer qualities are difficult to quantify. Good engineers reduce ambiguity, simplify systems, ask better questions, understand failure modes, spot hidden coupling, avoid unnecessary complexity, and improve the judgement of people around them. They know when not to build. They know when the problem is not technical. They debug with patience. They understand context. They make systems more operable. They leave behind fewer traps. They create leverage.

Much of this is visible only to people close enough to the work. That is why strong engineers can often recognise other strong engineers through conversation. Not through a productivity dashboard, but through how they reason. Through what they notice. Through what they ignore. Through the trade-offs they make instinctively. Through the scars in their judgement.

A dashboard can show activity. It cannot show taste. It cannot show restraint. It cannot show whether someone made the codebase easier to live with. It cannot show whether a decision avoided future pain. It cannot show whether someone protected the system from unnecessary cleverness. And in software, those things matter. A lot.

## Developer experience should measure friction

This does not mean metrics are useless. The better use of developer metrics is not to measure developers as output units. It is to measure the environment developers are forced to work inside.

How long does it take to get a local environment working? How painful is onboarding? How long do builds take? How flaky are tests? How often do deployments fail? How long do pull requests wait for review? How many approvals are ceremonial? How much work is blocked by unclear ownership? How hard is it to find documentation? How often does delivery depend on tribal knowledge? How much cognitive load is caused by the organisation itself? How much time is lost to platform friction?

These are useful signals. They are not individual productivity scores. They are system health indicators. That distinction matters.

A healthy engineering organisation does not ask only, “How do we make developers produce more visible output?” It asks, “What friction is preventing good engineers from doing good work?”

That is a very different question. One leads to surveillance. The other leads to better systems.

## The management smell

There is a particular smell that appears when engineering metrics are introduced without enough proximity to the work. The dashboards become more important than the conversations. Developer feedback becomes decorative rather than directional. The organisation starts treating visible activity as a proxy for valuable engineering.

The people closest to the work can sense the model is wrong, but the model is legible, polished, and convenient. So the model wins.

That is dangerous. The dashboard will never understand the codebase. It will never feel the drag of bad architecture. It will never notice that a “small change” is only small because someone spent years making the system coherent. It will never know which engineer quietly prevented a bad decision. It will never understand why a good engineer deleted an idea before it became code.

Metrics can support judgement. They cannot replace it. When metrics become a substitute for technical leadership, the organisation has started outsourcing its judgement to a chart.

## The interview parallel

This reminds me of the nonsense that often happens in technical interviews. Companies want to measure technical skill, so they invent artificial exercises that are easy to score. But the things that are easy to score are often not the things that matter most in real engineering work.

The result is a proxy game. Candidates learn to perform well against the measurement system. The company learns surprisingly little about how they will behave inside a real codebase, with real constraints, real ambiguity, and real humans.

Developer metrics can make the same mistake inside the organisation. They create a proxy for productivity, then slowly forget it is only a proxy.

## Measure the system, not the smoke

The useful version of developer metrics is not “who produced the most activity?” It is “where is the system making good work harder than it needs to be?”

That means measuring friction, flow, reliability, waiting time, cognitive load, feedback loops, and operational pain. It means using metrics as a starting point for better questions, not as a scoreboard. It means listening to developers when they say the numbers are missing the point. It means treating developer experience as an engineering problem, not a surveillance programme with friendlier branding.

Metrics should help us see the system more clearly. They should expose bottlenecks, waste, fragility, and pain. They should help good engineers do better work.

But when metrics are used to score developers through visible activity, they become corrosive. They reward output over judgement. They reward motion over progress. They reward theatre over substance. And with AI, the theatre can now scale beautifully.

A software organisation should not be trying to measure who produces the most smoke. It should be asking where the fire is, why it started, and what kind of system keeps making people reach for matches.

The dashboard is not the work.

The work is the work.

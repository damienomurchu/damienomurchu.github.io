---
title: Testing Network Infrastructure Behind Tailscale First
description: Trialling AdGuard Home behind Tailscale before making it part of the network.
pubDate: 2026-09-28
tags:
  - Personal Systems
  - Networking
  - Tailscale
  - AdGuard Home
featured: false
---

## A Smaller Failure Domain

I wanted to try AdGuard Home on my network, but I did not want an experiment to become critical infrastructure on day one.

The obvious approach would have been to deploy AdGuard, update the router or DHCP configuration, and make every device in the house start using it for DNS. That would work, but it would also immediately widen the blast radius. A problem with AdGuard, Docker, or the host running it could suddenly become a household networking problem.

Instead, I deployed AdGuard Home on `mgt-1`, a small Debian host I use for personal infrastructure, and made it available only through Tailscale. The implementation lives in my <a href="https://github.com/damienomurchu/personal-cloud/tree/main/compose/adguard" data-umami-event="github-click" data-umami-event-content="adguard"><code>personal-cloud</code></a> repository.

Tailscale already provides private connectivity between the devices I care about, so I could configure the tailnet to use AdGuard for DNS without changing anything on the wider LAN. Devices outside the tailnet continue using their existing DNS configuration.

That gives the experiment a much smaller failure domain.

From a client, the basic verification is simple:

```bash
dig @100.116.32.46 cloudflare.com
```

Once DNS is flowing through AdGuard, I can inspect query logs, test blocklists, observe latency, and see whether anything breaks. More importantly, I can do all of that before deciding whether AdGuard deserves a larger role in the network.

## Evaluation before migration

DNS is deceptively critical infrastructure. A resolver is easy to deploy, but once everything depends on it, its reliability becomes part of the reliability of almost every other networked service.

That makes the distinction between **testing infrastructure** and **adopting infrastructure** useful.

It is easy to collapse those into one step: deploy the service, point everything at it, and see what happens. A narrower deployment gives me a chance to answer more useful questions first.

Is the filtering actually useful? Are the default blocklists too aggressive? Does DNS latency change noticeably? Do any applications behave unexpectedly? Is `mgt-1` reliable enough to sit in the resolution path? Do I even want to operate another DNS service long-term?

Only after answering those questions does expanding the scope make sense.

## Tailscale as an experiment boundary

This changed how I think about the tailnet slightly.

It is not only a connectivity layer. It can also act as an **experiment boundary** for infrastructure.

The initial deployment can be opt-in, observable, easy to reverse, and isolated from systems that have no reason to participate. If the experiment fails, the consequences remain local. If it works, the boundary can be widened deliberately.

That pattern is useful well beyond DNS.

A new proxy can begin with a small set of clients. A package mirror can start with one build environment. A monitoring service can begin with one host. An internal platform capability can start with one team.

The first deployment does not need to resemble the final architecture. Its purpose is to reduce uncertainty.

## The temporary architecture may be the right one

My initial assumption was that tailnet-only DNS would be a staging configuration and that network-wide DNS would eventually become the finished design.

I am less convinced that migration is necessary.

Most of the devices I actually care about already use Tailscale. Keeping AdGuard scoped to those devices means `mgt-1` does not become a dependency for every television, appliance, guest phone, or IoT device on the LAN.

That matters because expanding the scope of infrastructure also expands the responsibility attached to it. Network-wide DNS starts to raise questions about redundancy, monitoring, failure behaviour, router configuration, and availability.

Tailnet-only DNS can remain much simpler.

The broader lesson is straightforward: **introduce infrastructure through the narrowest useful control boundary first, then widen the blast radius only when it has earned it.**

For now, AdGuard Home stays behind the tailnet.

That may be the staging environment.

It may also be the right production boundary.

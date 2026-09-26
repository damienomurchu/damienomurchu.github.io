# Analytics privacy

`src/scripts/analyticsPreference.ts` is the source of truth. Layout.astro calls
its bootstrap; only that module injects the existing Umami script and website ID.
No tracker tag is emitted in static HTML. It runs once per document, including
when Astro's client router swaps pages; controls refresh on `astro:page-load`.

Browser GPC (`globalPrivacyControl === true`) or DNT (`doNotTrack === "1") takes
precedence over local preferences. `forged-analytics` in localStorage supports
`enabled` and `disabled`; absent means allowed. Old `umami.disabled=1` opt-outs
migrate to `disabled`. Unreadable storage fails closed. Preferences never leave
the browser. Switching saves the preference and fully reloads; other tabs reload
on preference changes too. Browser-enforced opt-outs cannot be overridden here.

The hostname must be `forged.damienmurphy.net` before injection, and the tracker
also has `data-domains` set to that host. Query strings and hashes are excluded.
Do not rename scripts, proxy requests, retry blocked loads, or bypass privacy tools.

Allowed custom events are `paper-download` (paper slug), `github-click` (explicit
content repository links, content slug), and `rss-click` (primary footer link).
Use Umami's data attributes only on these intentional content interactions.
Metadata describes content, never readers: no email, username, identity API,
persistent ID, session properties, fingerprints, or other personal data. Do not
add replay, heatmaps, scrolling, reading depth, mouse telemetry, broad click or
outbound-link tracking. Normal Umami pageviews remain enabled.

Run `node scripts/test-analytics.mjs` for the isolated privacy matrix, toggle
reload tests, failure cases, production hostname guard, and event markup checks.
The test uses fake browser APIs and never contacts Umami. On localhost/preview,
verify in DevTools that there is no tracker request. To exercise production-host
behaviour in browser automation, intercept the production hostname and serve the
local build; intercept the tracker with a stub and block all real analytics
requests. Inspect event names and content-only attributes there. Never relax the
production guard or reuse the production website ID against a live test collector.

Tracker attributes follow https://docs.umami.is/docs/tracker-configuration and
https://docs.umami.is/docs/track-events. The automated checks do not verify receipt
by the deployed Umami server.

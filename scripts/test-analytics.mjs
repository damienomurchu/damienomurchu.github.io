import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync("src/scripts/analyticsPreference.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
function browser({ preference, gpc, dnt, hostname = "forged.damienmurphy.net", storageFails = false, blocked = false, legacy = false } = {}) {
  const storage = new Map(preference ? [["forged-analytics", preference]] : []);
  if (legacy) storage.set("umami.disabled", "1");
  const scripts = [];
  const buttons = [{ setAttribute(key, value) { this[key] = value; }, hasAttribute() { return true; }, dataset: {} }];
  let reloads = 0;
  const context = vm.createContext({ exports: {}, navigator: { globalPrivacyControl: gpc, doNotTrack: dnt },
    localStorage: {
      getItem(key) { if (storageFails) throw Error("unavailable"); return storage.get(key) ?? null; },
      setItem(key, value) { if (storageFails) throw Error("unavailable"); storage.set(key, value); },
      removeItem(key) { storage.delete(key); },
    },
    window: { location: { hostname, reload() { reloads++; } }, addEventListener() {} },
    document: { querySelectorAll(selector) { return selector.includes("button") ? buttons : []; }, addEventListener() {},
      createElement() { return { dataset: {} }; }, head: { appendChild(script) { if (blocked) throw Error("blocked"); scripts.push(script); } } },
  });
  vm.runInContext(source, context);
  context.exports.setupAnalytics();
  return { ...context.exports, scripts, buttons, storage, reloads: () => reloads };
}
for (const preference of [undefined, "enabled", "disabled"]) {
  for (const gpc of [undefined, true]) for (const dnt of [undefined, "1"]) {
    const result = browser({ preference, gpc, dnt });
    const allowed = preference !== "disabled" && !gpc && dnt !== "1";
    assert.equal(result.scripts.length, Number(allowed));
    assert.equal(result.buttons[0]["aria-checked"], String(allowed));
    if (gpc || dnt) { result.toggleAnalytics(); assert.equal(result.reloads(), 0); }
  }
}
for (const hostname of ["localhost", "preview.example.com"]) assert.equal(browser({ hostname }).scripts.length, 0);
assert.equal(browser({ storageFails: true }).scripts.length, 0);
assert.equal(browser({ blocked: true }).scripts.length, 0);
assert.equal(browser({ legacy: true }).storage.get("forged-analytics"), "disabled");
for (const preference of ["enabled", "disabled"]) {
  const result = browser({ preference });
  result.toggleAnalytics();
  const saved = result.storage.get("forged-analytics");
  assert.equal(saved, preference === "enabled" ? "disabled" : "enabled");
  assert.equal(result.reloads(), 1);
  assert.equal(browser({ preference: saved }).scripts.length, Number(saved === "enabled"));
}
const result = browser();
result.setupAnalytics();
assert.equal(result.scripts.length, 1);
assert.equal(result.scripts[0].dataset.domains, "forged.damienmurphy.net");
assert.equal(result.scripts[0].src, "https://analytics.damienmurphy.net/script.js");
assert.equal(result.scripts[0].dataset.websiteId, "c6e51cce-feaa-429f-a2fb-cebabf8d8c08");
for (const [file, event, metadata] of [
  ["src/pages/papers/[...slug].astro", "paper-download", 'data-umami-event-paper={paper.data.slug}'],
  ["src/content/lab-notes/turning-ultrawide-edges-into-focus-rails.md", "github-click", 'data-umami-event-content="focus-rails"'],
  ["src/components/Footer.astro", "rss-click", ""],
]) {
  const markup = readFileSync(file, "utf8");
  assert.ok(markup.includes(`data-umami-event="${event}"`));
  assert.ok(markup.includes(metadata));
}
process.stdout.write("Analytics privacy matrix and event markup checks passed.\n");

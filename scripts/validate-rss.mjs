import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

const feed = await readFile(new URL("../dist/rss.xml", import.meta.url), "utf8");
const parser = new XMLParser({ ignoreAttributes: false });
const document = parser.parse(feed);
const channel = document?.rss?.channel;
const items = Array.isArray(channel?.item)
  ? channel.item
  : channel?.item
    ? [channel.item]
    : [];

assert.equal(document?.rss?.["@_version"], "2.0", "RSS version must be 2.0");
assert.ok(channel?.title, "Feed must have a title");
assert.ok(channel?.description, "Feed must have a description");
assert.ok(channel?.["dc:creator"], "Feed must identify its author");
assert.ok(items.length > 0, "Feed must contain at least one published post");

for (const item of items) {
  assert.ok(item.title, "Every item must have a title");
  assert.ok(item.description, `${item.title}: missing description`);
  assert.ok(item.pubDate, `${item.title}: missing publication date`);
  assert.ok(item["dc:creator"], `${item.title}: missing author`);
  assert.ok(item.category, `${item.title}: missing tags`);
  assert.ok(item["content:encoded"], `${item.title}: missing full content`);
}

process.stdout.write(
  `Validated RSS 2.0 feed with ${items.length} published post(s).\n`
);

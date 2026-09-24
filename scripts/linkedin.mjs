// Prints a LinkedIn-ready version of a post, and copies it to your clipboard.
//
//   npm run linkedin -- <post-slug>
//
// The slug is the post's file name without ".md".
// Uses the post's "linkedin" field if it has one, otherwise its summary.
// The post's link is added at the end.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import { SITE } from "../site.config.mjs";

const postsDir = path.join(import.meta.dirname, "..", "src", "content", "posts");
const available = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .sort();

const slug = (process.argv[2] ?? "").replace(/\.md$/, "").replace(/^.*\//, "");

if (!slug || !available.includes(slug)) {
  if (slug) console.error(`\nNo post called "${slug}".`);
  console.error("\nUsage:  npm run linkedin -- <post-slug>\n\nYour posts:");
  for (const s of available) console.error(`  ${s}`);
  console.error("");
  process.exit(1);
}

const { data } = matter(fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8"));
const url = `${SITE.url.replace(/\/$/, "")}/posts/${slug}/`;
const body = (data.linkedin ?? `${data.title}\n\n${data.summary}`).trim();
const text = body.includes(url) ? body : `${body}\n\n${url}`;

const line = "─".repeat(60);
console.log(`\n${line}\n${text}\n${line}`);

try {
  execSync("pbcopy", { input: text });
  console.log("✓ Copied to your clipboard. Paste it into a new LinkedIn post.\n");
} catch {
  console.log("Select the text above and copy it into a new LinkedIn post.\n");
}

if (SITE.url.includes("therapeutic-window.netlify.app")) {
  console.log("Note: the link uses the placeholder address from site.config.mjs. Update `url` there once your site is live.\n");
}

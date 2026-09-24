import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORIES } from "../site.config.mjs";

const categoryNames = CATEGORIES.map((c) => c.name) as [string, ...string[]];

// Every Markdown file in src/content/posts becomes a post.
// The file name (without .md) becomes its web address: /posts/<file-name>
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    categories: z.array(z.enum(categoryNames)).min(1),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    sources: z
      .array(z.object({ title: z.string(), url: z.url() }))
      .optional(),
    linkedin: z.string().optional(),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

export const collections = { posts };

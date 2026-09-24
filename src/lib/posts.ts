import { getCollection, type CollectionEntry } from "astro:content";
import { CATEGORIES, SITE } from "../../site.config.mjs";

export type Post = CollectionEntry<"posts">;

/** All published posts, newest first. Drafts show up only on your own computer (npm run dev). */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function categoryByName(name: string) {
  return CATEGORIES.find((c) => c.name === name)!;
}

export function postUrl(post: Post) {
  return `/posts/${post.id}/`;
}

/** The share image for a post: its cover if it has one, otherwise the auto-generated card. */
export function shareImage(post: Post) {
  return post.data.cover ?? `/og/${post.id}.png`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function readingTime(body = "") {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 230))} min read`;
}

export const buttondownIsPlaceholder = SITE.buttondown.startsWith("YOUR-");

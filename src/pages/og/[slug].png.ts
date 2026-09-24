import type { APIRoute } from "astro";
import { getPosts, type Post } from "../../lib/posts";
import { renderShareCard } from "../../lib/og";

// One share image per post that doesn't have its own cover image
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts
    .filter((post) => !post.data.cover)
    .map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Post };
  const png = await renderShareCard({
    title: post.data.title,
    kicker: post.data.categories.join("  ·  "),
  });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

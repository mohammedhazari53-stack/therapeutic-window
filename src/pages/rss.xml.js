import rss from "@astrojs/rss";
import { SITE } from "../../site.config.mjs";
import { getPosts, postUrl } from "../lib/posts";

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      categories: post.data.categories,
      link: postUrl(post),
    })),
  });
}

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./site.config.mjs";

export default defineConfig({
  site: SITE.url,
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      // Leave the auto-generated share images out of the sitemap
      filter: (page) => !page.includes("/og/"),
    }),
  ],
});

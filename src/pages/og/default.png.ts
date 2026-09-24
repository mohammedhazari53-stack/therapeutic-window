import type { APIRoute } from "astro";
import { SITE } from "../../../site.config.mjs";
import { renderShareCard } from "../../lib/og";

// Share image for the home page and other non-post pages
export const GET: APIRoute = async () => {
  const png = await renderShareCard({ title: SITE.tagline, kicker: "Newsletter" });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

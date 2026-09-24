// Draws the 1200×630 branded share card used by LinkedIn and other sites
// when a post has no cover image.
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SITE } from "../../site.config.mjs";

const font = (pkg: string, file: string) =>
  fs.readFileSync(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

const fonts = [
  { name: "Serif", data: font("source-serif-4", "source-serif-4-latin-700-normal.woff"), weight: 700 as const, style: "normal" as const },
  { name: "Serif", data: font("source-serif-4", "source-serif-4-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
  { name: "Sans", data: font("inter", "inter-latin-600-normal.woff"), weight: 600 as const, style: "normal" as const },
  { name: "Sans", data: font("inter", "inter-latin-500-normal.woff"), weight: 500 as const, style: "normal" as const },
];

// Tiny helper so we can describe the card without JSX
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]) => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.length === 1 ? children[0] : children },
});

interface CardOptions {
  title: string;
  kicker?: string;
  footer?: string;
}

export async function renderShareCard({ title, kicker, footer }: CardOptions) {
  const accent = SITE.accentColor;
  const titleSize = title.length > 90 ? 52 : title.length > 60 ? 60 : 70;
  const host = new URL(SITE.url).host;

  const mark = h(
    "div",
    {
      width: 34,
      height: 34,
      borderLeft: `5px solid #ffffff`,
      borderRight: `5px solid #ffffff`,
      alignItems: "center",
      justifyContent: "center",
    },
    h("div", { width: 12, height: 12, background: "#ffffff" }),
  );

  const tree = h(
    "div",
    { width: 1200, height: 630, flexDirection: "column", background: "#fdfcf9", fontFamily: "Serif" },
    // Top band with the wordmark
    h(
      "div",
      { background: accent, height: 110, padding: "0 64px", alignItems: "center", gap: 20 },
      mark,
      h("div", { color: "#ffffff", fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }, SITE.name),
    ),
    // Title area
    h(
      "div",
      { flex: 1, flexDirection: "column", justifyContent: "center", padding: "0 64px" },
      kicker
        ? h("div", { fontFamily: "Sans", fontWeight: 600, fontSize: 24, letterSpacing: 3, color: accent, marginBottom: 22, textTransform: "uppercase" }, kicker)
        : h("div", {}),
      h("div", { fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, color: "#16181d", letterSpacing: -1 }, title),
    ),
    // Footer line
    h(
      "div",
      { borderTop: "2px solid #16181d", margin: "0 64px", padding: "22px 0 40px", justifyContent: "space-between", fontFamily: "Sans", fontWeight: 500, fontSize: 24, color: "#5b606b" },
      h("div", {}, footer ?? `By ${SITE.author}`),
      h("div", {}, host),
    ),
  );

  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}

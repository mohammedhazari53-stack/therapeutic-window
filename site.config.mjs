// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — the one file to edit for names, links and colors.
//  Change the text between the quotes, save, and the whole site updates.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  // The newsletter's name (shown in the logo, browser tab and share cards)
  name: "Therapeutic Window",

  // Short line shown under the logo and in search results
  tagline: "Biotech news, from bench to deal.",

  // Longer description used by search engines and the RSS feed
  description:
    "Biotech news with an investor's and scientist's eye: funding and deals, clinical and FDA updates, and the science behind them.",

  // Your name, as shown on every post
  author: "Mohammed Hazari",

  // Your LinkedIn profile address
  linkedin: "https://www.linkedin.com/in/mohammedhazari53/",

  // Your Buttondown username (the part after buttondown.com/ on your account)
  // ⚠️ PLACEHOLDER: replace with your username after creating the free Buttondown account
  buttondown: "YOUR-BUTTONDOWN-USERNAME",

  // The full web address of the site, with no slash at the end.
  // ⚠️ Update this after Netlify gives you an address, and again when you connect your own domain.
  url: "https://fastidious-pika-0e9724.netlify.app",

  // The accent color (links, category labels, logo mark).
  // accentColor is used in light mode; accentColorDark is a lighter shade used in dark mode.
  accentColor: "#1B3A6B",
  accentColorDark: "#8FB3E8",

  // Footer disclaimer
  disclaimer:
    "For informational purposes only. Not investment advice. Views are my own and do not represent Angel Star Ventures.",
};

// The four categories. `name` is what you type in a post's "categories" list;
// `slug` is the web address of its page (e.g. /category/funding-deals).
export const CATEGORIES = [
  {
    name: "Funding & Deals",
    slug: "funding-deals",
    description: "VC rounds, M&A, IPOs and licensing deals.",
  },
  {
    name: "Clinical & FDA",
    slug: "clinical-fda",
    description: "Trial readouts, approvals and regulatory news.",
  },
  {
    name: "Science & Tech",
    slug: "science-tech",
    description: "New research, platforms and modalities.",
  },
  {
    name: "Commentary",
    slug: "commentary",
    description: "My own takes on where the industry is heading.",
  },
];

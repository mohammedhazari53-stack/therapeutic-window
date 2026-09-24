# Therapeutic Window

The website for *Therapeutic Window*, a biotech newsletter. It's a simple static site built with [Astro](https://astro.build): each post is one text file, and pushing to GitHub publishes it automatically through Netlify.

---

## The files you'll actually touch

| File or folder | What it is |
|---|---|
| `site.config.mjs` | **All your settings**: name, tagline, your name, LinkedIn, Buttondown username, website address, accent color |
| `src/content/posts/` | **Your posts.** One `.md` file per post |
| `post-template.md` | A blank post to copy |
| `src/pages/about.md` | The About page text |
| `public/images/` | Put cover images here (create the folder the first time) |

You can ignore everything else.

To open the project in a terminal: open the **Terminal** app and type `cd ~/Documents/therapeutic-window`, then press Return. Every command below is typed there.

---

## (a) How to write and publish a new post

1. **Copy the template.** Duplicate `post-template.md` and move the copy into `src/content/posts/`.
2. **Rename it.** The file name becomes the post's web address, so use lowercase words and dashes, for example `moderna-flu-readout.md` → `yoursite.com/posts/moderna-flu-readout`.
3. **Fill in the top section** (between the two `---` lines):
   - `title`: the headline
   - `date`: in the form `2026-10-01`
   - `summary`: one or two sentences (shown on the home page and in LinkedIn previews)
   - `categories`: one or more of `"Funding & Deals"`, `"Clinical & FDA"`, `"Science & Tech"`, `"Commentary"`, spelled exactly like that
   - `sources` *(optional)*: links to press releases, papers or filings
   - `linkedin` *(optional)*: a short LinkedIn version
   - `cover` *(optional)*: an image in `public/images/`, written as `"/images/name.jpg"`. Without one, a branded share image is created for you.
   - `draft: true` *(optional)*: hides the post from the live site until you change it to `false`
4. **Write the post** below the second `---`. A blank line starts a new paragraph, `## ` starts a subheading, `**bold**`, `*italic*`, `[link text](https://...)`.
5. **Preview it.** Run `npm run dev`, then open **http://localhost:4321** in your browser. The page updates as you save. When you're done, run `npx astro dev stop` to stop the preview.
6. **Publish it.** Run these three commands:
   ```bash
   git add .
   git commit -m "New post: moderna flu readout"
   git push
   ```
   Netlify notices the push and the post is live in about a minute.
7. **Share it on LinkedIn.** Run `npm run linkedin -- moderna-flu-readout` (the file name without `.md`). The LinkedIn text prints on screen **and is copied to your clipboard**, so you can paste it straight into a new LinkedIn post. The link at the end shows a preview card with your title, summary and image.

> **Before launch:** the four starter posts are marked `sample: true`, which shows a "Sample" banner on each one. They cover real news with sources, so you can keep them by deleting the `sample: true` line (and rewriting the Commentary post in your own words), or delete the files.

---

## (b) How to change the name, tagline and colors

Open **`site.config.mjs`** and edit the text between the quotes:

- `name`: the newsletter name (logo, browser tab, share images)
- `tagline`: the line under the logo
- `author`, `linkedin`, `buttondown`, `url`
- `accentColor`: the color used for links, category labels and the logo mark. It's a hex color code like `"#1B3A6B"` (navy). You can pick one at [htmlcolorcodes.com](https://htmlcolorcodes.com).
- `accentColorDark`: a **lighter** version of the same color for dark mode, so it stays readable on a dark background

Save the file, and the preview updates. Push to publish, as in step 6 above.

Background and text colors for light and dark mode are at the top of `src/styles/global.css`, if you ever want to change those too.

### Setting up Buttondown (email subscribers, free)

1. Go to **buttondown.com** and sign up for a free account (free up to 100 subscribers).
2. Choose a username. It becomes your newsletter's address, e.g. `buttondown.com/therapeuticwindow`.
3. Put that username in `site.config.mjs` → `buttondown: "therapeuticwindow"`.
4. Push. Every signup form on the site (footer, end of each post, Subscribe page) now adds people to your Buttondown list. The orange "Setup needed" note disappears.
5. To email subscribers, write the issue in Buttondown. A common routine is to publish the post here, then paste it (or a summary plus link) into Buttondown.

---

## (c) How to put it on GitHub and deploy to Netlify

**One-time setup:**

1. **Create a GitHub account** at github.com (free).
2. **Create an empty repository:** click **+** → **New repository**, name it `therapeutic-window`, leave every box unchecked, and click **Create repository**.
3. **Upload the site** from the terminal. Replace `YOUR-GITHUB-USERNAME` with your username:
   ```bash
   git init
   git add .
   git commit -m "First version of the site"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/therapeutic-window.git
   git push -u origin main
   ```
   The first push asks you to sign in to GitHub in your browser.
4. **Create a Netlify account** at netlify.com. Choose **Sign up with GitHub**.
5. In Netlify: **Add new site** → **Import an existing project** → **GitHub** → pick `therapeutic-window`. The build settings are filled in automatically from `netlify.toml`. Click **Deploy**.
6. After about a minute, you get an address like `random-name-123.netlify.app`. To change it, go to **Site configuration** → **Change site name**.
7. **Update `url` in `site.config.mjs`** to that address and push. Links and LinkedIn previews need this to be correct.

From then on, every `git push` publishes automatically.

---

## (d) How to connect a custom domain

1. Buy a domain from any registrar (Namecheap, Cloudflare, Porkbun, Squarespace Domains, etc.), or buy it directly in Netlify for the simplest setup.
2. In Netlify: **Domain management** → **Add a domain** → type your domain → **Verify** → **Add domain**.
3. Netlify shows you what to change at your registrar. The easiest option is **Netlify DNS**: Netlify gives you 4 "nameserver" addresses, and you paste them into your registrar's nameserver settings.
4. Wait. This usually takes minutes, but can take up to 24–48 hours. Netlify turns on HTTPS (the padlock) automatically.
5. **Update `url` in `site.config.mjs`** to `https://yourdomain.com` and push.

---

## Handy commands

| Command | What it does |
|---|---|
| `npm install` | Downloads the site's building blocks (only needed once on a new computer) |
| `npm run dev` | Starts the preview at http://localhost:4321 |
| `npx astro dev stop` | Stops the preview |
| `npm run build` | Builds the full site into `dist/`, a good check that nothing is broken |
| `npm run linkedin -- <file-name>` | Prints and copies a LinkedIn version of a post |

**If something breaks:** the error message usually names the file and line. The most common mistakes are a category that isn't spelled exactly right, a missing closing quote, or a date written as something other than `YYYY-MM-DD`.

## What's included

- Home page (latest post featured, then recent posts), post pages, one page per category, archive, About, Subscribe, 404
- RSS feed at `/rss.xml` and sitemap at `/sitemap-index.xml`
- LinkedIn/Open Graph preview tags on every page, and an auto-generated 1200×630 share image for each post without a cover
- "Share on LinkedIn" button on every post
- Light and dark mode (follows the reader's device, with a toggle button), mobile-friendly layout

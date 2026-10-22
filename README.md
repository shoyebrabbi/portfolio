# Shoyeb Rabbi Portfolio

Astro portfolio with a Git-backed Decap CMS. CMS content is stored in this repository; publishing a CMS change commits it to `main` and triggers a Netlify build.

## Local Development

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`. To test the Netlify proxy locally, install and run the Netlify CLI with `netlify dev`; the configured local proxy is `http://localhost:8888`.

## Netlify Deployment

1. Import the GitHub repository `shoyebrabbi/shoyeb-portfolio` as a new Netlify site.
2. Use the build command `npm run build` and publish directory `dist`. `netlify.toml` already declares both.
3. In the Netlify site dashboard, enable Identity and set registration to invite-only.
4. Invite the GitHub account that will manage the portfolio.
5. Enable Git Gateway for the `main` branch in the Identity settings.
6. Open `/admin/` on the deployed site and sign in.

Netlify account setup is required before CMS authentication works. Do not add OAuth secrets or access tokens to this repository. The root-level `api/auth.js` and `api/callback.js` are legacy Vercel handlers; the Netlify Git Gateway CMS does not use them.

## CMS Content

The CMS supports profile and social links, CV and profile image uploads, skills, experience, education, navigation, homepage section ordering and visibility, projects, certificates, testimonials, blog posts, and custom pages.

Custom pages use reorderable Text, Image, Projects, Certificates, and Call to Action sections. Layout styles and new section types still require a code change. Uploaded media is stored in `public/uploads`.

Projects, certificates, blog posts, and pages each support create, edit, and delete in the CMS. Published changes are Git commits and become public after the Netlify build completes.
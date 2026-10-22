# Shoyeb Rabbi Portfolio

Astro portfolio with a Git-backed Decap CMS. CMS content is stored in this repository; publishing a CMS change commits it to `main` and triggers a Netlify build.

## Local Development

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`. To test the Netlify proxy locally, install and run the Netlify CLI with `netlify dev`; the configured local proxy is `http://localhost:8888`.

## Netlify Deployment

1. Import the connected GitHub repository `shoyebrabbi/portfolio` as a Netlify site.
2. Use the build command `npm run build` and publish directory `dist`. `netlify.toml` already declares both.
3. In the Netlify site dashboard, enable Identity and set registration to invite-only.
4. Invite the GitHub account that will manage the portfolio.
5. Enable Git Gateway for the `main` branch in the Identity settings.
6. Open `/admin/` on the deployed site and sign in.

Netlify account setup is required before CMS authentication works. Do not add OAuth secrets or access tokens to this repository. The root-level `api/auth.js` and `api/callback.js` are legacy Vercel handlers; the Netlify Git Gateway CMS does not use them.

### CMS Login Troubleshooting

- Confirm the Netlify site is connected to `shoyebrabbi/portfolio` and its production branch is `main`.
- Enable Netlify Identity, set registration to invite-only, and accept the invite for your CMS account.
- Enable Git Gateway for that same site and branch. The CMS config uses `backend: git-gateway` and `branch: main`.
- Open the deployed site's `/admin/` path. Seeing a Netlify Identity login button while logged out is expected; local `localhost` login is not a production-auth test.
- If login succeeds but content cannot load or publish, recheck Git Gateway authorization and the deployed production branch before changing the CMS backend.

The current code changes must be committed and pushed to `main` before Netlify can deploy them. For code edits, use your normal Git workflow; CMS publishing writes content changes through Git Gateway.

## CMS Content

The CMS supports profile and social links, CV and profile image uploads, skills, experience, education, navigation, homepage section ordering and visibility, projects, project attachments, certificates and certificate PDFs, testimonials, blog posts, and custom pages.

Content records use two separate display controls where applicable: `Visible on Website` controls whether the item appears in public listings and receives a generated detail route; `Feature on Homepage` controls only whether an otherwise visible item is highlighted on the homepage. Hiding an entry preserves its file and data so it can be shown again later. The homepage certificate count is independently configurable from 0 to 50; the full visible collection remains in the certificate vault.

Custom pages use reorderable Text, Image, Gallery, Quote, Video, FAQ, Projects, Certificates, and Call to Action sections. Individual sections can be hidden without deleting them. Video embeds accept YouTube and Vimeo URLs. Layout styles and new section types still require a code change. Uploaded media is stored in `public/uploads` and served publicly from `/uploads`.

Projects, certificates, blog posts, and pages each support create, edit, and delete in the CMS. Published changes are Git commits and become public after the Netlify build completes.

## Everyday CMS Workflow

1. Open `https://YOUR-SITE.netlify.app/admin/` and sign in after Netlify Identity and Git Gateway have been enabled.
2. To add writing, open Articles & Case Studies, choose New, enter its title/date/summary/body, optionally upload a cover, then Publish.
3. To add work, open Projects, choose New, fill in the card details, upload an image or optional project files, then Publish. Featured controls whether it appears on the homepage; all published projects appear in the archive.
4. To make a page, open Pages & Page Sections, choose New, set a title, then add and reorder the sections you need. Turn off Visible to temporarily hide a section.
5. To upload an image/PDF, use the relevant Image, File, or PDF field and choose a file from your computer. Publish the entry; Netlify rebuilds the site and the uploaded asset is copied with it.
6. To remove a project, blog, certificate, or page, delete that CMS entry and Publish. To remove an uploaded file from the repository as well, first confirm it is not used by another entry, then remove the file from `public/uploads` in GitHub or VS Code. Removing an entry/reference does not automatically erase shared media files.

Keep private documents out of `public/uploads`; every file there is publicly accessible. Retain private originals in a separate backup. Batch several content edits before publishing to reduce unnecessary Netlify builds.
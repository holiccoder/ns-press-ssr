This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Continuous deployment

Every push to `master` is built and deployed to Vercel by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs [`scripts/deploy.sh`](scripts/deploy.sh). You can also start a deployment manually from the repository's **Actions** tab.

Configure these GitHub repository secrets once:

- `VERCEL_TOKEN` — a Vercel access token.
- `VERCEL_ORG_ID` — the `orgId` from `.vercel/project.json` after linking the project.
- `VERCEL_PROJECT_ID` — the `projectId` from `.vercel/project.json` after linking the project.

To link the project locally and retrieve those IDs:

```bash
npm install --global vercel@latest
vercel login
vercel link
```

After setting the secrets, deploy from Bash, WSL, or Git Bash with:

```bash
bash scripts/deploy.sh
```

Set the app's `NEXT_PUBLIC_*` values in the Vercel project settings. After the secrets are configured, pushing to `master` is enough to trigger a production deployment; no repeated Vercel CLI command is needed.

If this repository is already connected to Vercel's Git integration, use only one automatic deployment path to avoid duplicate builds.

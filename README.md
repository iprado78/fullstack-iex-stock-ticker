This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## App Bootstrap

### Pre-requisites

1. Have Node 14 installed and active on your machine (I recommend using [nvm](https://github.com/nvm-sh/nvm))
2. Set Bash as your terminal \*

- This will likely only be relevant if we eventually start doing more sophisticated things or sharing shortcuts

### Run App Shell

1. `git clone https://github.com/iprado78/fullstack-iex-stock-ticker.git`
2. `cd fullstack-iex-stockpicker`
3. `npm install`
4. `npm run dev`

### Steps to Bootstrap (Already done)

1. Create Github repo named `fullstack-iex-stockpicker`
2. `npx create-next-app fullstack-iex-stockpicker`
3. `cd fullstack-iex-stockpicker`
4. `git add remote origin https://github.com/iprado78/fullstack-iex-stock-ticker.git`
5. `git push --set-upstream origin main`
6. `touch tsconfig.json`
7. `npm run dev`
8. Next.js will give you a helpful error telling you what TypeScript related packages to install
9. `npm install --save-dev typescript @types/react`
10. Componentized Next.js boiler plate for our project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

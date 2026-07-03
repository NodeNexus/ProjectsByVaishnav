# NodeNexus - Engineered Intelligence Portfolio

A premium, GitHub-driven engineering portfolio built with React, Vite, TypeScript, and Tailwind CSS. The portfolio automatically fetches your public repositories, computes metrics, and dynamically generates project cards based on `portfolio/portfolio.json` files found within your repositories.

## Getting Started

1. Clone the repository.
2. Run `npm install`.
3. Update `src/config/site.ts` with your GitHub username.
4. Run `npm run dev` to start the development server.

## Deploying to Render

This project is configured and ready for 1-click deployment on [Render](https://render.com/).

### Automated Blueprint Deployment (Recommended)
Because a `render.yaml` Blueprint file is included in the root directory, Render can automatically configure the build settings for you.

1. Push your code to a GitHub repository.
2. Log into your Render dashboard.
3. Click **New +** and select **Blueprint**.
4. Connect the GitHub repository.
5. Render will automatically detect the `render.yaml` configuration and deploy the site.

### Manual Static Site Deployment
If you prefer not to use the Blueprint:

1. In Render, select **New +** -> **Static Site**.
2. Connect your GitHub repository.
3. Set the **Build Command** to: `npm install && npm run build`
4. Set the **Publish directory** to: `dist`
5. Click **Create Static Site**.

The rewrite rules for Single Page Applications are handled automatically by the included configuration.

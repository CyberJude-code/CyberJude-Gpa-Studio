# CyberJude GPA Studio

A premium GPA dashboard and academic tracker built with React, Tailwind CSS, and Chart.js.

## Features
- Dashboard with GPA cards, classification, and academic insights
- Dark / light theme with local storage persistence
- Dynamic GPA calculator with unlimited course rows
- Smart academic feedback and GPA prediction tools
- Analytics page with trend, comparison, and grade distribution charts
- Settings page with theme controls and reset options
- Export JSON report and print-friendly interface

## Setup
1. Install Node.js and npm.
2. In the project folder, run:

```bash
npm install
npm run dev
```

3. Open the local URL shown in the terminal.

## Notes
This project uses local storage for course and semester data, so your progress stays saved in the browser.

## Deployment
This app is ready for static deployment from the `dist/` folder.

### Netlify
1. Connect your repository to Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Add the `netlify.toml` file in the project root.

### Vercel
1. Connect your repository to Vercel.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. Add the `vercel.json` file in the project root.

### Vercel CLI
If you prefer deploying from your local machine, run:

```bash
npm install --save-dev vercel
npm run vercel:login
npm run vercel:deploy
```

This app is a static frontend and does not require a backend for its current GPA tracking and report features.

### Local deployment test
Run `npm run build` and then `npm run preview` to verify the production build locally before publishing.

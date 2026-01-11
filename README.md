# Crypto Dashboard (Angular)

A lightweight crypto dashboard built with Angular. It shows global market stats, a searchable list of top coins, and a coin detail page with a historical price chart.

- **Data source**: Public CoinGecko API
- **Pages**: Dashboard → Coins → Coin Detail (chart)

## Run locally

```bash
npm ci
npm start
```

Then open `http://localhost:4200`.

## Build

```bash
npm run build
```

Static output: `dist/crypto-dashboard/browser`

## Deploy to Vercel (static SPA)

- **Build Command**: `npm run build`
- **Output Directory**: `dist/crypto-dashboard/browser`

This repo includes `vercel.json` to make Angular routes work on refresh.

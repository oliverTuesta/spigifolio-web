# Spigifolio Web

Spigifolio is a personal investment portfolio dashboard built with Vue 3. It connects to the [spigifolio backend](https://github.com/oliverTuesta/spigifolio-api) to display portfolio summaries, asset positions, and transaction history. The design follows a warm editorial aesthetic inspired by modern fintech SaaS products.

---

## Screenshot

<img width="1584" height="1238" alt="image" src="https://github.com/user-attachments/assets/372daf1e-0db7-4f3a-ab72-0f4df485aeb8" />

---

## Tech Stack

- Vue 3 with TypeScript and Composition API
- Vuetify 3 for UI components
- Pinia for state management
- Vue Router for navigation
- Chart.js + vue-chartjs for the portfolio chart

---

## Features

- Portfolio summary with total balance, monthly return, and active positions
- Holdings table with current price, total value, and unrealized gain per asset
- Portfolio evolution chart covering the last 6 months
- Asset catalog with latest price and type filters
- Movement history with pagination and filters by type and date range
- Add movement form that automatically updates holdings on submit

---

## Getting Started

**Prerequisites**
- Node.js 18+
- The [spigifolio backend](https://github.com/oliverTuesta/spigifolio-api) running on `http://localhost:3000`

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default. All API requests are proxied to `http://localhost:3000` via the Vite dev server config, so no CORS issues during development.

---

## Notes

This project was built as a learning exercise and portfolio piece. It is not connected to any real brokerage or market data provider. Prices shown are based on the seed data from the backend repository and are not financially accurate.

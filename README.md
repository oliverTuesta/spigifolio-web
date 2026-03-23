# Spigifolio Web

Spigifolio Web is the frontend for a personal investment portfolio dashboard. It is built with Vue.js and consumes the REST API from the [spigifolio backend](https://github.com/oliverTuesta/spigifolio). The goal was to visualize portfolio data in a clean, intuitive interface: balance summaries, asset positions, and transaction history.

---

## Screenshot

<img width="1584" height="1238" alt="image" src="https://github.com/user-attachments/assets/372daf1e-0db7-4f3a-ab72-0f4df485aeb8" />

---

## Tech Stack

- Vue.js 3 with Composition API
- Vue Router
- Axios for API communication
- Vite

---

## Features

- Portfolio summary showing total balance, monthly return, and active positions
- Interactive chart of portfolio value over time
- Asset positions table with unrealized gain/loss per holding
- Movement history with filters by transaction type and date range

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- The [spigifolio backend](https://github.com/oliverTuesta/spigifolio-api) running locally

```bash
cp .env.example .env
# Set VITE_API_URL to your backend URL (e.g. http://localhost:3000)
npm install
npm run dev
```

Before using the app, you need to create a user. Open the backend's Swagger UI at `/api` and use the **POST /users** endpoint. The `id` returned in the response is what you will use to log in and view your portfolio.

---

## Notes

This project was built as a learning exercise and a portfolio piece. It connects to a locally seeded database with approximated historical prices and is not linked to any real brokerage or market data provider.

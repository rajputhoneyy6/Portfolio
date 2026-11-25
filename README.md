# Ayush — Motion Portfolio (React + Vite + Custom CSS + Express Backend)

A 100% pixel-faithful React + Vite + Custom CSS full-stack version of your motion portfolio paired with an Express.js backend for persistent contact inquiries, discovery call bookings, live profile updates, and optional SMTP email notifications.

## Folder Structure

- `client/` — React 18 + Vite frontend with pure custom CSS (`src/styles/portfolio.css`), modular components (`src/components/`), and image assets (`public/assets/`)
- `server/` — Express.js API server (`index.js`, `store.js`, `mailer.js`) with file-backed persistence (`data/db.json`)

## Run Locally (Development)

Open **two terminals**:

**Terminal 1 — Start the Express Backend (port 3000):**
```bash
cd server
npm install
cp .env.example .env
npm start
```

**Terminal 2 — Start the React + Vite Frontend (port 5173, auto-proxies `/api` to port 3000):**
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Production Build (Single Server)

```bash
cd client && npm install && npm run build
cd ../server && npm install && npm start
```
Express automatically serves `client/dist` alongside `/api/*` at `http://localhost:3000`.

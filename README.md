# AI Resume Generator

A small full-stack app: a vanilla HTML/CSS/JS form (`frontend/`) that sends your details to an Express API (`backend/`), which asks OpenAI to draft a plain-text resume.

## Run locally

```bash
cd backend
cp .env.example .env        # then put your own OPENAI_API_KEY in .env
npm install
npm start                   # http://localhost:3000
```

Open `frontend/index.html` in a browser (or serve the folder, e.g. `npx serve frontend`). When opened from `localhost` the page talks to `http://localhost:3000` automatically.

## API

`POST /api/generate-resume` with JSON `{ "name", "position", "details" }` (all required strings; 100 / 100 / 4000 characters max) returns `{ "resume": "..." }`. Errors are `{ "error": "..." }`. `GET /health` returns `{ "ok": true }`. Requests are rate limited to 10 per minute per IP.

## Configuration (`backend/.env`)

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | required |
| `OPENAI_MODEL` | optional, default `gpt-4o-mini` |
| `PORT` | optional, default 3000 |
| `ALLOWED_ORIGINS` | comma-separated frontend origins allowed by CORS; empty = any (local dev only) |

## Deploy

- **Backend** (e.g. Render): root directory `backend`, build `npm install`, start `npm start`, set the env vars above (set `ALLOWED_ORIGINS` to your frontend URL).
- **Frontend** (e.g. Netlify): publish directory `frontend`; edit `frontend/config.js` and set `window.API_BASE` to the backend URL.

## Tests

```bash
cd backend && npm test
```

## Security

Never commit `.env`. See `SECURITY.md` for reporting.

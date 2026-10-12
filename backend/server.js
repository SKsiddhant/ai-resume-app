import 'dotenv/config';
import { OpenAI } from 'openai';
import { createApp } from './app.js';

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set. Copy backend/.env.example to backend/.env and fill it in.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function generate(prompt) {
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
  });
  return response.choices?.[0]?.message?.content?.trim() ?? '';
}

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const PORT = process.env.PORT || 3000;
createApp({ generate, allowedOrigins }).listen(PORT, () => console.log(`Server running on port ${PORT}`));

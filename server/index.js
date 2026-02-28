import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = Number(process.env.API_PORT || 8787);
const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || 'stabilityai/stable-diffusion-xl-base-1.0';
const HF_URL = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`;
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!HF_API_KEY) {
  console.error('[api] Missing HF_API_KEY in environment.');
  process.exit(1);
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl, server-to-server) where origin is undefined.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: HF_MODEL });
});

app.post('/api/generate-image', async (req, res) => {
  const prompt = String(req.body?.prompt || '').trim();
  const style = String(req.body?.style || '').trim();

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const fullPrompt = `${prompt}${style ? `, ${style} style` : ''}, high quality`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 65000);

  try {
    const hfResponse = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          guidance_scale: 7.5,
          num_inference_steps: 28,
        },
      }),
      signal: controller.signal,
    });

    const contentType = hfResponse.headers.get('content-type') || '';
    const payload = Buffer.from(await hfResponse.arrayBuffer());

    if (!hfResponse.ok) {
      const errorText = payload.toString('utf8').slice(0, 500);
      return res.status(hfResponse.status).json({
        error: `HF request failed (${hfResponse.status}).`,
        details: errorText,
      });
    }

    if (!contentType.startsWith('image/')) {
      const errorText = payload.toString('utf8').slice(0, 500);
      return res.status(502).json({
        error: 'HF did not return an image.',
        details: errorText,
      });
    }

    return res.json({
      imageBase64: payload.toString('base64'),
      mimeType: contentType,
      provider: 'huggingface-router',
      model: HF_MODEL,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Proxy error while generating image.', details: message });
  } finally {
    clearTimeout(timeoutId);
  }
});

app.listen(PORT, () => {
  console.log(`[api] running on http://localhost:${PORT}`);
  console.log(`[api] model: ${HF_MODEL}`);
  console.log(`[api] cors origins: ${allowedOrigins.join(', ')}`);
});

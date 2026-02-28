import { useEffect, useMemo, useState } from 'react';
import type { ImageLabContent, Locale } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:8787' : ''))
  .trim()
  .replace(/\/+$/, '');
const HF_ROUTER_URL = 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0';
const GRADIO_SPACE_BASE_URL = 'https://multimodalart-flux-1-merged.hf.space';
const FETCH_TIMEOUT_MS = 90000;
const BACKEND_TIMEOUT_MS = 90000;
const HF_TOKEN_STORAGE_KEY = 'dragos_hf_read_token';

interface ImageLabSectionProps {
  locale: Locale;
  imageLab: ImageLabContent;
}

function buildInlineSvgFallback(rawPrompt: string, styleName: string) {
  const safePrompt = rawPrompt.replace(/[<>&]/g, '').slice(0, 80);
  const safeStyle = styleName.replace(/[<>&]/g, '').slice(0, 30);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f0d6cf" />
          <stop offset="1" stop-color="#d6ddec" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#g)" />
      <circle cx="812" cy="194" r="90" fill="#ffffff66" />
      <circle cx="200" cy="844" r="108" fill="#ffffff4a" />
      <rect x="132" y="160" width="760" height="704" rx="40" fill="#ffffffcc" />
      <text x="182" y="270" font-family="Inter, Arial, sans-serif" font-size="46" fill="#6f4e5c" font-weight="700">Local preview</text>
      <text x="182" y="336" font-family="JetBrains Mono, monospace" font-size="28" fill="#755a67">Style: ${safeStyle}</text>
      <text x="182" y="410" font-family="Inter, Arial, sans-serif" font-size="34" fill="#6a515f">Prompt: ${safePrompt}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildGenerationPrompt(rawPrompt: string, styleName: string) {
  const normalizedStyle = styleName.trim() ? `${styleName} style` : '';
  return [rawPrompt.trim(), normalizedStyle, 'high quality'].filter(Boolean).join(', ');
}

async function blobToDataUrl(blob: Blob) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not parse image blob.'));
    reader.readAsDataURL(blob);
  });
}

async function fetchWithTimeout(resource: string, options?: RequestInit, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(resource, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseGradioSseData(streamPayload: string) {
  const dataLines = streamPayload
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('data:'));

  if (dataLines.length === 0) {
    throw new Error('gradio stream returned no data lines');
  }

  const rawData = dataLines[dataLines.length - 1].replace(/^data:\s*/, '').trim();
  if (!rawData || rawData === 'null') {
    throw new Error('gradio stream returned null payload');
  }

  return JSON.parse(rawData) as Array<
    | {
        url?: string;
      }
    | number
  >;
}

async function generateViaGradioSpace(cleanPrompt: string) {
  const startResponse = await fetchWithTimeout(`${GRADIO_SPACE_BASE_URL}/gradio_api/call/infer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Keep params simple/stable for faster execution.
      data: [cleanPrompt, 0, true, 1024, 1024, 3.5, 8],
    }),
  });

  if (!startResponse.ok) {
    throw new Error(`gradio start failed (${startResponse.status})`);
  }

  const startData = (await startResponse.json()) as { event_id?: string };
  if (!startData.event_id) {
    throw new Error('gradio did not return event_id');
  }

  const streamResponse = await fetchWithTimeout(
    `${GRADIO_SPACE_BASE_URL}/gradio_api/call/infer/${encodeURIComponent(startData.event_id)}`
  );
  if (!streamResponse.ok) {
    throw new Error(`gradio stream failed (${streamResponse.status})`);
  }

  const streamPayload = await streamResponse.text();
  const parsed = parseGradioSseData(streamPayload);
  const fileInfo = parsed.find((item) => typeof item === 'object' && item !== null && 'url' in item) as
    | {
        url?: string;
      }
    | undefined;

  if (!fileInfo?.url) {
    throw new Error('gradio payload missing image url');
  }

  const imageResponse = await fetchWithTimeout(fileInfo.url);
  if (!imageResponse.ok) {
    throw new Error(`gradio image fetch failed (${imageResponse.status})`);
  }

  const imageBlob = await imageResponse.blob();
  return await blobToDataUrl(imageBlob);
}

async function generateViaHfRouter(prompt: string, token: string) {
  if (!token) {
    throw new Error('missing HF token');
  }

  const hfResponse = await fetchWithTimeout(HF_ROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        guidance_scale: 7.5,
        num_inference_steps: 28,
      },
    }),
  });

  if (!hfResponse.ok) {
    const body = await hfResponse.text();
    throw new Error(`hf router failed (${hfResponse.status}) ${body.slice(0, 140)}`);
  }

  const contentType = hfResponse.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    const body = await hfResponse.text();
    throw new Error(`hf router returned non-image payload: ${body.slice(0, 140)}`);
  }

  const blob = await hfResponse.blob();
  return await blobToDataUrl(blob);
}

export function ImageLabSection({ locale, imageLab }: ImageLabSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(imageLab.styleOptions[0]?.value ?? 'realistic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [downloadName, setDownloadName] = useState('dragos-ai-image.png');
  const [hfTokenInput, setHfTokenInput] = useState('');
  const [isTokenSaved, setIsTokenSaved] = useState(false);

  const quickPrompts = useMemo(() => imageLab.quickPrompts.map((item) => t(item, locale)), [imageLab.quickPrompts, locale]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HF_TOKEN_STORAGE_KEY)?.trim() || '';
      setHfTokenInput(stored);
      setIsTokenSaved(Boolean(stored));
    } catch {
      setHfTokenInput('');
      setIsTokenSaved(false);
    }
  }, []);

  function handleSaveToken() {
    const cleaned = hfTokenInput.trim();
    try {
      if (cleaned) {
        window.localStorage.setItem(HF_TOKEN_STORAGE_KEY, cleaned);
        setIsTokenSaved(true);
      } else {
        window.localStorage.removeItem(HF_TOKEN_STORAGE_KEY);
        setIsTokenSaved(false);
      }
    } catch {
      // no-op; some browsers might block storage in private contexts
    }
  }

  async function handleGenerate() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      setError(t(imageLab.missingPromptError, locale));
      return;
    }

    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      const errors: string[] = [];
      let resolvedImageUrl = '';
      const promptForProvider = buildGenerationPrompt(cleanPrompt, style);

      if (API_BASE_URL) {
        try {
          const backendResponse = await fetchWithTimeout(
            `${API_BASE_URL}/api/generate-image`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: cleanPrompt,
                style,
              }),
            },
            BACKEND_TIMEOUT_MS
          );

          const backendData = (await backendResponse.json()) as {
            imageBase64?: string;
            mimeType?: string;
            error?: string;
            details?: string;
          };

          if (!backendResponse.ok || !backendData.imageBase64) {
            const details = backendData.details ? ` (${backendData.details})` : '';
            throw new Error(`${backendData.error || 'Generation failed'}${details}`);
          }

          const imageMime = backendData.mimeType || 'image/jpeg';
          resolvedImageUrl = `data:${imageMime};base64,${backendData.imageBase64}`;
        } catch (backendError) {
          const message = backendError instanceof Error ? backendError.message : 'Unknown backend error';
          errors.push(`backend: ${message}`);
        }
      }

      const hfToken = hfTokenInput.trim();
      if (!resolvedImageUrl && hfToken) {
        try {
          resolvedImageUrl = await generateViaHfRouter(promptForProvider, hfToken);
        } catch (hfError) {
          const message = hfError instanceof Error ? hfError.message : 'Unknown HF router error';
          errors.push(`hf-router: ${message}`);
        }
      }

      if (!resolvedImageUrl) {
        try {
          resolvedImageUrl = await generateViaGradioSpace(promptForProvider);
        } catch (gradioError) {
          const message = gradioError instanceof Error ? gradioError.message : 'Unknown gradio error';
          errors.push(`gradio: ${message}`);
        }
      }

      if (!resolvedImageUrl) {
        throw new Error(errors.join(' | ') || 'No provider available');
      }

      setImageUrl(resolvedImageUrl);
      setDownloadName(`dragos-ai-${Date.now()}.png`);
    } catch (generationError) {
      const message = generationError instanceof Error ? generationError.message : 'Unknown error';
      console.error('[image-lab] generation error:', message);

      const localPreview = buildInlineSvgFallback(cleanPrompt, style);
      setImageUrl(localPreview);
      setDownloadName(`dragos-ai-local-${Date.now()}.png`);
      setError(
        locale === 'es'
          ? 'No se pudo generar la imagen con los proveedores disponibles. Si estas en GitHub Pages, guarda un token de Hugging Face y vuelve a probar.'
          : 'Could not generate the image with available providers. If you are on GitHub Pages, save a Hugging Face token and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setPrompt('');
    setError('');
    setIsLoading(false);
    setImageUrl('');
  }

  return (
    <SectionWrapper id="image-lab" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(imageLab.title, locale)}</h2>
      </div>

      <article className="generator-hero glass-panel mt-6 p-5 sm:p-6">
        <p className="subtle-label">{locale === 'es' ? 'Laboratorio visual' : 'Visual lab'}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-[var(--title)] sm:text-3xl">
          {locale === 'es'
            ? 'Genera imagenes con prompts sencillos y resultado inmediato.'
            : 'Generate images with simple prompts and immediate results.'}
        </h3>
        <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">{t(imageLab.intro, locale)}</p>
      </article>

      <div className="generator-grid mt-6">
        <article className="glass-panel p-5 sm:p-6">
          <label htmlFor="prompt" className="generator-label mt-1">
            {t(imageLab.promptLabel, locale)}
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="generator-input mt-2 min-h-28"
            placeholder={t(imageLab.promptPlaceholder, locale)}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {quickPrompts.map((qp) => (
              <button key={qp} type="button" className="chip text-left" onClick={() => setPrompt(qp)}>
                {qp}
              </button>
            ))}
          </div>

          <label htmlFor="style" className="generator-label mt-5">
            {t(imageLab.styleLabel, locale)}
          </label>
          <select id="style" value={style} onChange={(e) => setStyle(e.target.value)} className="generator-input mt-2">
            {imageLab.styleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label, locale)}
              </option>
            ))}
          </select>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--card-elevated)]/60 p-3">
            <p className="generator-label">
              {locale === 'es' ? 'Token Hugging Face (opcional, recomendado en web)' : 'Hugging Face token (optional, recommended on web)'}
            </p>
            <p className="generator-hint mt-1">
              {locale === 'es'
                ? 'Se guarda solo en tu navegador para mejorar la fiabilidad del generador en GitHub Pages.'
                : 'Stored only in your browser to improve generator reliability on GitHub Pages.'}
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                type="password"
                value={hfTokenInput}
                onChange={(e) => setHfTokenInput(e.target.value)}
                className="generator-input"
                placeholder={locale === 'es' ? 'hf_xxx...' : 'hf_xxx...'}
              />
              <button type="button" onClick={handleSaveToken} className="generator-secondary-button sm:w-auto">
                {locale === 'es' ? 'Guardar token' : 'Save token'}
              </button>
            </div>
            {isTokenSaved ? (
              <p className="mt-2 text-xs text-emerald-400">
                {locale === 'es' ? 'Token guardado localmente.' : 'Token saved locally.'}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={handleGenerate} disabled={isLoading} className="generator-primary-button">
              {isLoading ? t(imageLab.generatingLabel, locale) : t(imageLab.generateLabel, locale)}
            </button>
            <button type="button" onClick={handleClear} disabled={isLoading} className="generator-secondary-button">
              {t(imageLab.clearLabel, locale)}
            </button>
          </div>

          {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
          <p className="generator-hint mt-3">{t(imageLab.note, locale)}</p>
        </article>

        <article className="glass-panel p-5 sm:p-6">
          <div className="preview-area mt-3 relative">
            {isLoading ? (
              <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-[var(--muted)]">
                {t(imageLab.generatingLabel, locale)}...
              </p>
            ) : null}

            {imageUrl ? (
              <img src={imageUrl} alt="Generated image preview" className="h-full w-full object-contain" />
            ) : !isLoading ? (
              <p className="text-sm text-[var(--muted)]">{t(imageLab.emptyPreviewText, locale)}</p>
            ) : null}
          </div>

          {imageUrl ? (
            <a
              href={imageUrl}
              download={downloadName}
              target="_blank"
              rel="noreferrer"
              className="generator-primary-button mt-4 inline-flex"
            >
              {t(imageLab.downloadLabel, locale)}
            </a>
          ) : null}
        </article>
      </div>
    </SectionWrapper>
  );
}

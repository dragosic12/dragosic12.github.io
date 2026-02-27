import { useMemo, useRef, useState } from 'react';
import type { ImageLabContent, Locale } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

const POLLINATIONS_API = 'https://image.pollinations.ai/prompt';
const KEYWORD_FALLBACK_API = 'https://loremflickr.com';
const SEEDED_FALLBACK_API = 'https://picsum.photos';
const PRIMARY_TIMEOUT_MS = 5000;
const SECONDARY_TIMEOUT_MS = 7000;
const TERTIARY_TIMEOUT_MS = 9000;
const POLLINATIONS_FAILURE_THRESHOLD = 1;
const POLLINATIONS_COOLDOWN_MS = 5 * 60 * 1000;

interface ImageLabSectionProps {
  locale: Locale;
  imageLab: ImageLabContent;
}

interface ProviderCandidate {
  id: 'pollinations-default' | 'keyword-fallback' | 'seeded-fallback';
  url: string;
  timeoutMs: number;
}

interface PollinationsHealth {
  consecutiveFailures: number;
  cooldownUntil: number;
}

function preloadImage(url: string, timeoutMs: number) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    const timerId = window.setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      reject(new Error('timeout'));
    }, timeoutMs);

    img.onload = () => {
      window.clearTimeout(timerId);
      img.onload = null;
      img.onerror = null;
      resolve();
    };

    img.onerror = () => {
      window.clearTimeout(timerId);
      img.onload = null;
      img.onerror = null;
      reject(new Error('image-load-error'));
    };

    img.src = url;
  });
}

function buildFallbackCategory(rawPrompt: string) {
  const tags = rawPrompt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 4)
    .join(',');

  return tags || 'animals,car,pet';
}

function buildInlineSvgFallback(rawPrompt: string, styleName: string) {
  const safePrompt = rawPrompt.replace(/[<>&]/g, '').slice(0, 80);
  const safeStyle = styleName.replace(/[<>&]/g, '').slice(0, 30);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f8edf1" />
          <stop offset="1" stop-color="#f4e4ea" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)" />
      <circle cx="812" cy="194" r="90" fill="#ffffff66" />
      <circle cx="200" cy="844" r="108" fill="#ffffff4a" />
      <rect x="132" y="160" width="760" height="704" rx="40" fill="#fffaf8" stroke="#d8b8ae" stroke-width="3" />
      <text x="182" y="270" font-family="Inter, Arial, sans-serif" font-size="46" fill="#7a4656" font-weight="700">Preview fallback</text>
      <text x="182" y="336" font-family="JetBrains Mono, monospace" font-size="28" fill="#7f5c66">Style: ${safeStyle}</text>
      <text x="182" y="410" font-family="Inter, Arial, sans-serif" font-size="34" fill="#6d4752">Prompt: ${safePrompt}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function hashText(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  return Math.abs(hash >>> 0);
}

export function ImageLabSection({ locale, imageLab }: ImageLabSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(imageLab.styleOptions[0]?.value ?? 'realistic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [providerNotice, setProviderNotice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [downloadName, setDownloadName] = useState('dragos-ai-image.png');
  const requestIdRef = useRef(0);
  const pollinationsHealthRef = useRef<PollinationsHealth>({
    consecutiveFailures: 0,
    cooldownUntil: 0,
  });

  const quickPrompts = useMemo(() => imageLab.quickPrompts.map((item) => t(item, locale)), [imageLab.quickPrompts, locale]);

  async function handleGenerate() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      setError(t(imageLab.missingPromptError, locale));
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setIsLoading(true);
    setError('');
    setProviderNotice('');

    const seed = Date.now();
    const craftedPrompt = `${cleanPrompt}, ${style} style, high quality`;
    const promptWithParams = `${encodeURIComponent(craftedPrompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;
    const fallbackCategory = buildFallbackCategory(cleanPrompt);
    const fallbackSeed = hashText(`${cleanPrompt}|${style}|${seed}`);
    const localUrl = buildInlineSvgFallback(cleanPrompt, style);
    const now = Date.now();
    const canTryPollinations = now >= pollinationsHealthRef.current.cooldownUntil;

    const providers: ProviderCandidate[] = [];

    if (canTryPollinations) {
      providers.push({
        id: 'pollinations-default',
        url: `${POLLINATIONS_API}/${promptWithParams}`,
        timeoutMs: PRIMARY_TIMEOUT_MS,
      });
    }

    providers.push(
      {
        id: 'seeded-fallback',
        url: `${SEEDED_FALLBACK_API}/seed/${fallbackSeed}/1024/1024`,
        timeoutMs: SECONDARY_TIMEOUT_MS,
      },
      {
        id: 'keyword-fallback',
        url: `${KEYWORD_FALLBACK_API}/1024/1024/${fallbackCategory}?lock=${seed}`,
        timeoutMs: TERTIARY_TIMEOUT_MS,
      }
    );

    for (const provider of providers) {
      try {
        await preloadImage(provider.url, provider.timeoutMs);
        if (requestId !== requestIdRef.current) return;

        if (provider.id === 'pollinations-default') {
          pollinationsHealthRef.current = {
            consecutiveFailures: 0,
            cooldownUntil: 0,
          };
        }

        setImageUrl(provider.url);
        setDownloadName(`dragos-ai-${seed}.png`);
        setError('');
        setProviderNotice('');

        setIsLoading(false);
        return;
      } catch {
        if (provider.id === 'pollinations-default') {
          const nextFailures = pollinationsHealthRef.current.consecutiveFailures + 1;
          const cooldownUntil =
            nextFailures >= POLLINATIONS_FAILURE_THRESHOLD ? Date.now() + POLLINATIONS_COOLDOWN_MS : 0;

          pollinationsHealthRef.current = {
            consecutiveFailures: nextFailures,
            cooldownUntil,
          };
        }
      }
    }

    if (requestId !== requestIdRef.current) return;

    setImageUrl(localUrl);
    setDownloadName(`dragos-ai-${seed}.png`);
    setProviderNotice(
      locale === 'es'
        ? 'Se ha activado una vista local porque los servicios externos no respondieron.'
        : 'A local preview was activated because external services did not respond.'
    );
    setError('');
    setIsLoading(false);
  }

  function handleClear() {
    requestIdRef.current += 1;
    setPrompt('');
    setError('');
    setProviderNotice('');
    setIsLoading(false);
    setImageUrl('');
  }

  function handlePreviewLoad() {
    setIsLoading(false);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Image ready', {
        body: locale === 'es' ? 'Tu imagen esta lista para descargar.' : 'Your image is ready to download.',
      });
    }
  }

  function handlePreviewError() {
    const localUrl = buildInlineSvgFallback(prompt.trim() || 'image generation', style);
    setImageUrl(localUrl);
    setProviderNotice(
      locale === 'es'
        ? 'La vista previa fallo en este navegador. Se ha cargado la version local.'
        : 'Preview failed in this browser. Local version has been loaded.'
    );
    setError('');
    setIsLoading(false);
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
            onChange={(event) => setPrompt(event.target.value)}
            className="generator-input mt-2 min-h-28"
            placeholder={t(imageLab.promptPlaceholder, locale)}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {quickPrompts.map((quickPrompt) => (
              <button
                key={quickPrompt}
                type="button"
                className="chip text-left"
                onClick={() => setPrompt(quickPrompt)}
              >
                {quickPrompt}
              </button>
            ))}
          </div>

          <label htmlFor="style" className="generator-label mt-5">
            {t(imageLab.styleLabel, locale)}
          </label>
          <select id="style" value={style} onChange={(event) => setStyle(event.target.value)} className="generator-input mt-2">
            {imageLab.styleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.label, locale)}
              </option>
            ))}
          </select>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={handleGenerate} disabled={isLoading} className="generator-primary-button">
              {isLoading ? t(imageLab.generatingLabel, locale) : t(imageLab.generateLabel, locale)}
            </button>
            <button type="button" onClick={handleClear} disabled={isLoading} className="generator-secondary-button">
              {t(imageLab.clearLabel, locale)}
            </button>
          </div>

          {error ? (
            <p role="alert" className="mt-3 rounded-xl border border-rose-400/45 bg-rose-300/10 p-3 text-sm text-rose-300">
              {error}
            </p>
          ) : null}

          {providerNotice ? (
            <p className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--bg-soft)]/65 p-3 text-sm text-[var(--muted)]">
              {providerNotice}
            </p>
          ) : null}

          <p className="generator-hint mt-3">{t(imageLab.note, locale)}</p>
        </article>

        <article className="glass-panel p-5 sm:p-6">
          <p className="generator-label">{t(imageLab.previewTitle, locale)}</p>
          <div className="preview-area mt-3">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated image preview"
                className="h-full w-full object-contain"
                onLoad={handlePreviewLoad}
                onError={handlePreviewError}
              />
            ) : (
              <p className="px-4 text-center text-sm text-[var(--muted)]">{t(imageLab.emptyPreviewText, locale)}</p>
            )}
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

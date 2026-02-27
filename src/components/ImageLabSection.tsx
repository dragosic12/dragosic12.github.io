import { useMemo, useState } from 'react';
import type { ImageLabContent, Locale } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

const IMAGE_API_PRIMARY = 'https://image.pollinations.ai/prompt';
const IMAGE_API_FALLBACK = 'https://loremflickr.com';

interface ImageLabSectionProps {
  locale: Locale;
  imageLab: ImageLabContent;
}

export function ImageLabSection({ locale, imageLab }: ImageLabSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(imageLab.styleOptions[0]?.value ?? 'realistic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [providerNotice, setProviderNotice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');
  const [usedFallback, setUsedFallback] = useState(false);
  const [downloadName, setDownloadName] = useState('dragos-ai-image.png');

  const quickPrompts = useMemo(() => imageLab.quickPrompts.map((item) => t(item, locale)), [imageLab.quickPrompts, locale]);

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
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f0d6cf" />
            <stop offset="1" stop-color="#d6ddec" />
          </linearGradient>
        </defs>
        <rect width="1024" height="1024" fill="url(#g)" />
        <circle cx="812" cy="194" r="90" fill="#ffffff66" />
        <circle cx="200" cy="844" r="108" fill="#ffffff4a" />
        <rect x="132" y="160" width="760" height="704" rx="40" fill="#ffffffcc" />
        <text x="182" y="270" font-family="Inter, Arial, sans-serif" font-size="46" fill="#6f4e5c" font-weight="700">Preview fallback</text>
        <text x="182" y="336" font-family="JetBrains Mono, monospace" font-size="28" fill="#755a67">Style: ${safeStyle}</text>
        <foreignObject x="182" y="392" width="660" height="350">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter, Arial, sans-serif; font-size:30px; line-height:1.35; color:#6a515f;">
            Prompt: ${safePrompt}
          </div>
        </foreignObject>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function handleGenerate() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      setError(t(imageLab.missingPromptError, locale));
      return;
    }

    setIsLoading(true);
    setError('');
    setProviderNotice('');
    setUsedFallback(false);

    const seed = Date.now();
    const craftedPrompt = `${cleanPrompt}, ${style} style, high quality`;
    const primaryUrl = `${IMAGE_API_PRIMARY}/${encodeURIComponent(craftedPrompt)}?model=flux&width=1024&height=1024&nologo=true&seed=${seed}`;
    const fallbackCategory = buildFallbackCategory(cleanPrompt);
    const secondaryUrl = `${IMAGE_API_FALLBACK}/1024/1024/${fallbackCategory}?lock=${seed}`;

    setFallbackUrl(secondaryUrl);
    setImageUrl(primaryUrl);
    setDownloadName(`dragos-ai-${seed}.png`);
  }

  function handleClear() {
    setPrompt('');
    setError('');
    setProviderNotice('');
    setIsLoading(false);
    setUsedFallback(false);
    setFallbackUrl('');
    setImageUrl('');
  }

  function handlePreviewLoad() {
    setIsLoading(false);

    if (usedFallback) {
      setProviderNotice(
        locale === 'es'
          ? 'El proveedor principal no respondio. Se ha mostrado una alternativa visual.'
          : 'Main provider did not respond. A visual fallback has been displayed.'
      );
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Image ready', {
        body: locale === 'es' ? 'Tu imagen esta lista para descargar.' : 'Your image is ready to download.',
      });
    }
  }

  function handlePreviewError() {
    if (!usedFallback && fallbackUrl) {
      setUsedFallback(true);
      setImageUrl(fallbackUrl);
      return;
    }

    setUsedFallback(true);
    setImageUrl(buildInlineSvgFallback(prompt.trim() || 'image generation', style));
    setProviderNotice(
      locale === 'es'
        ? 'El proveedor principal y el fallback remoto han fallado. Se muestra una vista local.'
        : 'Main provider and remote fallback failed. A local preview is shown.'
    );
    setError('');
    setIsLoading(false);
  }

  return (
    <SectionWrapper id="image-lab" className="pt-12 sm:pt-20">
      <div className="section-header">
        <h2>{t(imageLab.title, locale)}</h2>
        <p>{t(imageLab.intro, locale)}</p>
      </div>

      <div className="generator-grid mt-8">
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

import { useEffect, useMemo, useState } from 'react';
import type { ImageLabContent, Locale } from '../types/content';
import { t } from '../content/i18n';
import { SectionWrapper } from './SectionWrapper';

const IMAGE_API_BASE = 'https://image.pollinations.ai/prompt';

interface ImageLabSectionProps {
  locale: Locale;
  imageLab: ImageLabContent;
}

export function ImageLabSection({ locale, imageLab }: ImageLabSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(imageLab.styleOptions[0]?.value ?? 'realistic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [downloadName, setDownloadName] = useState('dragos-ai-image.png');

  const quickPrompts = useMemo(() => imageLab.quickPrompts.map((item) => t(item, locale)), [imageLab.quickPrompts, locale]);

  useEffect(
    () => () => {
      if (imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    },
    [imageUrl]
  );

  function handleGenerate() {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      setError(t(imageLab.missingPromptError, locale));
      return;
    }

    setIsLoading(true);
    setError('');
    if (imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }

    const craftedPrompt = `${cleanPrompt}, ${style} style, high quality`;
    const nextUrl = `${IMAGE_API_BASE}/${encodeURIComponent(craftedPrompt)}?model=flux&width=1024&height=1024&nologo=true&seed=${Date.now()}`;
    setImageUrl(nextUrl);
    setDownloadName(`dragos-ai-${Date.now()}.png`);
    setIsLoading(false);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Image ready', {
        body: locale === 'es' ? 'Tu imagen esta lista para descargar.' : 'Your image is ready to download.',
      });
    }
  }

  function handleClear() {
    setPrompt('');
    setError('');
    if (imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl('');
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
                onError={() => setError(t(imageLab.apiErrorPrefix, locale))}
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

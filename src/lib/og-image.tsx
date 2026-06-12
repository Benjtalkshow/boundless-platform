import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { ImageResponse } from 'next/og';

/** Standard Open Graph image dimensions and type, shared by every route. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: 'normal';
};

let fontsPromise: Promise<OgFont[]> | null = null;

/**
 * Loads the brand font (Plus Jakarta Sans, the site's body face) for use in
 * generated images. `next/og` (satori) needs raw font data; we read the bundled
 * `.woff` files from disk (resolved via `import.meta.url` so they are traced
 * into the deployment). Cached so repeated image generations reuse one load.
 */
function loadFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    const read = (file: string) =>
      readFile(fileURLToPath(new URL(`./og-fonts/${file}`, import.meta.url)));
    fontsPromise = Promise.all([
      read('plus-jakarta-sans-400.woff'),
      read('plus-jakarta-sans-700.woff'),
    ]).then(([regular, bold]) => [
      {
        name: 'Plus Jakarta Sans',
        data: regular,
        weight: 400,
        style: 'normal',
      },
      { name: 'Plus Jakarta Sans', data: bold, weight: 700, style: 'normal' },
    ]);
  }
  return fontsPromise;
}

function BoundlessMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={(size * 78) / 85}
      viewBox='0 0 85 78'
      fill='#2EEDAA'
    >
      <path d='M38.4163 49.56V27.8694L38.4313 27.8593L38.4163 27.8493L0 0V21.7157L23.456 38.7122L0 55.7086V77.4194L38.4163 49.5751L38.4313 49.5651L38.4163 49.56Z' />
      <path d='M84.5796 49.56V27.8694L84.5947 27.8593L84.5796 27.8493L46.1733 0V21.7157L69.6243 38.7122L46.1733 55.7086V77.4194L84.5796 49.5751L84.5947 49.5651L84.5796 49.56Z' />
    </svg>
  );
}

/**
 * Renders a branded Boundless Open Graph image (1200x630) with the brand mark,
 * a title and a supporting line, in the brand font. Used by the route-level
 * `opengraph-image` files. Uses inline styles only, as required by `next/og`.
 */
export async function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const fonts = await loadFonts();
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        padding: '80px',
        backgroundColor: '#0D1111',
        backgroundImage:
          'radial-gradient(1100px 560px at 100% 120%, rgba(46,237,170,0.20), rgba(13,17,17,0) 60%)',
        color: '#FFFFFF',
        fontFamily: 'Plus Jakarta Sans',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <BoundlessMark size={64} />
        <span
          style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1px' }}
        >
          boundless
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '76px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            maxWidth: '960px',
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: '32px',
              fontWeight: 400,
              lineHeight: 1.35,
              color: '#929F9C',
              marginTop: '24px',
              maxWidth: '880px',
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  );
}

/** Square brand icon (mark centered on the ink background) for app icons. */
export function renderBrandIcon(dimension: number) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D1111',
      }}
    >
      <BoundlessMark size={dimension * 0.5} />
    </div>,
    { width: dimension, height: dimension }
  );
}

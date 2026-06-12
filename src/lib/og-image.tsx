import { ImageResponse } from 'next/og';

/** Standard Open Graph image dimensions and type, shared by every route. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Renders a branded Boundless Open Graph image (1200x630) with the brand mark,
 * a title and a supporting line. Used by the route-level `opengraph-image`
 * files. Uses inline styles only, as required by `next/og`.
 */
export function renderOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
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
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <svg width='64' height='59' viewBox='0 0 85 78' fill='#2EEDAA'>
          <path d='M38.4163 49.56V27.8694L38.4313 27.8593L38.4163 27.8493L0 0V21.7157L23.456 38.7122L0 55.7086V77.4194L38.4163 49.5751L38.4313 49.5651L38.4163 49.56Z' />
          <path d='M84.5796 49.56V27.8694L84.5947 27.8593L84.5796 27.8493L46.1733 0V21.7157L69.6243 38.7122L46.1733 55.7086V77.4194L84.5796 49.5751L84.5947 49.5651L84.5796 49.56Z' />
        </svg>
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
    { ...OG_SIZE }
  );
}

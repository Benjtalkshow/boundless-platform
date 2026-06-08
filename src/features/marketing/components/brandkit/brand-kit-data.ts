/** Downloadable ZIP of the Boundless logos + mark, under /public. */
export const BRAND_KIT_ZIP = '/brand/boundless-brand-kit.zip';

export interface BrandLogo {
  /** Logo asset path under /public. */
  src: string;
  /** Surface the logo sits on: `dark` (bordered) or `light` (white card). */
  surface: 'dark' | 'light';
  /** Accessible description of the variant. */
  alt: string;
}

/** The 2x2 logo grid: colour + monochrome, on dark and on light. */
export const BRAND_LOGOS: BrandLogo[] = [
  {
    src: '/brand/boundless-logo-dark.svg',
    surface: 'dark',
    alt: 'Boundless logo, colour on dark',
  },
  {
    src: '/brand/boundless-logo-white.svg',
    surface: 'dark',
    alt: 'Boundless logo, white on dark',
  },
  {
    src: '/brand/boundless-logo-light.svg',
    surface: 'light',
    alt: 'Boundless logo, colour on light',
  },
  {
    src: '/brand/boundless-logo-black.svg',
    surface: 'light',
    alt: 'Boundless logo, black on light',
  },
];

export interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  /** Card background. */
  background: string;
  /** Whether to use dark text + a border (for the dark swatch). */
  dark?: boolean;
}

export const BRAND_COLORS: BrandColor[] = [
  {
    name: 'Dark',
    hex: '#0C0F0B',
    rgb: 'RGB 12, 15, 11',
    background: '#0C0F0B',
    dark: true,
  },
  {
    name: 'White',
    hex: '#FFFFFF',
    rgb: 'RGB 255, 255, 255',
    background: '#FFFFFF',
  },
  {
    name: 'Primary',
    hex: '#2EEDAA',
    rgb: 'RGB 43, 237, 170',
    background: '#2EEDAA',
  },
];

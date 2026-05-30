import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // Vite 8 resolves `@/*` from tsconfig natively, no plugin needed.
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    // Pin the jsdom origin so same-origin `/api/...` requests resolve
    // deterministically (see the Request shim in `src/test/setup.ts`).
    environmentOptions: { jsdom: { url: 'http://localhost:3000' } },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Unit/component tests live beside the code under `src`. Playwright specs
    // in `e2e/` run separately and must not be picked up here.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Tooling escape hatch plus the client values any imported module expects,
    // so tests never trip env validation.
    env: {
      SKIP_ENV_VALIDATION: 'true',
      NEXT_PUBLIC_API_BASE_PATH: '/api',
      NEXT_PUBLIC_STELLAR_NETWORK: 'TESTNET',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    },
  },
});

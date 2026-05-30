import '@testing-library/jest-dom/vitest';

import { afterAll, afterEach } from 'vitest';

import { server } from './msw/server';

// Node's fetch/Request (undici) reject relative URLs, but the API client is
// deliberately same-origin and issues relative `/api/...` requests that a
// browser resolves against its origin. Resolve root-relative request URLs
// against the jsdom origin so they parse and MSW can intercept them.
const BaseRequest = globalThis.Request;
globalThis.Request = class extends BaseRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    if (typeof input === 'string' && input.startsWith('/')) {
      super(new URL(input, window.location.origin), init);
    } else {
      super(input, init);
    }
  }
} as unknown as typeof Request;

// Start MSW at module-eval time, before any test file imports the API client.
// `openapi-fetch` captures `globalThis.fetch` when the client is created, so
// the interceptor must already be installed by then or requests escape to the
// network. `error` on unhandled requests surfaces missing mocks loudly.
server.listen({ onUnhandledRequest: 'error' });
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

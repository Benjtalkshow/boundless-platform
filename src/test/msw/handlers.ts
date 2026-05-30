import { http, HttpResponse } from 'msw';

/**
 * Default request handlers, shaped like the backend's `{ success, data, meta }`
 * envelope. Individual tests can override these with `server.use(...)`.
 */
export const handlers = [
  http.get('/api/users/me', () =>
    HttpResponse.json({
      success: true,
      message: 'Success',
      data: {
        id: 'user_1',
        name: 'Ada Lovelace',
        email: 'ada@example.com',
      },
      meta: { timestamp: '2026-05-30T00:00:00.000Z', requestId: 'req_default' },
    })
  ),
];

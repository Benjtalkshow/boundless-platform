import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { ApiError } from '@/lib/api';
import { server } from '@/test/msw/server';
import { createQueryWrapper } from '@/test/utils';

import { useCurrentUser } from './use-current-user';

describe('useCurrentUser', () => {
  it('unwraps the response envelope into the dashboard data', async () => {
    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // The default handler returns a `{ success, data, meta }` envelope; the
    // client middleware unwraps it, so the hook surfaces the typed DashboardDto
    // `data` (nested profile and stats included).
    expect(result.current.data?.user).toMatchObject({
      id: 'user_1',
      email: 'ada@example.com',
    });
    expect(result.current.data?.stats.followers).toBe(128);
  });

  it('throws a normalized ApiError when the envelope reports failure', async () => {
    server.use(
      http.get('/api/users/me', () =>
        HttpResponse.json(
          {
            success: false,
            message: 'Not authenticated',
            errors: [{ field: 'session', message: 'Session expired' }],
            meta: {
              timestamp: '2026-05-30T00:00:00.000Z',
              requestId: 'req_unauth',
            },
          },
          { status: 401 }
        )
      )
    );

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    const { error } = result.current;
    expect(error).toBeInstanceOf(ApiError);
    // Status, message, field errors, and the `meta.requestId` all survive the
    // envelope-normalization path in the API client.
    expect(error).toMatchObject({
      status: 401,
      message: 'Not authenticated',
      requestId: 'req_unauth',
      fieldErrors: [{ field: 'session', message: 'Session expired' }],
    });
  });
});

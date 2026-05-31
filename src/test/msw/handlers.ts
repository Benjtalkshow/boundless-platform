import { http, HttpResponse } from 'msw';

/**
 * Default request handlers, shaped like the backend's `{ success, data, meta }`
 * envelope. `GET /api/users/me` returns a `DashboardDto` (profile, stats, and
 * activity series). Individual tests can override these with `server.use(...)`.
 */
export const handlers = [
  http.get('/api/users/me', () =>
    HttpResponse.json({
      success: true,
      message: 'Success',
      data: {
        user: {
          id: 'user_1',
          name: 'Ada Lovelace',
          email: 'ada@example.com',
          username: 'ada',
          displayUsername: 'Ada Lovelace',
          image: null,
          role: 'user',
          createdAt: '2026-01-01T00:00:00.000Z',
        },
        stats: {
          projectsCreated: 3,
          projectsFunded: 2,
          totalContributed: 1500,
          commentsPosted: 12,
          votes: 40,
          grants: 1,
          hackathons: 2,
          followers: 128,
          following: 64,
          reputation: 980,
          communityScore: 75,
        },
        chart: { data: [] },
        activitiesGraph: { data: [] },
        recentActivities: [],
      },
      meta: { timestamp: '2026-05-30T00:00:00.000Z', requestId: 'req_default' },
    })
  ),
];

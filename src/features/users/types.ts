import type { Schemas } from '@/lib/api';

/** Current-user dashboard payload returned by `GET /api/users/me`. */
export type Dashboard = Schemas['DashboardDto'];

/** Profile slice of the dashboard payload. */
export type DashboardUser = Schemas['DashboardUserDto'];

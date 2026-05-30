import type { components, paths } from './generated/schema';

export type { components, paths };

/** Every named schema from the backend OpenAPI document. */
export type Schemas = components['schemas'];

/** Pagination block the backend attaches to list responses' `meta`. */
export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** `meta` block present on every backend response envelope. */
export interface ApiMeta {
  timestamp: string;
  requestId: string;
  pagination?: ApiPagination;
}

/** A single field-level error from the backend's error envelope. */
export interface ApiFieldError {
  field: string;
  message: string;
  code?: string;
}

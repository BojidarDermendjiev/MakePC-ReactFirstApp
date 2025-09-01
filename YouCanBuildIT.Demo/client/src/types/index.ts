// Re-export all feature types for easy access
export * from '../features/auth/types';
export * from '../features/feedback/types';
export * from '../features/product/types';

// Shared global types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
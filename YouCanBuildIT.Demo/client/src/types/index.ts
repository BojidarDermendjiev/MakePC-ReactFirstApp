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

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface Brand extends BaseEntity {
  name: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
}

export interface BasketItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Basket extends BaseEntity {
  userId: string;
  items: BasketItem[];
  totalAmount: number;
  status: 'active' | 'ordered' | 'abandoned';
}

export interface Order extends BaseEntity {
  userId: string;
  basketId: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
}
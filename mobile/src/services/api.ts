import { Category, Order, Product, User } from '../types';
import { Platform } from 'react-native';

export const API_ORIGIN = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://192.168.80.56:3000';
const API_BASE_URL = `${API_ORIGIN}/api`;

export function resolveImageUrl(image: string): string {
  return image.startsWith('http') || image.startsWith('data:') ? image : `${API_ORIGIN}${image}`;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Error en la API');
  }

  return response.json();
}

export const api = {
  getProducts: (search?: string, categoryId?: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (categoryId !== undefined) params.append('categoryId', String(categoryId));
    return request<Product[]>(`/products?${params.toString()}`);
  },
  getProduct: (id: number) => request<Product>(`/products/${id}`),
  getCategories: () => request<Category[]>('/categories'),
  register: (name: string, email: string, password: string) =>
    request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email: string, password: string) =>
    request<User>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getUser: (id: number) => request<User>(`/users/${id}`),
  createOrder: (order: Order) =>
    request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
};
